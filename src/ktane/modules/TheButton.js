import { useState, useContext, useEffect } from 'react'
import { EdgeworkContext } from '../EdgeworkProvider';
import Select from 'react-select'
import '../styles/vanillaModules.css'
import { getNumBatteries, getLitIndicators } from '../utils';

function TheButton() {

    const {edgework, setEdgework} = useContext(EdgeworkContext);
    const [label, setLabel] = useState('ABORT');
    const [buttonColor, setButtonColor] = useState('Red');
    const [colorStrip, setColorStrip] = useState('Unknown');
    const [solution, setSolution] = useState('');

    const validColors = ['Red', 'Yellow', 'Blue', 'White']
    const validLabels = ['ABORT', 'DETONATE', 'HOLD']

    const colorOptions = validColors.map(c => ({value: c, label: c}))
    const labelOptions = validLabels.map(l => ({value: l, label: l}))

    const reset = () => {
        setLabel('ABORT');
        setButtonColor('Red');
        setColorStrip('Unknown');
        solve('ABORT', 'Red', 'Unknown');
    }

    const buttonStyle = (c) => ({
        backgroundColor: (c === 'Red') ? 'rgb(200, 0, 0)' :
        (c === 'Yellow') ? 'rgb(200, 200, 0)' :
        (c === 'Blue') ? 'rgb(0, 0, 200)' : 
        (c === 'White') ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        color: (c === 'Yellow' || c === 'White') ? 'black' : 'white'
    })

    const solveHold = (strip) => {
        if(strip === 'Blue') return 'Hold the button and release when there is a 4 in any position on the timer.'
        else if(strip === 'Yellow') return 'Hold the button and release when there is a 5 in any position on the timer.'
        else if(strip === 'Unknown') return 'Hold the button and check the color of the light strip'
        else return 'Hold the button and release when there is a 1 in any position on the timer.'
    }

    const solve = (text, color, strip) => {
        if(color === 'Blue' && text === 'ABORT') setSolution(solveHold(strip));
        else if(getNumBatteries(edgework.batteryHolders) > 1 && text === 'DETONATE') setSolution('Press and immediately release the button.');
        else if(color === 'White' && getLitIndicators(edgework.indicators).indexOf('CAR') !== -1) setSolution(solveHold(strip));
        else if(getNumBatteries(edgework.batteryHolders) > 2 && getLitIndicators(edgework.indicators).indexOf('FRK') !== -1) setSolution('Press and immediately release the button.');
        else if(color === 'Yellow') setSolution(solveHold(strip));
        else if(color === 'Red' && text === 'HOLD') setSolution('Press and immediately release the button.');
        else setSolution(solveHold(strip));
    }
    
    useEffect(() => solve(label, buttonColor, colorStrip), [edgework, label, buttonColor, colorStrip]);

    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div className='button-base'>
                <div className='button' style={buttonStyle(buttonColor)}>
                    {label}
                </div>
                <div className='button-strip' style={buttonStyle(colorStrip)}/>
            </div>
            <div>
                <div className='button-selector'>
                    <div style={{marginBottom: '30px'}}>
                        Button Color
                        <Select
                            value={{value: buttonColor, label: buttonColor}}
                            onChange={e => setButtonColor(e.value)}
                            options={colorOptions}
                            styles={{
                                option: (provided, state) => ({...provided, ...buttonStyle(state.data.value)}),
                                control: (provided, state) => ({
                                    ...provided,
                                    ...buttonStyle(buttonColor),
                                    boxShadow: '3px 3px 2px black'
                                }),
                                singleValue: (provided, state) => ({...provided, ...buttonStyle(buttonColor)})
                            }}
                        />
                    </div>
                    <div style={{marginBottom: '30px'}}>
                        Button Label
                        <Select
                            value={{value: label, label: label}}
                            onChange={e => setLabel(e.value)}
                            options={labelOptions}
                            styles={{control: (provided, state) => ({...provided, boxShadow: '3px 3px 2px black'})}}
                        />
                    </div>
                    <div style={{marginBottom: '30px'}}>
                        Color Strip
                        <Select
                            value={{value: colorStrip, label: colorStrip}}
                            onChange={e => setColorStrip(e.value)}
                            options={colorOptions}
                            styles={{
                                option: (provided, state) => ({...provided, ...buttonStyle(state.data.value)}),
                                control: (provided, state) => ({
                                    ...provided,
                                    ...buttonStyle(colorStrip),
                                    boxShadow: '3px 3px 2px black'
                                }),
                                singleValue: (provided, state) => ({...provided, ...buttonStyle(colorStrip)})
                            }}
                        />
                    </div>
                    {solution !== '' && <div className='module-solve'>{solution}</div>}
                    <button className='reset-button' onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
        
    );
}

export default TheButton;