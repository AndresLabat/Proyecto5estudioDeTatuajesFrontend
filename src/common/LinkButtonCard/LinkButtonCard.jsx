import './LinkButtonCard.css'
import { useNavigate } from 'react-router-dom';

export const LinkButtonCard = ({ path, title, action }) => {

    const navigate = useNavigate();
    const actionDouble = (path) =>{
        navigate(path)
        action()
    }

    return (
        <button id="btn" onClick={() => actionDouble(path)}>
            {title}
        </button>
    )
}