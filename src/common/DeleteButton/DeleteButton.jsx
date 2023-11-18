import './DeleteButton.css'

export const DeleteButton = ({action}) => {
     return (
         <div className="delete-button" onClick={action}>Delete</div>
     )
}