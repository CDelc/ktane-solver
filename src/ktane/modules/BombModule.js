import { useNavigate } from "react-router-dom";

function BombModule(props) {

    const navigate = useNavigate();

    const onBack = () => {
        navigate("/ktane");
    }

    return (
        <div className="module-container">
            <div className="module-header">
                <h1 className="module-header">{props.module.name}</h1>
                <button onClick={onBack}>
                    Return
                </button>
            </div>
            <div style={{width: '100%'}}></div>
            {props.module.component}
        </div>
    );
}

export default BombModule;