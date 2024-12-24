import { useState, useContext, useEffect } from 'react'
import './piano.css'
import { EdgeworkContext } from '../../EdgeworkProvider'
import PianoKeyboard from './PianoKeyboard'
import { evenvodd, getLastDigit, containsVowel, getLargestDigit } from '../../utils'

function FestivePianoKeys() {

    const {edgework, setEdgework} = useContext(EdgeworkContext)
    const [symbols, setSymbols] = useState(new Array(3).fill(''))
    const [error, setError] = useState('')
    const [solution, setSolution] = useState('')

    const musicalSymbols = [
        '', '', '', '',
        '', '', '', '',
        '', '𝄡', '', '', ''
    ]

    const removeSymbol = i => {
        let newSymbols = [...symbols]
        newSymbols[i] = ''
        setSymbols(newSymbols)
    }

    const addSymbol = symbol => {
        let newSymbols = [...symbols]
        let i = newSymbols.indexOf('')
        if(i === -1) return;
        newSymbols[i] = symbol
        setSymbols(newSymbols)
    }

    const clear = () => {
        setSymbols(new Array(3).fill(''))
    }

    const litIndicatorWithVowel = () => {
        const indicators = edgework.indicators
        return indicators.filter(indicator => containsVowel(indicator.label) && indicator.lit === 1).length > 0
    }

    const solve = () => {
        if(edgework.serialNumber.length !== 6 || getLastDigit(edgework.serialNumber) === null) setError('Serial number missing or incomplete')
        else setError('')
        if(symbols.includes('')) setSolution('')
        else if(evenvodd(edgework.serialNumber) === 1 && symbols.includes('')) {
            setSolution('D♯ F D♯ C G♯ F D♯')
        }
        else if((new Set(edgework.serialNumber.split(''))).size < 6 && (symbols.includes('') || symbols.includes(''))) {
            setSolution('C♯ B A F♯ G♯ A G♯ F♯')
        }
        else if(symbols.includes('') && symbols.includes('')) {
            setSolution('G A G E G A G E')
        }
        else if((symbols.includes('') || symbols.includes('')) && (new Set(edgework.portPlates.flat())).size <= 2) {
            setSolution('D♯ D♯ C♯ B♯ D♯ D♯ F C♯')
        }
        else if(symbols.includes('') && litIndicatorWithVowel()) {
            setSolution('B A G D♯ D A B A G')
        }
        else if((symbols.includes('') || symbols.includes('')) && edgework.batteryHolders.filter(holder => holder === 'AA').length >= 2) {
            setSolution('F♯ G A A D B A G E D')
        }
        else if(symbols.includes('') && symbols.includes('')) {
            setSolution('G E F G C B C D C B A G')
        }
        else if((symbols.includes('') || symbols.includes('') || symbols.includes('')) &&
            (edgework.serialNumber.includes('1') || edgework.serialNumber.includes('9'))) {
            setSolution('G G G G G G G A♯ D♯ F G')
        }
        else if(symbols.includes('') || symbols.includes('') || symbols.includes('𝄡')) {
            setSolution('D D D C♯ C♯ C♯ B C♯ B F♯')
        }
        else {
            const digit = getLargestDigit(edgework.serialNumber)
            if(digit === -1) {
                setError('Internal Error')
                return
            }
            setSolution(new Array(digit + 1).fill('A♯ A A♯ G').join(' '))
        }

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
                    <div class="symbol-screen">
                        <button className='display-button' onClick={() => removeSymbol(0)}>{symbols[0]}</button>
                        <button className='display-button' onClick={() => removeSymbol(1)}>{symbols[1]}</button>
                        <button className='display-button' onClick={() => removeSymbol(2)}>{symbols[2]}</button>
                    </div>
                    <PianoKeyboard />
                </div>
                <div className='button-menu' style={{width: '500px'}}>
                    {musicalSymbols.map(c => (<button key={c} className='symbol-button' onClick={() => addSymbol(c)}>{c}</button>))}
                </div>
            </div>
            <div className='module-error'>
                Note: This module relies heavily on edgework, make sure the edgework bar at the top is updated
            </div>
        </div>
        
    )
}

export default FestivePianoKeys