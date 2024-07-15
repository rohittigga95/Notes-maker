import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';


const App = () => {
  const [notes, setNotes ] = useState([]);
  const [title, setTitle ] = useState("");
  const [content, setContent ] = useState("");

  useEffect(() => {
    //fetch notes from the server
    axios
        .get("http://localhost:5000/api/notes")
        .then((response) => setNotes(response.data))
        .catch((error) => console.error("Error fetching notes:", error))
  }, [])
  const handleAddNote = () => {
    //add a new note to the server
    axios
        .post("http://localhost:5000/api/notes", {title, content})
        .then((response) => {
          setNotes([...notes, response.data])
          setTitle("")
          setContent("")
        })
        .catch((error) => console.error("Error adding note:", error))
  }
  const handleEditNote = (id, updatedTitle, updatedContent) => {
    //update note by id
    axios
        .put(`http://localhost:5000/api/notes/${id}`, {
          title: updatedTitle,
          content: updatedContent,
        })
        .then((response) => {
          const updatedNotes = notes.map((note) =>
            note._id === id ? response.data : note
          )
          setNotes(updatedNotes)
        })
        .catch((error) => console.error("Error updating note:", error))
  }
  const handleDeleteNote = (id) => {
    //delete note
    axios
        .delete(`http://localhost:5000/api/notes/${id}`)
        .then((response => {
          const updatedNotes = notes.filter((note) => note._id !== id)
          setNotes(updatedNotes)
        }))
        .catch((error) => console.error("Error deleting note:", error ))

  }
  return (
    <div className="app-container">
      <h1>Notes App</h1>
      <AddNote
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onAddNote={handleAddNote}
        />
      <NoteList
        notes={notes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />  
    </div>
  )
}

export default App;
