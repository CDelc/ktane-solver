import { useContext } from 'react'
import PortPlateEditor from './PortPlateEditor';
import { EdgeworkContext } from '../EdgeworkProvider';

function PortEditor() {
    
    const {edgework, setEdgework} = useContext(EdgeworkContext);

    const [ports, setPorts] = [edgework.portPlates, (b) => setEdgework(prev => ({...prev, portPlates: b}))];
    
    const addPortPlate = () => {
        setPorts([...ports, []]);
    }

    return (
        <div className="edgework-option-container">
            {ports.map((portPlate, index) => <PortPlateEditor content={portPlate} state={[ports, setPorts]} index={index} key={index}/>)}
            <button type="button" className="add-button" onClick={addPortPlate}>
                Add Port Plates
            </button>
        </div>
    )
}

export default PortEditor;