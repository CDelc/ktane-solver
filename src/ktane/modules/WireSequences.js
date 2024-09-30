import { useState, useEffect } from "react";

function WireSequences() {

    const [wires, setWires] = useState(new Array(12).fill(['Empty', 'N/A']))
    const [solution, setSolution] = useState(new Array(12).fill(false))
    const [error, setError] = useState('')

    const redSteps = [['C'], ['B'], ['A'], ['A', 'C'], ['B'], ['A', 'C'], ['A', 'B', 'C'], ['A', 'B'], ['B']]
    const blueSteps = [['B'], ['A', 'C'], ['B'], ['A'], ['B'], ['B', 'C'], ['C'], ['A', 'C'], ['A']]
    const blackSteps = [['A', 'B', 'C'], ['A', 'C'], ['B'], ['A', 'C'], ['B'], ['B', 'C'], ['A', 'B'], ['C'], ['C']]

    const modStyle = {
        display: 'grid',
        gridTemplateColumns: '50px 120px 80px 80px',
        gridTemplateRows: 'repeat(12, 50px)',
        fontFamily: '"Roboto"',
        fontSize: '20px',
        gap: '10px'
    }

    const numberStyle = (index) => ({
        gridRow: `${index + 1} / ${index + 2}`,
        gridColumn: '1 / 2',
        fontSize: '50px'
    })

    const colorSelectStyle = (index) => ({
        gridRow: `${index + 1} / ${index + 2}`,
        gridColumn: '2 / 3',
        fontSize: '30px',
        backgroundColor: wires[index][0] === 'Empty' ? wires[index][0] : 'white'
    })

    const letterSelectStyle = (index) => ({
        gridRow: `${index + 1} / ${index + 2}`,
        gridColumn: '3 / 4',
        fontSize: '30px'
    })

    const updateColor = (index, color) => {
        let tmp = [...wires]
        let wire = [...tmp[index]]
        wire[0] = color
        if(color === 'Empty') wire[1] = 'N/A'
        tmp[index] = wire
        setWires(tmp)
    }

    const updateLetter = (index, letter) => {
        if(wires[index][0] === 'Empty') return
        let tmp = [...wires]
        let wire = [...tmp[index]]
        wire[1] = letter
        tmp[index] = wire
        setWires(tmp)
    }

    const solve = () => {
        let black = 0
        let blue = 0
        let red = 0
        let sol = new Array(12).fill(false)

        wires.every((wire, index) => {
            let color = wire[0]
            let letter = wire[1]
            if(blue > 8) {
                setError('Too many blue wires')
                sol = new Array(12).fill(false)
                return false
            }
            else if(red > 8) {
                setError('Too many red wires')
                sol = new Array(12).fill(false)
                return false
            }
            else if(black > 8) {
                setError('Too many black wires')
                sol = new Array(12).fill(false)
                return false
            }
            
            switch(color) {
                case 'Blue':
                    sol[index] = blueSteps[blue].indexOf(letter) !== -1
                    blue++
                    break
                case 'Red':
                    sol[index] = redSteps[red].indexOf(letter) !== -1
                    red++
                    break
                case 'Black':
                    sol[index] = blackSteps[black].indexOf(letter) !== -1
                    black++
                    break
                default: return true;
            }
            return true;
        })
        setSolution(sol)
    }

    const reset = () => {
        setSolution(new Array(12).fill(false))
        setWires(new Array(12).fill(['Empty', 'N/A']))
        setError('')
    }

    useEffect(solve, [wires])

    return (
        <div className='center' style={{marginBottom: '200px', flexDirection: 'column', alignItems: 'center'}}>
            <div style={modStyle}>
                {[...Array(12)].map((_, index) => (<div key={index} className='center' style={numberStyle(index)}>{index + 1}</div>))}
                {[...Array(12)].map((_, index) => (
                <select key={index+12} onChange={(e) => updateColor(index, e.target.value)} style={colorSelectStyle(index)} value={wires[index][0]}>
                    <option>Empty</option>
                    <option style={{color: 'black', backgroundColor: 'red'}}>Red</option>
                    <option style={{color: 'white', backgroundColor: 'black'}}>Black</option>
                    <option style={{color: 'white', backgroundColor: 'blue'}}>Blue</option>
                </select>))}
                {[...Array(12)].map((_, index) => (
                <select key={index+24} onChange={(e) => updateLetter(index, e.target.value)} style={letterSelectStyle(index)} value={wires[index][1]}>
                    <option>N/A</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>))}
                {[...Array(12)].map((_, index) => (<div key = {index+36} className='center' style={{color: 'red'}}>{solution[index] ? 'Cut' : ''}</div>))}
            </div>
            {(error.length > 0) && <div className="module-error">{error}</div>}
            <button onClick={reset} className='reset-button'>Reset</button>
        </div>
    );

}

export default WireSequences;