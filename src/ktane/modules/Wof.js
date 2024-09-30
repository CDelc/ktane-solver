import { useEffect, useState } from "react"

function Wof() {

    const strings = [
        {display: 'YES', index: 3},
        {display: 'FIRST', index: 2},
        {display: 'DISPLAY', index: 6},
        {display: 'OKAY', index: 2},
        {display: 'SAYS', index: 6},
        {display: 'NOTHING', index: 3},
        {display: '', index: 5},
        {display: 'BLANK', index: 4},
        {display: 'NO', index: 6},
        {display: 'LED', index: 3},
        {display: 'LEAD', index: 6},
        {display: 'READ', index: 4},
        {display: 'RED', index: 4},
        {display: 'REED', index: 5},
        {display: 'LEED', index: 5},
        {display: 'HOLD ON', index: 6},
        {display: 'YOU', index: 4},
        {display: 'YOU ARE', index: 6},
        {display: 'YOUR', index: 4},
        {display: 'YOU\'RE', index: 4},
        {display: 'UR', index: 1},
        {display: 'THERE', index: 6},
        {display: 'THEY\'RE', index: 5},
        {display: 'THEIR', index: 4},
        {display: 'THEY ARE', index: 3},
        {display: 'SEE', index: 6},
        {display: 'C', index: 2},
        {display: 'CEE', index: 6}
    ]
    
    const solutionTable = [
        ["READY", "YES", "OKAY", "WHAT", "MIDDLE", "LEFT", "PRESS", "RIGHT", "BLANK", "READY", "NO", "FIRST", "UHHH", "NOTHING", "WAIT"],
        ["FIRST", "LEFT", "OKAY", "YES", "MIDDLE", "NO", "RIGHT", "NOTHING", "UHHH", "WAIT", "READY", "BLANK", "WHAT", "PRESS", "FIRST"],
        ["NO", "BLANK", "UHHH", "WAIT", "FIRST", "WHAT", "READY", "RIGHT", "YES", "NOTHING", "LEFT", "PRESS", "OKAY", "NO", "MIDDLE"],
        ["BLANK", "WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK", "PRESS", "READY", "NOTHING", "NO", "WHAT", "LEFT", "UHHH", "YES", "FIRST"],
        ["NOTHING", "UHHH", "RIGHT", "OKAY", "MIDDLE", "YES", "BLANK", "NO", "PRESS", "LEFT", "WHAT", "WAIT", "FIRST", "NOTHING", "READY"],
        ["YES", "OKAY", "RIGHT", "UHHH", "MIDDLE", "FIRST", "WHAT", "PRESS", "READY", "NOTHING", "YES", "LEFT", "BLANK", "NO", "WAIT"],
        ["WHAT", "UHHH", "WHAT", "LEFT", "NOTHING", "READY", "BLANK", "MIDDLE", "NO", "OKAY", "FIRST", "WAIT", "YES", "PRESS", "RIGHT"],
        ["UHHH", "READY", "NOTHING", "LEFT", "WHAT", "OKAY", "YES", "RIGHT", "NO", "PRESS", "BLANK", "UHHH", "MIDDLE", "WAIT", "FIRST"],
        ["LEFT", "RIGHT", "LEFT", "FIRST", "NO", "MIDDLE", "YES", "BLANK", "WHAT", "UHHH", "WAIT", "PRESS", "READY", "OKAY", "NOTHING"],
        ["RIGHT", "YES", "NOTHING", "READY", "PRESS", "NO", "WAIT", "WHAT", "RIGHT", "MIDDLE", "LEFT", "UHHH", "BLANK", "OKAY", "FIRST"],
        ["MIDDLE", "BLANK", "READY", "OKAY", "WHAT", "NOTHING", "PRESS", "NO", "WAIT", "LEFT", "MIDDLE", "RIGHT", "FIRST", "UHHH", "YES"],
        ["OKAY", "MIDDLE", "NO", "FIRST", "YES", "UHHH", "NOTHING", "WAIT", "OKAY", "LEFT", "READY", "BLANK", "PRESS", "WHAT", "RIGHT"],
        ["WAIT", "UHHH", "NO", "BLANK", "OKAY", "YES", "LEFT", "FIRST", "PRESS", "WHAT", "WAIT", "NOTHING", "READY", "RIGHT", "MIDDLE"],
        ["PRESS", "RIGHT", "MIDDLE", "YES", "READY", "PRESS", "OKAY", "NOTHING", "UHHH", "BLANK", "LEFT", "FIRST", "WHAT", "NO", "WAIT"],
        ["YOU", "SURE", "YOU ARE", "YOUR", "YOU'RE", "NEXT", "UH HUH", "UR", "HOLD", "WHAT?", "YOU", "UH UH", "LIKE", "DONE", "U"],
        ["YOU ARE", "YOUR", "NEXT", "LIKE", "UH HUH", "WHAT?", "DONE", "UH UH", "HOLD", "YOU", "U", "YOU'RE", "SURE", "UR", "YOU ARE"],
        ["YOUR", "UH UH", "YOU ARE", "UH HUH", "YOUR", "NEXT", "UR", "SURE", "U", "YOU'RE", "YOU", "WHAT?", "HOLD", "LIKE", "DONE"],
        ["YOU'RE", "YOU", "YOU'RE", "UR", "NEXT", "UH UH", "YOU ARE", "U", "YOUR", "WHAT?", "UH HUH", "SURE", "DONE", "LIKE", "HOLD"],
        ["UR", "DONE", "U", "UR", "UH HUH", "WHAT?", "SURE", "YOUR", "HOLD", "YOU'RE", "LIKE", "NEXT", "UH UH", "YOU ARE", "YOU"],
        ["U", "UH HUH", "SURE", "NEXT", "WHAT?", "YOU'RE", "UR", "UH UH", "DONE", "U", "YOU", "LIKE", "HOLD", "YOU ARE", "YOUR"],
        ["UH HUH", "UH HUH", "YOUR", "YOU ARE", "YOU", "DONE", "HOLD", "UH UH", "NEXT", "SURE", "LIKE", "YOU'RE", "UR", "U", "WHAT?"],
        ["UH UH", "UR", "U", "YOU ARE", "YOU'RE", "NEXT", "UH UH", "DONE", "YOU", "UH HUH", "LIKE", "YOUR", "SURE", "HOLD", "WHAT?"],
        ["WHAT?", "YOU", "HOLD", "YOU'RE", "YOUR", "U", "DONE", "UH UH", "LIKE", "YOU ARE", "UH HUH", "UR", "NEXT", "WHAT?", "SURE"],
        ["DONE", "SURE", "UH HUH", "NEXT", "WHAT?", "YOUR", "UR", "YOU'RE", "HOLD", "LIKE", "YOU", "U", "YOU ARE", "UH UH", "DONE"],
        ["NEXT", "WHAT?", "UH HUH", "UH UH", "YOUR", "HOLD", "SURE", "NEXT", "LIKE", "DONE", "YOU ARE", "UR", "YOU'RE", "U", "YOU"],
        ["HOLD", "YOU ARE", "U", "DONE", "UH UH", "YOU", "UR", "SURE", "WHAT?", "YOU'RE", "NEXT", "HOLD", "UH HUH", "YOUR", "LIKE"],
        ["SURE", "YOU ARE", "DONE", "LIKE", "YOU'RE", "YOU", "HOLD", "UH HUH", "UR", "SURE", "U", "WHAT?", "NEXT", "YOUR", "UH UH"],
        ["LIKE", "YOU\'RE", "NEXT", "U", "UR", "HOLD", "DONE", "UH UH", "WHAT?", "UH HUH", "YOU", "LIKE", "SURE", "YOU ARE", "YOUR"],
    ]

    const modStyle = {
        display: 'grid',
        gridTemplateColumns: '200px 200px',
        gridTemplateRows: 'repeat(4, 100px)',
        gap: '10px',
        backgroundColor: 'rgb(150, 150, 150)',
        padding: '10px'
    }

    const getStyle = (index) => {
        if(index === 0) return screenStyle();
        else return buttonStyle(index);
    }

    const screenStyle = () => ({
        gridColumn: '1 / 3',
        gridRow: '1 / 2',
        backgroundColor: 'rgb(50, 50, 50)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '40px',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
        border: problems[0] ? '5px solid red' : 'none'
    })

    const buttonStyle = (index) => ({
        backgroundColor: 'rgb(170, 170, 150)',
        gap: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '35px',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '500',
        textAlign: 'center',
        border: problems[index] ? '5px solid red' : (solution === index && problems.indexOf(true) === -1) ? '5px solid green' : 'none',
        boxShadow: '1px 1px 3px',
        borderRadius: '10px'
    })
    
    const [words, setWords] = useState(new Array(7).fill(''))
    const [problems, setProblems] = useState(new Array(7).fill(false))
    const [solution, setSolution] = useState(-1)

    const updateWords = (word, index) => {
        let tmp = [...words];
        tmp[index] = word;
        setWords(tmp);
    }

    const isValidWord = (word, index) => {
        if(index === 0) return strings.filter(s => s.display.toLowerCase() === word.toLowerCase()).length > 0;
        return solutionTable.flat().indexOf(word.toUpperCase()) !== -1;
    }

    const updateState = () => {
        setProblems(words.map((word, index) => (isValidWord(word, index) ? false : true)))
        const findObject = strings.find(o => o.display.toLowerCase() === words[0].toLowerCase())
        if(findObject) {
            const i = findObject.index;
            const button = words[i];
            const list = solutionTable.find(arr => arr[0].toLowerCase() === button.toLowerCase())
            if(list) {
                const sorted = words.map(word => list.slice(1).indexOf(word.toUpperCase()));
                const filteredList = sorted.map((e, i) => ({num: e, ind: i})).filter(e => e.num > -1);
                console.log(sorted)
                if(filteredList.length > 0) setSolution(filteredList.reduce((min, item) => item.num < min.num ? item : min, {num: 100}).ind);
                else setSolution(-1);
            }
            else setSolution(-1);
        }
    }

    const reset = () => {
        setWords(new Array(7).fill(''))
        setSolution(-1)
    }

    useEffect(updateState, [words])

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '500px'}}>
            <button className='reset-button' onClick={reset}>Reset</button>
            <div style={modStyle}>
                {[0,1,2,3,4,5,6].map(i => (
                    <input maxLength={8} style={getStyle(i)} onChange={e => updateWords(e.target.value, i)} key={i} value={words[i]}/>
                ))}
            </div>
            {(problems.indexOf(true) > -1) && <div className="module-error">The red highlighted regions are not valid words for this module</div>}
            {(solution > 0 && problems.indexOf(true) === -1) && <div className="module-solve">Press the highlighted button</div>}
        </div>
    );
}

export default Wof;