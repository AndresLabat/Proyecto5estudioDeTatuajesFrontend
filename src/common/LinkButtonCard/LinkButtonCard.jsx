import './LinkButtonCard.css'
import { useNavigate } from 'react-router-dom';

export const LinkButtonCard = ({ path, title }) => {

    const navigate = useNavigate();

    return (
        <button id="btn" onClick={() => navigate(path)}>
            {title}
        </button>
    )
}