import { useState } from 'react';
import { symbols } from './keypadImages/keypads.js'

function Keypads() {

    const [keys, setKeys] = useState([]);

    const keypadStyle = (symbol) => ({
        width: '64px',
        height: '64px',
        flexShrink: '0',
        backgroundImage: `url(${symbol.img})`,
        margin: '1px'
    })

    const squareStyle = (index) => ({
        width: '128px',
        height: '128px',
        backgroundImage: (keys.length > index) ? `url(${keys[index].img})` : null,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        backgroundSize: '100% 100%',
        margin: '3px',
        border: '3px grey solid',
        boxShadow: '3px 3px 2px black'
    })

    const addSymbol = (symbol) => {
        if(keys.length < 4) {
            setKeys(prev => [...prev, symbol])
        }
    }

    const reset = () => {
        setKeys([])
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px', marginInline: '100px', alignItems: 'start'}}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 'auto'}}>
                    <div style={squareStyle(0)}/>
                    <div style={squareStyle(1)}/>
                    <div style={squareStyle(2)}/>
                    <div style={squareStyle(3)}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', fontSize: '50px'}}>
                        1 <div style={{...squareStyle(0), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px'}}>
                        2 <div style={{...squareStyle(0), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px'}}>
                        3 <div style={{...squareStyle(0), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px'}}>
                        4 <div style={{...squareStyle(0), width: '100px', height: '100px'}}/>
                    </div>
                    <button className='reset-button' onClick={reset}>Reset</button>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '50%'}}>
                    {symbols.map((s, index) => <button className='symbol-button' style={keypadStyle(s)} onClick={() => addSymbol(s)} key={index} />)}
                </div>
            </div>
        </div>
    );
}

export default Keypads;