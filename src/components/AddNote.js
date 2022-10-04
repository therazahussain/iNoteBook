import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/notesContext"


function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added","success")
    }

    const onChange = (e) =>{
        setNote({...note ,[e.target.name]:e.target.value});
    }

    return (
        <div id="container">
            <h2>Add a Note</h2>
            <form className="myform">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <button disabled={note.title.length < 1 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote