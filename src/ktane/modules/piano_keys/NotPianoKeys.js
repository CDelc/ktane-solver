import { useState, useContext, useEffect } from 'react'
import './piano.css'
import { EdgeworkContext } from '../../EdgeworkProvider'
import PianoKeyboard from './PianoKeyboard'
import { getLastDigit, getNumBatteries, range } from '../../utils'

function NotPianoKeys() {

    const {edgework, setEdgework} = useContext(EdgeworkContext)
    const [symbols, setSymbols] = useState(new Array(3).fill(''))
    const [error, setError] = useState('')
    const [solution, setSolution] = useState('')

    const musicalSymbols = ['♭', '𝄴', '♯', '♮', '𝄐', '𝄵', '𝆗', '𝄡', '', '𝄪', '', '', '', '', '', '', '', '', '', '', '', '']

    const setOne = ['♭', '♮', '♯', '𝄪']
    const setTwo = ['𝄴', '𝄵', '', '', '', '', '', '', '']
    const setThree = ['𝄐', '𝆗', '', '', '', '𝄡', '', '', '']

    const tableOne = [
        [3, 1, 5, 4, 2, 5, 4, 1, 5],
        [5, 1, 4, 2, 2, 1, 4, 2, 5],
        [4, 3, 3, 2, 3, 1, 3, 4, 1],
        [5, 1, 2, 1, 1, 3, 1, 5, 5]
    ]

    const tableTwo = [
        [2, 2, 1, 3, 5, 4, 3, 3, 3],
        [2, 3, 5, 1, 4, 4, 4, 2, 4],
        [2, 4, 4, 4, 3, 5, 3, 5, 5],
        [4, 1, 2, 3, 3, 4, 3, 3, 1]
    ]

    const tableThree = [
        [2, 5, 5, 2, 3, 1, 1, 1, 3],
        [5, 4, 4, 2, 4, 5, 5, 2, 3],
        [3, 3, 3, 1, 5, 2, 4, 2, 2],
        [4, 4, 5, 3, 1, 1, 3, 3, 5],
        [4, 1, 5, 4, 2, 2, 5, 4, 2],
        [2, 4, 3, 4, 1, 4, 1, 4, 3],
        [3, 3, 3, 3, 1, 2, 1, 2, 5],
        [4, 4, 5, 4, 2, 5, 3, 1, 2],
        [3, 5, 2, 2, 5, 4, 5, 4, 4]
    ]

    const tableFour = [
        [[6, 7], [7, 2], [1, 5], [5, 1], [3, 6], [2, 3], [4, 2], [1, 5], [2, 4]],
        [[2, 1], [4, 6], [3, 1], [1, 7], [2, 6], [6, 4], [7, 1], [5, 2], [1, 3]],
        [[1, 4], [2, 1], [5, 3], [7, 5], [4, 1], [1, 2], [2, 6], [3, 7], [6, 2]],
        [[5, 2], [1, 7], [7, 4], [4, 3], [2, 5], [3, 1], [6, 1], [2, 4], [1, 6]],
        [[3, 1], [6, 5], [1, 2], [2, 1], [7, 1], [5, 6], [1, 2], [4, 5], [2, 1]],
        [[7, 6], [5, 1], [3, 7], [4, 2], [2, 1], [4, 1], [2, 1], [2, 6], [6, 3]],
        [[7, 6], [3, 2], [4, 2], [2, 4], [6, 3], [2, 7], [1, 5], [1, 3], [5, 1]],
        [[2, 5], [1, 3], [6, 1], [1, 6], [5, 2], [7, 1], [3, 4], [2, 1], [4, 7]],
        [[1, 2], [5, 4], [2, 7], [3, 2], [1, 5], [4, 5], [2, 3], [6, 3], [7, 2]]
    ]

    const blackKeyNumbers = [2, 4, 6, 9, 11]
    const whiteKeyNumbers = [1, 3, 5, 7, 8, 10, 12]

    const removeSymbol = i => {
        let newSymbols = [...symbols]
        newSymbols[i] = ''
        setSymbols(newSymbols)
    }

    const addSymbol = (symbol, index) => {
        let newSymbols = [...symbols]
        newSymbols[index] = symbol
        setSymbols(newSymbols)
    }

    const clear = () => {
        setSymbols(new Array(3).fill(''))
    }

    const solve = () => {
        if(edgework.serialNumber.length !== 6 || getLastDigit(edgework.serialNumber) == null) {
            setError('Serial number missing or incomplete')
            return
        }
        else setError('')
        if(symbols.includes('')) {
            setSolution('')
            return
        }
        let b = [];

        let tableOneValue = tableOne[setOne.indexOf(symbols[0])][setTwo.indexOf(symbols[1])]
        let tableTwoValue = tableTwo[setOne.indexOf(symbols[0])][setThree.indexOf(symbols[2])]
        let tableThreeValue = tableThree[setThree.indexOf(symbols[2])][setTwo.indexOf(symbols[1])]
        b.push(blackKeyNumbers[tableOneValue - 1], blackKeyNumbers[tableTwoValue - 1], blackKeyNumbers[tableThreeValue - 1])

        if(edgework.serialNumber.includes('0') || edgework.serialNumber.includes('5')) {
            b.push(blackKeyNumbers.reverse().find(e => !b.includes(e)))
            b.push(blackKeyNumbers.find(e => !b.includes(e)))
        }
        else {
            b.push(blackKeyNumbers.find(e => !b.includes(e)))
            b.push(blackKeyNumbers.reverse().find(e => !b.includes(e)))
        }

        const getBlock = majorIndex => {
            return Math.floor(majorIndex / 27) * 3 + Math.floor((majorIndex % 9) / 3)
        }

        const getMinorIndex = majorIndex => {
            return (Math.floor(majorIndex / 9) % 3) * 3 + (majorIndex % 9) % 3
        }

        const getMajorIndex = (blockNumber, minorIndex) => {
            return Math.floor(blockNumber / 3) * 27 + Math.floor(minorIndex / 3) * 9 + blockNumber % 3 * 3 + minorIndex % 3
        }

        const rotateArray = arr => {
            let start = arr.shift()
            arr.push(start)
        }

        const swap = (arr, i1, i2) => {
            let tmp = arr[i1]
            arr[i1] = arr[i2]
            arr[i2] = tmp
        }

        let quadrant = [1, 2, 4, 3]
        switch(symbols[0]) {
            case '♭':
                quadrant = [0, 1, 4, 3]
                break;
            case '♮':
                quadrant = [1, 2, 5, 4]
                break;
            case '𝄪':
                quadrant = [3, 4, 7, 6]
                break;
            case '♯':
                quadrant = [4, 5, 8, 7]
                break;
            default:
                break;
        }

        let w = range(7).map(i => whiteKeyNumbers[i])
        let row = setThree.indexOf(symbols[2])
        let col = setTwo.indexOf(symbols[1])
        let startMajorIndex = row * 9 + col
        let table = tableFour.flat()

        const blockNumber = getBlock(startMajorIndex)
        const startMinorIndex = getMinorIndex(startMajorIndex)

        let timeout = 0
        while(quadrant[0] !== startMinorIndex && timeout < 5) {
            rotateArray(quadrant)
            timeout++
        }
        if(timeout === 5) {
            setError('Internal Logic Error: Stuck in loop')
            return
        }

        let pairs = []
        quadrant.forEach(minorIndex => {pairs.push(table[getMajorIndex(blockNumber, minorIndex)])})
        pairs.forEach(pair => swap(w, pair[0] - 1, pair[1] - 1))

        let lastDigit = getLastDigit(edgework.serialNumber)
        let solution = []
        switch(lastDigit) {
            case 0:
                solution = [
                    w[0],
                    b[0],
                    w[1],
                    b[1],
                    w[2],
                    b[2],
                    w[3],
                    b[3],
                    w[4],
                    b[4],
                    w[5],
                    w[6]
                ];
                break;
            case 1:
                solution = [
                    b[1],
                    w[1],
                    w[2],
                    b[2],
                    w[0],
                    w[5],
                    b[4],
                    w[3],
                    b[0],
                    w[4],
                    w[6],
                    b[3]
                ];
                break;
            case 2:
                solution = [
                    w[4],
                    w[3],
                    w[0],
                    b[1],
                    w[2],
                    b[0],
                    w[6],
                    w[1],
                    b[2],
                    w[5],
                    b[3],
                    b[4]
                ];
                break;
            case 3:
                solution = [
                    w[1],
                    b[1],
                    w[5],
                    b[0],
                    w[3],
                    w[6],
                    w[4],
                    b[3],
                    w[0],
                    b[4],
                    w[2],
                    b[2]
                ];
                break;
            case 4:
                solution = [
                    w[5],
                    b[4],
                    w[0],
                    w[4],
                    b[2],
                    w[6],
                    b[1],
                    w[2],
                    b[0],
                    w[3],
                    w[1],
                    b[3]
                ];
                break;
            case 5:
                solution = [
                    w[5],
                    b[0],
                    w[0],
                    b[1],
                    b[4],
                    b[3],
                    w[1],
                    w[4],
                    w[6],
                    b[2],
                    w[2],
                    w[3]
                ];
                break;
            case 6:
                solution = [
                    w[2],
                    w[4],
                    w[1],
                    b[4],
                    b[1],
                    w[0],
                    b[0],
                    b[2],
                    w[5],
                    w[3],
                    b[3],
                    w[6]
                ];
                break;
            case 7:
                solution = [
                    b[3],
                    w[6],
                    w[0],
                    w[2],
                    b[1],
                    b[2],
                    w[3],
                    b[4],
                    w[4],
                    w[1],
                    b[0],
                    w[5]
                ];
                break;
            case 8:
                solution = [
                    w[6],
                    b[0],
                    w[2],
                    b[4],
                    w[0],
                    w[3],
                    b[3],
                    w[4],
                    w[1],
                    w[5],
                    b[1],
                    b[2]
                ];
                break;
            case 9:
                solution = [
                    w[5],
                    w[2],
                    w[1],
                    w[3],
                    b[0],
                    b[2],
                    b[3],
                    w[0],
                    w[6],
                    b[1],
                    b[4],
                    w[4]
                ];
                break;
            default:
                setError('Internal Logic Error')
                return
        }
        setSolution(solution.join(' '))
        return
    }

    useEffect(solve, [edgework, symbols])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {error !== '' && <div className='module-error'>{error}</div>}
            {error === '' && solution !== '' && <div className='module-solve' style={{textAlign: 'center'}}>{solution}</div>}
            {error === '' && solution === '' && <div className='module-solve' style={{textAlign: 'center'}}>Click symbols on the right to populate the screen, click on a symbol on the screen to remove it</div>}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button onClick={clear} className='reset-button' style={{width: '200px', height: '50px'}}>Clear Module</button>
                <div class="module-base">
                    <div className="symbol-screen">
                        <button className='display-button' onClick={() => removeSymbol(0)}>{symbols[0]}</button>
                        <button className='display-button' onClick={() => removeSymbol(1)}>{symbols[1]}</button>
                        <button className='display-button' onClick={() => removeSymbol(2)}>{symbols[2]}</button>
                    </div>
                    <PianoKeyboard not />
                </div>
                <div className='button-menu' style={{width: '700px'}}>
                    {setOne.map(c => (<button key={c} className='symbol-button' onClick={() => addSymbol(c, 0)}>{c}</button>))}
                    {setTwo.map(c => (<button key={c} className='symbol-button' onClick={() => addSymbol(c, 1)}>{c}</button>))}
                    {setThree.map(c => (<button key={c} className='symbol-button' onClick={() => addSymbol(c, 2)}>{c}</button>))}
                </div>
            </div>
        </div>
        
    )
}

export default NotPianoKeys