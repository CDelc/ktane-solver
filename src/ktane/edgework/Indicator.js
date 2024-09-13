function Indicator(props) {
    
    const [indicators, setIndicators] = props.state

    const removeIndicator = () => {
        let tmp = [...indicators];
        tmp.splice(props.index, 1);
        setIndicators(tmp);
    }

    const toggleLight = () => {
        let tmp = [...indicators];
        tmp[props.index][1] = (tmp[props.index][1] === 0) ? 1 : 0;
        setIndicators(tmp);
    }

    const setIndicator = (s) => {
        let tmp = [...indicators];
        tmp[props.index][0] = s;
        setIndicators(tmp);
    }
    
    return (
        <div className="battery-holder">
            <button className="remove-battery-button" onClick={removeIndicator}>
                Remove
            </button>
            <div className="indicator">
                <button className={indicators[props.index][1] === 0 ? "indicator-light indicator-light-off" : "indicator-light indicator-light-on"} onClick={toggleLight}/>
                <input className="indicator-label" maxLength="3" onChange={(e) => setIndicator(e.target.value)} value={indicators[props.index][0]}/>
            </div>
        </div>
    );
}

export default Indicator;