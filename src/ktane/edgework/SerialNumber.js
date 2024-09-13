import { useContext } from "react";
import { EdgeworkContext } from "../EdgeworkProvider";

function SerialNumber() {
      
    const { edgeWork, setEdgework } = useContext(EdgeworkContext);
    
    const updateSerial = (e) => {
        setEdgework((prev) => ({...prev, serialNumber: e.target.value}));
    }

    return (
        <div className="serial-number-container">
            <div className="serial-header">
                <div className="serial-header-text">
                    SERIAL #
                </div>
            </div>
            <div className="serial-form">
                <form>
                    <input name="serialNumber" className="serial-input" maxLength="6" placeholder="######" onChange={updateSerial}/>
                </form>
            </div>
        </div>
    );
}

export default SerialNumber;