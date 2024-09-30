import { useState, useContext, useEffect } from "react";
import { containsVowel } from "../utils";
import { EdgeworkContext } from "../EdgeworkProvider";

function SimonSays() {

    const [strikes, setStrikes] = useState(0);

    const {edgework, setEdgework} = useContext(EdgeworkContext);

    const [input, setInput] = useState([]);
    const [solution, setSolution] = useState([]);
    const [error, setError] = useState('');

    const solutionElement = (bgColor, color) => {
        return (<div style={{
                backgroundColor: bgColor,
                color: color,
                borderRadius: '10px',
                width: '100px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                fontFamily: '"Roboto", sans-serif',
                fontWeight: '400',
                marginInline: '10px'
            }}>{bgColor}</div>)
    }

    const red = solutionElement('Red', 'black');
    const blue = solutionElement('Blue', 'white');
    const green = solutionElement('Green', 'black');
    const yellow = solutionElement('Yellow', 'black');

    const solve = (color) => {
        if(containsVowel(edgework.serialNumber)) {
            switch(color) {
                case 'Blue':
                    switch(strikes) {
                        case 0:
                            return red;
                        case 1:
                            return green;
                        case 2:
                            return red;
                        default: break;
                    }
                    return;
                case 'Red':
                    switch(strikes) {
                        case 0:
                            return blue;
                        case 1:
                            return yellow;
                        case 2:
                            return green;
                        default: break;
                    }
                    return;
                case 'Yellow':
                    switch(strikes) {
                        case 0:
                            return green;
                        case 1:
                            return red;
                        case 2:
                            return blue;
                        default: break;
                    }
                    return;
                case 'Green':
                    switch(strikes) {
                        case 0:
                            return yellow;
                        case 1:
                            return blue;
                        case 2:
                            return yellow;
                        default: break;
                    }
                    return;
                default: break;
            }
        }
        else {
            switch(color) {
                case 'Blue':
                    switch(strikes) {
                        case 0:
                            return yellow;
                        case 1:
                            return blue;
                        case 2:
                            return green;
                        default: break;
                    }
                    break;
                case 'Red':
                    switch(strikes) {
                        case 0:
                            return blue;
                        case 1:
                            return red;
                        case 2:
                            return yellow;
                        default: break;
                    }
                    break;
                case 'Yellow':
                    switch(strikes) {
                        case 0:
                            return red;
                        case 1:
                            return green;
                        case 2:
                            return red;
                        default: break;
                    }
                    break;
                case 'Green':
                    switch(strikes) {
                        case 0:
                            return green;
                        case 1:
                            return yellow;
                        case 2:
                            return blue;
                        default: break;
                    }
                    break;
                default: break;
            }
        }
    }

    const updateSolution = () => {
        if(edgework.serialNumber.length !== 6) setError('Serial Number incomplete/missing (should be 6 characters)');
        else setError('');
        setSolution(input.map(c => solve(c)))
    }

    const buttonStyle = (top, left) => ({
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: top ? '0%' : '50%',
        left: left ? '0%' : '50%'
    })

    const reset = () => {
        setInput([])
    }

    const addInput = (c) => {
        if(input.length < 6) setInput(prev => ([...prev, c]));
    } 

    useEffect(updateSolution, [edgework, input, strikes]);

    return (
        <div>
            <div style={{fontSize: '30px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', display: 'flex', justifyContent: 'center'}}>
                <select value={strikes} onChange={(e) => setStrikes(parseInt(e.target.value))} style={{fontSize: '30px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', marginInline: '10px'}}>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                </select> Strikes
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '70px', marginTop: '70px'}}>
                <div style={{position: 'relative', height: '300px', width: '300px', transform: 'rotate(-45deg)'}}>
                    <button style={buttonStyle(true, true)} className='ss-red' onClick={() => addInput('Red')}/>
                    <button style={buttonStyle(true, false)} className='ss-blue' onClick={() => addInput('Blue')}/>
                    <button style={buttonStyle(false, true)} className='ss-green' onClick={() => addInput('Green')}/>
                    <button style={buttonStyle(false, false)} className='ss-yellow' onClick={() => addInput('Yellow')}/>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', fontFamily: '"Roboto", sans-serif', fontWeight: '600',}}>
                {solution.length > 0 && error.length === 0 && <p>Solution</p>}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {error.length === 0 && solution.map((s, i) => <div key={i}>{s}</div>)}
                {(error.length > 0) && <div className="module-error">{error}</div>}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
                <button className='reset-button' onClick={reset}>Reset</button>
            </div>
        </div>
    );

}

export default SimonSays;