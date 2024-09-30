import { useState, useEffect, useContext } from "react";
import { EdgeworkContext } from "../EdgeworkProvider";
import { countPort, getNumBatteries, getLastDigit } from "../utils";

function ComplicatedWires() {
    
    const {edgework, setEdgework} = useContext(EdgeworkContext);

    const defaultState = {
        exists: true,
        colorOne: 'white',
        colorTwo: 'white',
        light: false,
        star: false
    }

    const [wires, setWires] = useState(new Array(6).fill({...defaultState}))
    const [solution, setSolution] = useState(new Array(6).fill(false))
    const [error, setError] = useState('')

    const modStyle = {
        display: 'grid',
        gridTemplateColumns: '50px repeat(6, 40px)',
        gridTemplateRows: 'repeat(4, 40px) 200px 40px 40px',
        fontFamily: '"Roboto"',
        fontStyle: 'italic',
        fontSize: '15px'
    }

    const renderButton = (index) => ({
        backgroundColor: wires[index].exists ? 'green' : 'red',
        border: 'none',
        margin: '3px',
        borderRadius: '10px',
        boxShadow: wires[index].exists ? '1px 1px 1px' : 'none'
    })

    const colorButton = (index, num) => ({
        backgroundColor: num===1 ? `${wires[index].colorOne}` : `${wires[index].colorTwo}`,
        border: 'none',
        margin: '3px',
        borderRadius: '10px'
    })

    const lightStyle = (index) => ({
        background: wires[index].light ? 'radial-gradient(#efe1a5, #ffffff)' : 'radial-gradient(#000000, #1f1f1f)',
        border: 'none',
        width: '20px',
        height: '20px',
        borderRadius: '10px'
    })

    const wireStyle = (index) => ({
        background: `repeating-linear-gradient(45deg, ${wires[index].colorOne} 0px, ${wires[index].colorOne} 10px, ${wires[index].colorTwo} 10px, ${wires[index].colorTwo} 20px)`,
        height: '100%',
        width: '10px'
    })

    const starStyle = {
        backgroundColor: 'rgb(200, 200, 150)',
        border: 'none',
        borderRadius: '10px',
        width: '30px',
        height: '30px',
        fontSize: '30px'
    }

    const updateExists = (index) => {
        let tmp = [...wires]
        let wire = {...tmp[index]}
        wire.exists ? wire.exists = false : wire.exists = true
        tmp[index] = wire;
        setWires(tmp)
    }

    const updateColor = (index, colorNum) => {
        let tmp = [...wires]
        let wire = {...tmp[index]}
        if(colorNum === 1) {
            wire.colorOne === 'white' ? wire.colorOne = 'red' : wire.colorOne === 'red' ? wire.colorOne = 'blue' : wire.colorOne = 'white'
        }
        else {
            wire.colorTwo === 'white' ? wire.colorTwo = 'red' : wire.colorTwo === 'red' ? wire.colorTwo = 'blue' : wire.colorTwo = 'white'
        }
        tmp[index] = wire;
        setWires(tmp)
    }

    const updateLight = (index) => {
        let tmp = [...wires]
        let wire = {...tmp[index]}
        wire.light ? wire.light = false : wire.light = true
        tmp[index] = wire;
        setWires(tmp)
    }

    const updateStar = (index) => {
        let tmp = [...wires]
        let wire = {...tmp[index]}
        wire.star ? wire.star = false : wire.star = true
        tmp[index] = wire;
        setWires(tmp)
    }

    const solve = (index) => {
        if(edgework.serialNumber.length < 6) {
            setError('The serial number should be 6 characters long')
        }
        else setError('')
        setSolution(wires.map((_, index) => solveWire(index)))
    }

    const solveWire = (index) => {
        
        const wire = wires[index]
        if(!wire.exists) return false

        const red = wire.colorOne === 'red' || wire.colorTwo === 'red'
        const blue = wire.colorOne === 'blue' || wire.colorTwo === 'blue'
        const star = wire.star
        const light = wire.light
        const port = countPort(edgework.portPlates, 'parallel') > 0
        const batteries = getNumBatteries(edgework.batteryHolders)
        const serial = getLastDigit(edgework.serialNumber)

        if(!red && !blue && !star && !light) return true
        else if(red && !blue && !star && !light) return serial
        else if(!red && blue && !star && !light) return serial
        else if(!red && !blue && star && !light) return true
        else if(!red && !blue && !star && light) return false
        else if(red && blue && !star && !light) return serial
        else if(red && !blue && star && !light) return true
        else if(red && !blue && !star && light) return batteries
        else if(!red && blue && star && !light) return false
        else if(!red && blue && !star && light) return port
        else if(!red && !blue && star && light) return batteries
        else if(red && blue && star && !light) return port
        else if(red && blue && !star && light) return serial
        else if(red && !blue && star && light) return batteries
        else if(!red && blue && star && light) return port
        else if(red && blue && star && light) return false
    }

    const reset = () => {
        setWires(new Array(6).fill({...defaultState}))
    }

    useEffect(solve, [edgework, wires])

    return (
        <div className='center' style={{flexDirection: 'column', alignItems: 'center'}}>
            <div style={modStyle}>
                <div className='center'>Exists</div>
                {[...Array(6)].map((_, index) => (<button style={renderButton(index)} onClick={() => updateExists(index)}/>))}
                <div className='center'>Color 1</div>
                {[...Array(6)].map((_, index) => (<button style={colorButton(index, 1)} onClick={() => updateColor(index, 1)} />))}  
                <div className='center'>Color 2</div>
                {[...Array(6)].map((_, index) => (<button style={colorButton(index, 2)} onClick={() => updateColor(index, 2)} />))} 
                <div className='center'>Light</div>
                {[...Array(6)].map((_, index) => (<div style={{backgroundColor: 'grey'}} className='center'><button style={lightStyle(index)} onClick={() => updateLight(index)}/></div>))}
                <div />
                {[...Array(6)].map((_, index) => (wires[index].exists ? (<div className='center'><div style={wireStyle(index)} /></div>) : <div />))}  
                <div className='center'>Star</div>
                {[...Array(6)].map((_, index) => (<div style={{backgroundColor: 'grey'}} className='center'><button style={starStyle} className='center' onClick={() => updateStar(index)}>{(wires[index].star ? '*' : '')}</button></div>))}  
                <div />
                {[...Array(6)].map((_, index) => (<div style={{color: 'rgb(150, 0, 0)', fontWeight: 'bold', borderInline: 'black 1px solid', margin: '1px'}} className='center'>{solution[index] ? 'Cut' : ''}</div>))}
            </div>
            {(error.length > 0) && <div className="module-error">{error}</div>}
            <button onClick={reset} className='reset-button'>Reset</button>
        </div>
    );
}

export default ComplicatedWires;