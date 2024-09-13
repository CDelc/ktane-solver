import { useContext } from 'react'
import Indicator from './Indicator';
import { EdgeworkContext } from '../EdgeworkProvider';

function IndicatorEditor() {
    
    const {edgework, setEdgework} = useContext(EdgeworkContext);

    const [indicators, setIndicators] = [edgework.indicators, (b) => setEdgework(prev => ({...prev, indicators: b}))];
    
    const addIndicator = () => {
        setIndicators([...indicators, {label: "", lit: 0}]);
    }

    return (
        <div className="edgework-option-container">
            {indicators.map((indicator, index) => <Indicator content={indicator} state={[indicators, setIndicators]} index={index} key={index}/>)}
            <button type="button" className="add-button" onClick={addIndicator}>
                Add Indicators
            </button>
        </div>
    )
}

export default IndicatorEditor;