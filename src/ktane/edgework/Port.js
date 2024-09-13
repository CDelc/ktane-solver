function Port(props) {
    
    const [portPlate, setPortPlate] = props.state;

    const setPort = (value) => {
        let tmp = portPlate;
        tmp[props.index] = value;
        setPortPlate(tmp);
    }

    const removePort = () => {
        let tmp = portPlate;
        tmp.splice(props.index, 1);
        setPortPlate(tmp);
    }
    
    return (
        <div className="port">
            <select onChange={(e) => setPort(e.target.value)} value={portPlate[props.index]} className="port-select">
                <option value="dvi-d">DVI-D</option>
                <option value="parallel">Parallel Port</option>
                <option value="ps/2">PS/2</option>
                <option value="rj-45">RJ-45</option>
                <option value="serial">Serial Port</option>
                <option value="stereo rca">Stereo RCA</option>
            </select>
            <button className="remove-port" onClick={removePort}>-</button>
        </div>
        
    );
}

export default Port;