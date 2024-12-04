import { useEffect, useState, useContext } from "react";
import { offIndex, MODULE_TYPES, solveColoredSquares, solveBicoloredSquares, solveDecoloredSquares, solveDiscoloredSquares } from "./ColoredSquaresTools";
import ColoredSquaresGrid from "./ColoredSquaresGrid";
import { EdgeworkContext } from "../../EdgeworkProvider";


function ColoredSquares() {

    const {edgework, setEdgework} = useContext(EdgeworkContext)
    const serialNumber = edgework.serialNumber
    const defaultState = {
        numWhiteSquares: 0,
        previousGroupId: -1,
        highlight: -1,
        dotColor: -1,
        dashColor: -1,
        queue: [],
        serial: serialNumber,
        decoloredPosition: -1
    }
    
    const [colors, setColors] = useState(new Array(16).fill(offIndex))
    const [module, setModule] = useState('')
    const [solving, setSolving] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [error, setError] = useState('')

    //Colored Squares
    const [puzzleState, setPuzzleState] = useState(defaultState)

    const reset = () => {
        setSolving(false)
        setModule('')
        setColors(new Array(16).fill(offIndex))
        setPuzzleState(defaultState)
        setError('')
    }

    const countWhiteSquares = () => {
        return colors.filter(color => color === 0).length;
    }

    const solveStage = () => {
        setSolving(true)
        const response = getSolveFunction()(colors, {...puzzleState, numWhiteSquares: countWhiteSquares()})
        if(typeof response === "string") {
            setError(response)
        }
        else {
            setError('')
            if(puzzleState.highlight === response.highlight && puzzleState.highlight !== -1) setRepeat(true)
            else setRepeat(false)
            setPuzzleState(response)
        }
    }

    const getSolveFunction = () => {
        switch(module) {
            case MODULE_TYPES.COLORED:
                return solveColoredSquares;
            case MODULE_TYPES.BICOLORED:
                return solveBicoloredSquares;
            case MODULE_TYPES.DECOLORED:
                return solveDecoloredSquares;
            case MODULE_TYPES.DISCOLORED:
                return solveDiscoloredSquares;
            default:
                return () => {return -1}
        }
    }
    
    const updateEdgework = () => {
        const serialNumber = edgework.serialNumber
        setPuzzleState(p => {return {...p, serial: serialNumber}})
    }

    const getText = () => {
        let arr = new Array(16).fill('')
        const queue = puzzleState.queue
        for(let i = 0; i < queue.length; i++) {
            arr[queue[i]] += (i + 1) + ' '
        }
        return arr
    }

    useEffect(updateEdgework, [edgework])

    const helpText = "If a button is highlighted, press the button on your module and update the grid with the new colors. If there are numbers on the buttons, press them in the given order on your module"

    return (
        <div className="center" style={{marginBottom: '500px'}}>
            {/* <button onClick={() => solveBicoloredSquares('test', 'test')} className='reset-button'>Test</button> */}
            {error !== '' && <div className='module-error'>{error}</div>}
            {error === '' && module !== '' && !repeat && <div className='module-solve' style={{textAlign: 'center'}}>{helpText}</div>}
            {error === '' && module !== '' && repeat && <div className='module-solve'>Press the highlighted button again</div>}
            <div style={{height: '100px'}}>
                {module !== '' && <button onClick={solveStage} className='blue-button' style={{width: '250px'}}>
                    Find Next Buttons
                </button>}
                {solving && <button onClick={reset} className='reset-button'>RESET</button>}
            </div>
            <ColoredSquaresGrid
                state={[colors, setColors]}
                moduleState={[module, setModule]}
                solvingState={[solving, setSolving]}
                resetModule={reset}
                solveFunc={solveStage}
                highlight={puzzleState.highlight}
                text={getText()}
            />
        </div>
    )
}

export default ColoredSquares;