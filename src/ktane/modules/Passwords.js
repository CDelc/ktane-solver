import { useState, useEffect } from 'react'

function Passwords() {

    const words = ['ABOUT', 'AFTER', 'AGAIN', 'BELOW', 'COULD', 'EVERY', 'FIRST', 'FOUND',
        'GREAT', 'HOUSE', 'LARGE', 'LEARN', 'NEVER', 'OTHER', 'PLACE', 'PLANT', 'POINT',
    'RIGHT', 'SMALL', 'SOUND', 'SPELL', 'STILL', 'STUDY', 'THEIR', 'THERE', 'THESE',
    'THING', 'THINK', 'THREE', 'WATER', 'WHERE', 'WHICH', 'WORLD', 'WOULD', 'WRITE']

    const [columns, setColumns] = useState(new Array(5).fill(''))
    const [solution, setSolution] = useState('')

    const modStyle = {
        display: 'grid',
        gridTemplateColumns: '100px 200px',
        gridTemplateRows: 'repeat(6, 50px)',
        fontFamily: '"Roboto"',
        fontSize: '20px'
    }

    const filterString = (str) => {
        const seen = new Set();
        
        return [...str].filter(char => {
            if (!seen.has(char)) {
              seen.add(char);
              return true;
            }
            return false;
            }).join('').toUpperCase();
    }

    const filterWords = () => {
        let tmp = [...words]

        columns.forEach((e, index) => {
            if(e.length === 0) return;
            else {
                tmp = tmp.filter((word) => e.indexOf(word.at(index)) > -1)
            }
        })
        return tmp;
    }

    const solve = () => {
        const fWords = filterWords()
        if(fWords.length !== 1) setSolution('')
        else setSolution(fWords[0])
    }

    const updateCols = (word, index) => {
        let tmp = [...columns];
        tmp[index] = filterString(word);
        setColumns(tmp);
    }

    const inputStyle = ({
        height: '80%',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: '40px',
        fontFamily: '"VT323", monospace',
        fontWeight: '400',
        fontStyle: 'normal',
        letterSpacing: '5px'
    })

    useEffect(solve, [columns])
    
    return (
        <div className='center'>
            <div className='module-solve' style={{marginBottom: '20px'}}>Enter the characters that are available in each column</div>
            <div style={modStyle}>
                {[...Array(5)].map((_, index) => (
                    <div className='center' key={index} style={{gridRow: `${index + 1} / ${index + 2}`}}>Column {index + 1}</div>
                ))}
                {[...Array(5)].map((_, index) => (
                    <input style={inputStyle} key={index+6} maxLength={6} onChange={e => updateCols(e.target.value, index)} value={columns[index]}/>
                ))}
            </div>
            {solution.length > 0 && <div className='module-solve'>Password: {solution}</div>}
        </div>
    );
}

export default Passwords;