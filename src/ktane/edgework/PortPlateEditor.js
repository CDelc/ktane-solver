import Port from "./Port";

function PortPlateEditor(props) {
    
    const [ports, setPorts] = props.state

    const removePortPlate = () => {
        let tmp = [...ports];
        tmp.splice(props.index, 1);
        setPorts(tmp);
    }

    const setPortPlate = (plate) => {
        let tmp = [...ports];
        tmp[props.index] = plate;
        setPorts(tmp);
    }

    const portPlate = ports[props.index];

    const addPort = () => {
        setPortPlate([...portPlate, "dvi-d"])
    }
    
    return (
        <div className="battery-holder">
            <button className="remove-battery-button" onClick={removePortPlate}>
                Remove
            </button>
            <div className="port-plate">
                {ports[props.index].map((p, index) => (<Port state={[portPlate, setPortPlate]} index={index} key={index}/>))}
                <button className="add-port" onClick={addPort}>
                    +
                </button>
            </div>
        </div>
    );
}

export default PortPlateEditor;