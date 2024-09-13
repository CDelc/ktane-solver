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
            {props.module.component}
        </div>
    );
}

export default BombModule;