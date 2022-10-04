import { useState } from "react";
import NoteContext from "./notesContext"

const NoteState = (props) => {

  const host = "http://localhost:5000"

  let initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  const getnotes = async() => {
    // API call
    const responce = await fetch(`${host}/api/notes/fetchallnotes`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      // body: JSON.stringify({title, description, tag})
    })

    const jsonData = await responce.json()
    initialNotes = [jsonData];
    setNotes(jsonData)
  }
    


  const addNote = async(title, description, tag) => {
    // API call
    const responce = await fetch(`${host}/api/notes/addnotes`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
  
    })

    // Logic code to add note on frontend
    const note = await responce.json()    
    setNotes(notes.concat(note.saveNote));
  }

  const editNote = async(id,title,description,tag) => {

    // API call
    const responce = await fetch(`${host}/api/notes/updatenotes/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    })

    // const jsonData = responce.json();
    
    let newNote = JSON.parse(JSON.stringify(notes))

    // Logic for updating a note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNote);
  }

  const deleteNote = async(id) => {
    const responce = await fetch(`${host}/api/notes/deletenotes/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },

    })

    const jsonData = responce.json();
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes((newNote));
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getnotes }}>
      {props.children}
    </NoteContext.Provider >
  )
}

export default NoteState