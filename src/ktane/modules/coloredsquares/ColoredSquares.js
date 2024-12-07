import { useEffect, useState, useContext } from "react";
import {
    MODULE_TYPES,
    solveColoredSquares,
    solveBicoloredSquares,
    solveDecoloredSquares,
    solveDiscoloredSquares,
    solveIsocoloredSquares,
    solveJuxtaColoredSquares,
    solveOvercoloredSquares,
    solveUncoloredSquares
} from "./ColoredSquaresTools";
import ColoredSquaresGrid from "./ColoredSquaresGrid";
import { EdgeworkContext } from "../../EdgeworkProvider";


function ColoredSquares() {

    const MAX_QUEUE_DISPLAY = 20
    const defaultSolveText = 'Solve Next Buttons'
    const loadingSolveText = 'LOADING...'

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
    
    const [colors, setColors] = useState(new Array(16).fill(0))
    const [flashing, setFlashing] = useState(-1)
    const [module, setModule] = useState('')
    const [solving, setSolving] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    //Colored Squares
    const [puzzleState, setPuzzleState] = useState(defaultState)

    const reset = () => {
        setSolving(false)
        setModule('')
        setColors(new Array(16).fill(0))
        setPuzzleState(defaultState)
        setError('')
        setLoading(false)
    }

    const countWhiteSquares = () => {
        return colors.filter(color => color === 0).length;
    }

    const executeSolve = () => {
        return getSolveFunction()(colors, {...puzzleState, numWhiteSquares: countWhiteSquares()}, flashing)
    }

    const solveStage = () => {
        //if(loading) return
        setSolving(true)
        let queue = puzzleState.queue
        if(queue && queue.length > MAX_QUEUE_DISPLAY) {
            queue.splice(0, MAX_QUEUE_DISPLAY)
            setPuzzleState(state => {return {...state, queue: queue}})
            return
        }
        setLoading(true)
        let response = ''
        setTimeout(() => {
            response = executeSolve()
            setLoading(false)
            if(typeof response === "string") {
                setError(response)
            }
            else {
                setError('')
                if(puzzleState.highlight === response.highlight && puzzleState.highlight !== -1) setRepeat(true)
                else setRepeat(false)
                setPuzzleState(response)
            }
        }, 0) 
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
            case MODULE_TYPES.ISOCOLORED:
                return solveIsocoloredSquares;
            case MODULE_TYPES.JUXTACOLORED:
                return solveJuxtaColoredSquares;
            case MODULE_TYPES.OVERCOLORED:
                return solveOvercoloredSquares;
            case MODULE_TYPES.UNCOLORED:
                return solveUncoloredSquares;
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
        if(flashing > -1) arr[flashing] = 'Flash'
        const queue = puzzleState.queue
        if(queue && queue.length > 0) {
            arr = new Array(16).fill('')
            for(let i = 0; i < (queue.length < MAX_QUEUE_DISPLAY ? queue.length : MAX_QUEUE_DISPLAY); i++) {
                arr[queue[i]] += (i + 1) + ' '
            }
        }
        return arr
    }


    useEffect(updateEdgework, [edgework])

    const helpText = "If a button is highlighted, press the button on your module and update the grid with the new colors. If there are numbers on the buttons, press them in the given order on your module"

    return (
        <div className="center">
            {/* <button onClick={() => solveIsocoloredSquares('test', 'test')} className='reset-button'>Test</button> */}
            {error !== '' && <div className='module-error'>{error}</div>}
            {error === '' && module !== '' && !repeat && <div className='module-solve' style={{textAlign: 'center'}}>{helpText}</div>}
            {error === '' && module !== '' && repeat && <div className='module-solve'>Press the highlighted button again</div>}
            <div style={{height: '100px'}}>
                {module !== '' && <button onClick={solveStage} className='blue-button' style={{width: '250px'}}>
                    {loading ? loadingSolveText : defaultSolveText}
                </button>}
                {solving && <button onClick={reset} className='reset-button'>RESET MODULE</button>}
            </div>
            <ColoredSquaresGrid
                state={[colors, setColors]}
                moduleState={[module, setModule]}
                solvingState={[solving, setSolving]}
                resetModule={reset}
                solveFunc={solveStage}
                highlight={puzzleState.highlight}
                text={getText()}
                loading={loading}
                flashingState={[flashing, setFlashing]}
            />
            <div className='module-error'>
                Note: Perspecticolored Squares and Tombstone maze are not supported
            </div>
        </div>
    )
}

export default ColoredSquares;