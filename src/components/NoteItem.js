import React,{useContext} from 'react'
import noteContext from "../context/notes/notesContext"

function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note} = props;

    const handleDelete = ()=>{
        deleteNote(props.id)
        props.showAlert("Deleted","success")
    }

    const handleUpdate = ()=>{
        props.updateNote(note)
    }

    return (
        <div className="card mx-2 my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tag}</p>
                <i className="fa-solid fa-trash-alt mx-2" onClick={handleDelete}></i>
                <i className="fa-solid fa-pen mx-2" onClick={handleUpdate}></i>
                <i className="fa-solid fa-plus-large"></i>
            </div>
        </div>
    )
}

export default NoteItem