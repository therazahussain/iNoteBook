import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/notesContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { notes, getnotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("token")){
            getnotes();
        }else{
            navigate("/login")
        }
        
    })


    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({
            id: currentnote._id,
            etitle: currentnote.title,
            edescription: currentnote.description,
            etag: currentnote.tag
        })
    }


    const handleClick = (e) => {
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Updated Successfully","success")
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
            <div className="container">
                <AddNote showAlert={props.showAlert}/>
                <i className="fa-regular fa-plus-large"></i>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length < 1 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-3">
                    <h2>Your Notes</h2>
                    <div className="row">
                        {notes.map((note) => {
                            return <div className="col-md-4" key={note._id}>
                                <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} id={note._id} />
                            </div>
                        })}
                    </div>
                </div>
            </div>

    )
}

export default Notes