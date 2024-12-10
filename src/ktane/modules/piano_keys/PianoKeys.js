import { useState, useContext, useEffect } from 'react'
import './piano.css'
import { EdgeworkContext } from '../../EdgeworkProvider'
import PianoKeyboard from './PianoKeyboard'
import { getLastDigit, getNumBatteries } from '../../utils'

function PianoKeys() {

    const {edgework, setEdgework} = useContext(EdgeworkContext)
    const [symbols, setSymbols] = useState(new Array(3).fill(''))
    const [error, setError] = useState('')
    const [solution, setSolution] = useState('')

    const musicalSymbols = ['♭', '𝄴', '♯', '♮', '𝄐', '𝄵', '𝆗', '𝄡', '']

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

    const solve = () => {
        if(edgework.serialNumber.length !== 6) setError('Serial number missing or incomplete')
        else setError('')
        if(symbols.includes('')) setSolution('')
        else if(symbols.includes('♭') && getLastDigit(edgework.serialNumber) % 2 === 0) {
            setSolution('A♯ A♯ A♯ A♯ F♯ G♯ A♯ G♯ A♯')
        }
        else if((symbols.includes('𝄴') || symbols.includes('♯')) && edgework.batteryHolders.length >= 2) {
            setSolution('D♯ D♯ D D D♯ D♯ D D♯ D♯ D D D♯')
        }
        else if((symbols.includes('♮') && symbols.includes('𝄐'))) {
            setSolution('E F♯ F♯ F♯ F♯ E E E')
        }
        else if((symbols.includes('𝄵') || symbols.includes('𝆗')) && edgework.portPlates.flat().includes('stereo rca')) {
            setSolution('A♯ A A♯ F D♯ A♯ A A♯ F D♯')
        }
        else if(symbols.includes('𝄡') && edgework.indicators.find(ind => ind.label.toLowerCase() === 'snd' && ind.lit)) {
            setSolution('E E E C E G G')
        }
        else if((symbols.includes('') || symbols.includes('𝄐') || symbols.includes('𝄴')) && getNumBatteries(edgework.batteryHolders) >= 3) {
            setSolution('C♯ D E F C♯ D E F A♯ A')
        }
        else if(symbols.includes('♭') && symbols.includes('♯')) {
            setSolution('G G C G G C G C')
        }
        else if((symbols.includes('𝄵') || symbols.includes('')) &&
        (edgework.serialNumber.includes('3') || edgework.serialNumber.includes('7') || edgework.serialNumber.includes('8'))) {
            setSolution('A E F G F E D D F A')
        }
        else if((symbols.includes('♮') || symbols.includes('𝆗') || symbols.includes('𝄡'))) {
            setSolution('G G G D♯ A♯ G D♯ A♯ G')
        }
        else setSolution('B D A G A B D A')
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
                <div className='button-menu'>
                    {musicalSymbols.map(c => (<button className='symbol-button' onClick={() => addSymbol(c)}>{c}</button>))}
                </div>
            </div>
            <div className='module-error'>
                Note: This module relies heavily on edgework, make sure the edgework bar at the top is updated
            </div>
        </div>
        
    )
}

export default PianoKeys