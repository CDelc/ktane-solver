import { useNavigate } from "react-router-dom";

function ModuleListItem(props) {

    const navigate = useNavigate();
    const module = props.data;

    const onClick = () => {
        navigate(module.path);
    }

    return (
        <button className="module-button" onClick={onClick}>
            <div className="module-button-title">
                {module.name}
            </div>
            <img src={module.image} alt="" className="button-image" />
        </button>
    )
}

export default ModuleListItem;