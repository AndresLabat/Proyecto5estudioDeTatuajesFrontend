import './DeleteButton.css'

export const DeleteButton = ({emit}) => {

     return (
         <div className="delete-button" onClick={()=>emit()}>Delete</div>
     )
}