import { useEffect, useState } from "react";
import { offIndex, detectModule, MODULE_TYPES, solveColoredSquares, countColors } from "./ColoredSquaresTools";
import ColoredSquaresGrid from "./ColoredSquaresGrid";


function ColoredSquares() {
    
    const [colors, setColors] = useState(new Array(16).fill(offIndex))
    const [module, setModule] = useState('')
    const [solving, setSolving] = useState(false)
    const [error, setError] = useState('')

    //Colored Squares
    const [puzzleState, setPuzzleState] = useState({
        numWhiteSquares: 0,
        previousGroupId: -1,
        highlight: -1
    })

    const reset = () => {
        setSolving(false)
        setModule('')
        setColors(new Array(16).fill(offIndex))
        setPuzzleState({
            numWhiteSquares: 0,
            previousGroupId: -1,
            highlight: -1
        })
    }

    const countWhiteSquares = () => {
        return colors.filter(color => color === 0).length;
    }

    const solveStage = () => {
        setSolving(true)
        const response = getSolveFunction()(colors, {...puzzleState, numWhiteSquares: countWhiteSquares()})
        if(response instanceof String) {
            setError(response)
        }
        else {
            setError('')
            setPuzzleState(getSolveFunction()(colors, {...puzzleState, numWhiteSquares: countWhiteSquares()}))
        }
    }

    const getSolveFunction = () => {
        switch(module) {
            case MODULE_TYPES.COLORED:
                return solveColoredSquares;
            default:
                return () => {return -1}
        }
    }

    return (
        <div className="center" style={{marginBottom: '500px'}}>
            {error !== '' && <div className='module-error'>{error}</div>}
            {error === '' && module !== '' && <div className='module-solve'>Press the highlighted buttons and then update the grid based on what is on your module</div>}
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
            />
        </div>
    )
}

export default ColoredSquares;