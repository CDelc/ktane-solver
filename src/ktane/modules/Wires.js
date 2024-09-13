import { useState, useContext, useEffect } from 'react'
import { EdgeworkContext } from '../EdgeworkProvider';
import Select from 'react-select'
import { getLastDigit } from '../utils'

function Wires() {

    const wireStyle = {
        marginInline: '20%',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '400',
        fontSize: '18px'
    }

    const {edgework, setEdgework} = useContext(EdgeworkContext);
    
    const validColors = ['White', 'Black', 'Yellow', 'Red', 'Blue']
    const options = validColors.map(c => ({value: c, label: c}))

    const [wireState, setWireState] = useState(['White', 'White', 'White'])
    const [cutWire, setCutWire] = useState(-1)
    const [error, setError] = useState("")

    const solve = (wires) => {
        if(edgework.serialNumber.length != 6) {
            setError("The serial number should be 6 characters long");
            setCutWire(-1);
            return;
        }
        else if(getLastDigit(edgework.serialNumber) === null) {
            setError("The serial number should contain a digit");
            setCutWire(-1);
            return;
        }
        else setError("");
        switch(wires.length) {
            case 3:
               if(wires.indexOf("Red") === -1) setCutWire(1);
               else if(wires[2] === 'White') setCutWire(2);
               else if(wires.filter(wire => wire === "Blue").length > 1) setCutWire(wires.lastIndexOf("Blue"));
               else setCutWire(2);
               break;
            case 4:
                if(wires.filter(wire => wire === "Red").length > 1 && getLastDigit(edgework.serialNumber) % 2 === 1) setCutWire(wires.lastIndexOf("Red"));
                else if(wires.indexOf('Red') === -1 && wires[wires.length - 1] === "Yellow") setCutWire(0);
                else if(wires.filter(wire => wire === "Blue").length === 1) setCutWire(0);
                else if(wires.filter(wire => wire === "Yellow").length > 1) setCutWire(3);
                else setCutWire(1);
                break;
            case 5:
                if(wires[wires.length - 1] === 'Black' && getLastDigit(edgework.serialNumber) % 2 === 1) setCutWire(3);
                else if(wires.filter(wire => wire === 'Red').length === 1 && wires.filter(wire => wire === 'Yellow').length > 1) setCutWire(0);
                else if(wires.indexOf('Black') === -1) setCutWire(1);
                else setCutWire(0);
                break;
            case 6:
                if(wires.indexOf('Yellow') === -1 && getLastDigit(edgework.serialNumber) % 2 === 1) setCutWire(2);
                else if(wires.filter(wire => wire === 'Yellow').length === 1 && wires.filter(wire => wire === 'White').length > 1) setCutWire(3);
                else if(wires.indexOf('Red') === -1) setCutWire(5);
                else setCutWire(3);
                break;
            default: break;
        }
    }

    const updateWireState = (wire, index) => {
        let tmp = [...wireState];
        tmp[index] = wire;
        setWireState(tmp)
        solve(tmp)
    }

    const colorSettings = (provided, state) => {
        return {
            ...provided,
            backgroundColor: state.data.value,
            color: (state.data.value === "Blue" || state.data.value === "Black") ? 'white' : 'black'
        }
    }

    const addWire = () => {
        let tmp = [...wireState, 'White'];
        setWireState(prev => (tmp))
        solve(tmp)
    }

    const removeWire = (index) => {
        let tmp = [...wireState];
        tmp.splice(index, 1)
        setWireState(tmp)
        solve(tmp)
    }

    useEffect(() => solve(wireState), [edgework])

    return (
        <div style={wireStyle}>
            {wireState.map((wire, index) => (
                    <div key={index}>
                        {index===cutWire && <span style={{color: 'red', fontWeight: '600', fontSize: '25px'}}>{"Cut Wire " + (index + 1)}</span>}
                        {index!=cutWire && <span>{"Wire " + (index + 1)}</span>}  
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                            <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                                <Select
                                    value={{value: wire, label: wire}}
                                    onChange={e => updateWireState(e.value, index)}
                                    options={options}
                                    styles={{
                                        option: colorSettings,
                                        control: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: wireState[index],
                                            color: (wireState[index] == "Blue" || wireState[index] == "Black") ? 'white' : 'black',
                                            boxShadow: '3px 3px 2px black'
                                        }),
                                        singleValue: colorSettings
                                    }}
                                />
                            </div>
                            {wireState.length > 3 && <button onClick={() => removeWire(index)} className="remove-port" style={{margin: '10px'}}>-</button>}
                        </div>
                    </div>
                )
            )}
            <div style={{width: '50px', display: 'flex', justifyContent: 'space-between'}}>
                {wireState.length < 6 && <button className="add-port" onClick={addWire}>+</button>}
            </div>
            {(error.length > 0) && <div className="module-error">{error}</div>}
        </div>
    );
}

export default Wires;