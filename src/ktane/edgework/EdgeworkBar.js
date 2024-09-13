import BatteryEditor from "./BatteryEditor";
import SerialNumber from "./SerialNumber";
import IndicatorEditor from "./IndicatorEditor";
import PortEditor from "./PortEditor";

function EdgeworkBar() {
    return (
        <div className="edgework-container">
            <SerialNumber />
            <BatteryEditor />
            <IndicatorEditor />
            <PortEditor />
        </div>
    )
}

export default EdgeworkBar;