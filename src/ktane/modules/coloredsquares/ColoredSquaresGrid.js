import { useEffect, useState } from 'react'
import { COLOR, offIndex, offColor, detectModule, MODULE_TYPES } from './ColoredSquaresTools';

function ColoredSquaresGrid({state, moduleState, solvingState, highlight, text}) {

    const [colors, setColors] = state
    const [module, setModule] = moduleState
    const [solving, setSolving] = solvingState
    const squareText = text

    const [currentColor, setCurrentColor] = useState(offIndex);

    const [showAllColors, setShowAllColors] = useState(false)
    const [error, setError] = useState('No squares should be off')

    const disableExtraColors = solving && module !== MODULE_TYPES.JUXTACOLORED && module !== MODULE_TYPES.TOMBSTONE

    const gridStyle = {
        display: 'grid',
        gridTemplateRows: 'repeat(4, 100px)',
        gridTemplateColumns: 'repeat(4, 100px)',
        backgroundColor: '#888',
        width: '430px',
        height: '430px',
        gap: '10px',
        padding: '20px'
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
        marginTop: '2em'
    }

    const toggleMoreColors = () => {
        if(showAllColors) {
            setShowAllColors(false)
            if(currentColor > 7) setCurrentColor(offIndex)
            let tmp = [...colors]
            const removedAdvanced = tmp.map((square) => {
                if(square > offIndex) return offIndex
                else return square
            })
            setColors(removedAdvanced)
        } else {
            setShowAllColors(true)
        }
    }

    const changeColor = (colorIndex, index) => {
        let tmp = [...colors]
        tmp[index] == colorIndex ? 
        tmp[index] = offIndex :
        tmp[index] = colorIndex
        setColors(tmp)
    }

    const clear = () => {
        setColors(new Array(16).fill(offIndex))
    }

    const updateError = () => {
        if(colors.filter((square) => square === offIndex).length > 0 && !solving) {
            setError('No squares should be off')    
        }
        else {
            setError('')
        }
        if(!solving) setModule(detectModule(colors))
    }

    useEffect(updateError);
    return (
        <div className='center'>
            {error !== '' && <div className='module-error'>{error}</div>}
            {error === '' && module !== '' && <div className='module-solve'>{module}</div>}
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <div style={gridStyle}>
                    {[...Array(16)].map((_, index) => (
                        <button
                            key={index}
                            className='lighten-button'
                            style={{
                                backgroundColor: COLOR[colors[index]],
                                borderRadius: '7px',
                                border: Array.isArray(highlight) ? highlight.includes(index) ? colors[index] === 0 | colors[index] === 4 ? '4px solid #444' : '4px solid #aff' : 'none'
                                    : index === highlight ? colors[index] === 0 | colors[index] === 4 ? '4px solid #444' : '4px solid #fff' : 'none',
                                color: colors[index] === 0 || colors[index] === 4 ? 'black' : 'white',
                                fontSize: '25px',
                                fontWeight: '600'
                            }}
                            onClick={() => changeColor(currentColor, index)}
                        >
                            {colors[index] === offIndex ? 'OFF' : squareText[index]}
                        </button>
                    ))}
                </div>
                <div className='center' style={{width: '40%'}}>
                    <h3 style={menuHeadingStyle}>Color Select</h3>
                    <button onClick={toggleMoreColors} className='blue-button' style={{width: '250px'}}>
                        {showAllColors ? 'Show Fewer Colors' : 'Show More Colors'}
                    </button>
                    <div style={menuStyle}>
                        {[...Array(showAllColors ? COLOR.length : 7)].map((_, index) => (
                            index !== offIndex && <button
                                key={index}
                                className='lighten-button'
                                style={{...menuButtonStyle,
                                    backgroundColor: COLOR[index],
                                    index,
                                    border: index === currentColor ? index === 0 ? '4px solid #444' : '4px solid #fff' : '1px solid black'}}
                                onClick={() => setCurrentColor(index)}>
                                {COLOR[index] === offColor ? 'CLEAR' : ''}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', margin: '30px'}}>
                <button onClick={clear} className='reset-button'>Clear</button>
            </div>
            
        </div>
    )
}

export default ColoredSquaresGrid;