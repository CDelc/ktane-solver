import { useRef, useState, useEffect } from "react";

function Memory() {

    const getStyle = (index) => {
        if(index === 0) return screenStyle
        else return buttonStyle(index)
    }

    const modStyle = {
        display: 'grid',
        gridTemplateRows: '200px 150px',
        gridTemplateColumns: 'repeat(4, 25%)',
        width: '400px',
        backgroundColor: 'rgb(100, 100, 100)'
    }

    const screenStyle = {
        backgroundColor: 'rgb(0, 100, 25)',
        color: 'white',
        gridColumn: '1 / 5',
        borderTop: '25px solid grey',
        borderBottom: '25px solid grey',
        borderInline: '50px solid grey',
        fontSize: '100px',
        textAlign: 'center',
        fontWeight: '600'
    }

    const buttonStyle = (index) => ({
        backgroundColor: 'rgb(170, 170, 150)',
        border: (solution[0] === index) ? '5px solid rgb(0, 200, 0)' : 'none',
        borderRadius: '10px',
        margin: '5px',
        color: 'black',
        fontSize: '80px',
        textAlign: 'center'
    })

    const stageLightStyle = {
        display: 'grid',
        gridTemplateRows: 'repeat(5, 70px)',
        width: '70px',
        backgroundColor: 'grey',
        height: '100%'
    }

    const stageLight = (index) => ({
        margin: '20px',
        backgroundColor: (memory.length > index) ? 'green' : 'black'
    })

    const inputRefs = useRef([]);
    const [contents, setContents] = useState(new Array(5).fill(''))
    const [memory, setMemory] = useState([])
    const [solution, setSolution] = useState([])

    const updateContents = (index, input) => {
        let tmp = [...contents];
        tmp[index] = input;
        setContents(tmp)
    }
    
    const handleInputChange = (index, event) => {
        const { value } = event.target;
        if((value <= '4' && value >= '0' && (index === 0 || contents.slice(1).indexOf(value) === -1)) || value === '') updateContents(index, value);
        else {
            updateContents(index, '');
            return;
        }
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        else if(value.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const solve = () => {
        if(contents.indexOf('') != -1) {
            setSolution([])
            return
        }
        const stage = memory.length + 1;
        const display = parseInt(contents[0]);
        switch (stage) {
            case 1:
                switch(display) {
                    case 1: setSolution([2,contents[2]])
                    break;
                    case 2: setSolution([2,contents[2]])
                    break;
                    case 3: setSolution([3,contents[3]])
                    break;
                    case 4: setSolution([4,contents[4]])
                    break;
                    default: break;
                }
                break;
            case 2:
                switch(display) {
                    case 1: setSolution([contents.slice(1).indexOf('4') + 1, '4'])
                    break;
                    case 2: setSolution([memory[0][0], contents[memory[0][0]]])
                    break;
                    case 3: setSolution([1, contents[1]])
                    break;
                    case 4: setSolution([memory[0][0], contents[memory[0][0]]])
                    break;
                    default: break;
                }
                break;
            case 3:
                switch(display) {
                    case 1: setSolution([contents.slice(1).indexOf(memory[1][1]) + 1, memory[1][1]])
                    break;
                    case 2: setSolution([contents.slice(1).indexOf(memory[0][1]) + 1, memory[0][1]])
                    break;
                    case 3: setSolution([3, contents[3]])
                    break;
                    case 4: setSolution([contents.slice(1).indexOf('4') + 1, '4'])
                    break;
                    default: break;
                }
                break;
            case 4:
                switch(display) {
                    case 1: setSolution([memory[0][0], contents[memory[0][0]]])
                    break;
                    case 2: setSolution([1, contents[1]])
                    break;
                    case 3: setSolution([memory[1][0], contents[memory[1][0]]])
                    break;
                    case 4: setSolution([memory[1][0], contents[memory[1][0]]])
                    break;
                    default: break;
                }
                break;
            case 5:
                switch(display) {
                    case 1: setSolution([contents.slice(1).indexOf(memory[0][1]) + 1, memory[0][1]])
                    break;
                    case 2: setSolution([contents.slice(1).indexOf(memory[1][1]) + 1, memory[0][1]])
                    break;
                    case 3: setSolution([contents.slice(1).indexOf(memory[3][1]) + 1, memory[0][1]])
                    break;
                    case 4: setSolution([contents.slice(1).indexOf(memory[2][1]) + 1, memory[0][1]])
                    break;
                    default: break;
                }
                break;
            default: break;
        }
    }

    const advanceStage = () => {
        setMemory(prev => [...prev, solution])
        setSolution([])
        setContents(new Array(5).fill(''))
    }

    const reset = () => {
        setMemory([])
        setSolution([])
        setContents(new Array(5).fill(''))
    }

    useEffect(solve, [contents])
    
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={modStyle}>
                    {[...Array(5)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleInputChange(index, e)}
                            value={contents[index]}
                            style={getStyle(index)}
                        />
                    ))}
                </div>
                <div style={stageLightStyle}>
                    {
                        [...Array(5)].map((_, index) => (
                            <div style={stageLight(4 - index)} key={index}/>
                        ))
                    }
                </div>
            </div>
            {(solution.length > 0) && <div className="module-solve">Press the highlighted button, then press 'next' to advance to the next stage.</div>}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {(solution.length > 0) && <button onClick={advanceStage} className='advance-button'>Next...</button>}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
        
        
        
    );
}

export default Memory;