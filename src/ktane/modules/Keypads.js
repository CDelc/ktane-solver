import { useEffect, useState } from 'react';
import { symbols } from './keypadImages/keypads.js'

function Keypads() {

    const [keys, setKeys] = useState([]);
    const [solution, setSolution] = useState([]);
    const [error, setError] = useState('');

    const columns = [
        ['balloon', 'A', 'lambda', 'bolt', 'triangle', 'H', 'backC'],
        ['doubledot', 'balloon', 'backC', 'loop', 'star', 'H', 'question'],
        ['copy', 'W', 'loop', 'X', 'R', 'lambda', 'star'],
        ['six', 'paragraph', 'tb', 'triangle', 'X', 'question', 'smile'],
        ['psi', 'smile', 'tb', 'C', 'paragraph', 'three', 'blackstar'],
        ['six', 'doubledot', 'hash', 'ae', 'psi', 'N', 'omega']
    ];

    const findColumn = (arr) => {
        let result = columns.filter(c => (arr.filter(s => (c.indexOf(s.name) !== -1)).length === 4))
        if(result.length === 0) return [];
        else return result[0];
    }

    const solve = () => {
        if(keys.length !== 4) return;
        const col = findColumn(keys);
        if(col.length === 0) {setError('This input has no valid solution'); return;}
        const indicies = [0, 1, 2, 3].sort((a, b) => (col.indexOf(keys[a].name) - (col.indexOf(keys[b].name))))
        setSolution(indicies)
    }

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
        setKeys([]);
        setError('');
        setSolution([]);
    }

    useEffect(() => solve(), [keys]);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px', marginInline: '100px', alignItems: 'start'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 'auto'}}>
                        <div style={squareStyle(0)}/>
                        <div style={squareStyle(1)}/>
                        <div style={squareStyle(2)}/>
                        <div style={squareStyle(3)}/>
                    </div>
                    {(error.length > 0) && <div className="module-error">{error}</div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', fontSize: '50px', alignItems: 'center'}}>
                        1 <div style={{...squareStyle((solution.length === 4) ? solution[0] : 5), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px', alignItems: 'center'}}>
                        2 <div style={{...squareStyle((solution.length === 4) ? solution[1] : 5), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px', alignItems: 'center'}}>
                        3 <div style={{...squareStyle((solution.length === 4) ? solution[2] : 5), width: '100px', height: '100px'}}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '50px', alignItems: 'center'}}>
                        4 <div style={{...squareStyle((solution.length === 4) ? solution[3] : 5), width: '100px', height: '100px'}}/>
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