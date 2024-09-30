import { morseToLetter } from "../utils";
import { useEffect, useState } from "react";

function MorseCode() {
    
    const [currentLetter, setCurrentLetter] = useState('')

    const [morseWord, setMorseWord] = useState([])

    const [error, setError] = useState('')

    const [solution, setSolution] = useState('')

    const words = ['shell', 'halls', 'slick', 'trick', 'boxes', 'leaks', 'strobe', 'bistro', 'flick', 'bombs', 'break', 'brick', 'steak', 'sting', 'vector', 'beats']

    const freq = ['3.505', '3.515', '3.522', '3.532', '3.535', '3.542', '3.545', '3.552', '3.555', '3.565', '3.572', '3.575', '3.582', '3.592', '3.595', '3.600']

    const filterWords = () => {
        const result = words.map((word, index) => ({word: word + word, index: index})).filter(e => e.word.includes(morseWord.join('').toLowerCase()))
        console.log(morseWord.join('').toLowerCase())
        if(result.length === 0) {
            setError('Check input, there are no valid words that can fit the given input')
        }
        else if(result.length === 1) {
            setSolution(freq[result[0].index])
        }
    }
    
    const addInput = (input) => {
        if(currentLetter.length > 3) return
        setCurrentLetter(currentLetter + input)
    }

    const backspace = () => {
        if(currentLetter.length < 1) return;
        setCurrentLetter(currentLetter.substring(0, currentLetter.length - 1))
    }

    const displayString = (morse) => {
        return morse.split('').map(c => (c === '.' ? '•' : c)).join('')
    }

    const submitLetter = () => {
        const letter = morseToLetter(currentLetter)
        if(letter === '') {
            setError('Letter not found')
        }
        else {
            setError('')
            setMorseWord(prev => [...prev, letter])
        }
        setCurrentLetter('')
    }

    useEffect(filterWords, [morseWord])

    const reset = () => {
        setCurrentLetter('')
        setMorseWord([])
        setError('')
        setSolution('')
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontSize: '100px', height: '150px'}}>
                {displayString(currentLetter)}
            </div>
            <div style={{fontSize: '50px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', fontSize: '50px'}}>
                {morseWord}
            </div>
            <div style={{display: 'flex'}}>
                <button className='morse-button' onClick={backspace}>←</button>
                <button className='morse-button' onClick={() => addInput('.')}>•</button>
                <button className='morse-button' onClick={() => addInput('-')}>-</button>
                <button className='morse-send' onClick={submitLetter}>Submit</button>
            </div>
            {solution.length > 0 && <div className="module-solve">Send {solution}</div>}
            {error.length > 0 && <div className='module-error'>{error}</div>}
            <div className="module-solve">Input each letter flashed in morse, pressing submit between letter breaks. You do not need to worry about word breaks.</div>
            <button onClick={reset} className='reset-button'>Reset</button>
        </div>
    )
}

export default MorseCode;