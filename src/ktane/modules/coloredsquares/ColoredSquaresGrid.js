import { useEffect, useState } from 'react'
import { COLOR, detectModule, MODULE_TYPES } from './ColoredSquaresTools';

function ColoredSquaresGrid({state, moduleState, solvingState, highlight, text, loading, flashingState}) {

    const [colors, setColors] = state
    const [module, setModule] = moduleState
    const [solving, setSolving] = solvingState
    const [flashing, setFlashing] = flashingState
    const squareText = text

    const [currentColor, setCurrentColor] = useState(0);

    const [showAllColors, setShowAllColors] = useState(false)
    const [error, setError] = useState('Module variant not detected')

    const disableExtraColors = solving && module !== MODULE_TYPES.JUXTACOLORED && module !== MODULE_TYPES.TOMBSTONE

    const gridStyle = {
        display: 'grid',
        gridTemplateRows: 'repeat(4, 100px)',
        gridTemplateColumns: 'repeat(4, 100px)',
        backgroundColor: '#888',
        width: '430px',
        height: '430px',
        gap: '10px',
        padding: '20px',
        marginTop: '20px'
    }

    const menuStyle = {
        display: 'flex',
        gap: '5px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }

    const menuButtonStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        color: '#ddd',
        fontSize: '25px',
        fontWeight: '400',
        flexShrink: '0'
    }

    const menuHeadingStyle = {
        fontFamily: '"Roboto"',
        fontStyle: 'bold',
        fontSize: '30px',
        fontWeight: '400',
        marginTop: '0em',
        marginBottom: '0'
    }

    const toggleMoreColors = () => {
        if(showAllColors) {
            setShowAllColors(false)
            if(currentColor > 5) setCurrentColor(0)
            let tmp = [...colors]
            const removedAdvanced = tmp.map((square) => {
                if(square > 5) return 0
                else return square
            })
            setColors(removedAdvanced)
        } else {
            setShowAllColors(true)
        }
    }

    const changeColor = (colorIndex, index) => {
        if(loading) return
        if(colorIndex === 17) {
            flashing === index ? setFlashing(-1) : setFlashing(index)
        }
        else {
            let tmp = [...colors]
            tmp[index] = colorIndex
            setColors(tmp)
        }
    }

    const fillColor = (color) => {
        if(color > 16 || color < 0) return
        setColors(new Array(16).fill(color))
    }

    const clear = () => {
        if(loading) return
        setColors(new Array(16).fill(0))
        setFlashing(-1)
    }

    const updateError = () => {
        const module = detectModule(colors, flashing)
        if(module === '' && !solving) {
            setError('Module variant not detected')    
        }
        else {
            setError('')
        }
        if(!solving) setModule(module)
    }

    useEffect(updateError);
    return (
        <div className='center'>
            <div style={{display: 'flex', gap: '10px'}}>
                
                {error !== '' && <div className='module-error no-margin'>{error}</div>}
                {error === '' && module !== '' && <div className='module-solve no-margin'>{module}</div>}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'start'}}>
                <div style={gridStyle}>
                    {[...Array(16)].map((_, index) => (
                        <button
                            key={index}
                            className='lighten-button'
                            style={{
                                backgroundColor: COLOR[colors[index]],
                                borderRadius: '7px',
                                border: Array.isArray(highlight) ? highlight.includes(index) ? colors[index] === 0 ? '4px solid #444' : '4px solid #aff' : 'none'
                                    : index === highlight ? colors[index] === 0 ? '4px solid #444' : '4px solid #aff' : 'none',
                                color: colors[index] === 0 || colors[index] === 4 || colors[index] === 6 ? 'black' : 'white',
                                fontSize: '25px',
                                fontWeight: '600'
                            }}
                            onClick={() => changeColor(currentColor, index)}
                        >
                            {squareText[index]}
                        </button>
                    ))}
                </div>
                <div className='center' style={{width: '500px'}}>
                    {/* <h3 style={menuHeadingStyle}>Color Select</h3> */}
                    <button onClick={toggleMoreColors} className='blue-button' style={{width: '250px'}}>
                        {showAllColors ? 'Show Fewer Colors' : 'Show More Colors'}
                    </button>
                    <div style={menuStyle}>
                        {[...Array(showAllColors ? COLOR.length : 6)].map((_, index) => (
                            <button
                                key={index}
                                className='lighten-button'
                                style={{...menuButtonStyle,
                                    backgroundColor: COLOR[index],
                                    index,
                                    border: index === currentColor ? index === 0 ? '4px solid #444' : '4px solid #fff' : '1px solid black'}}
                                onClick={() => setCurrentColor(index)}>
                            </button>
                        ))}
                    </div>
                </div>
                <div className='center'>
                    <button onClick={clear} className='reset-button' style={{width: '250px'}}>Clear Grid</button>
                    <button onClick={() => fillColor(currentColor)} className='blue-button' style={{width: '250px'}}>
                        Fill Grid
                    </button>
                    {/* <button onClick={() => setCurrentColor(17)}
                        className='blue-button'
                        style={{width: '250px', border: currentColor === 17 ? '3px solid red' : '1px rgb(0, 4, 128) solid'}}
                    >
                        Set Flashing
                    </button> */}
                </div>
            </div>
            
            
        </div>
    )
}

export default ColoredSquaresGrid;