function BatteryHolder(props) {
    
    const [batteries, setBatteries] = props.state

    const toggleBattery = () => {
        let tmp = [...batteries];
        tmp[props.index] = (props.type === 'AA') ? 'D' : 'AA';
        setBatteries(tmp)
    }

    const removeBattery = () => {
        let tmp = [...batteries];
        tmp.splice(props.index, 1);
        setBatteries(tmp);
    }
    
    return (
        <div className="battery-holder">
            <button className="remove-battery-button" onClick={removeBattery}>
                Remove
            </button>
            <button className="battery-button" onClick={toggleBattery}>
                {props.type}
            </button>
        </div>
    );
}

export default BatteryHolder;