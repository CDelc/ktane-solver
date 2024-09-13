import { useContext } from 'react'
import BatteryHolder from './BatteryHolder';
import { EdgeworkContext } from '../EdgeworkProvider';

function BatteryEditor() {
    
    const {edgework, setEdgework} = useContext(EdgeworkContext);

    const [batteries, setBatteries] = [edgework.batteryHolders, (b) => setEdgework(prev => ({...prev, batteryHolders: b}))];
    
    const addBattery = () => {
        setBatteries([...batteries, "AA"])
    }

    return (
        <div className="edgework-option-container">
            {batteries.map((battery, index) => <BatteryHolder type={battery} state={[batteries, setBatteries]} index={index} key={index}/>)}
            <button type="button" className="add-button" onClick={addBattery}>
                Add Batteries
            </button>
        </div>
    )
}

export default BatteryEditor;