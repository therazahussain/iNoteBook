import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import NoteState from './context/notes/NoteState';



function App() {

  const [alert,setAlert] = useState(null)

  const showAlert = (message,type) => {
    setAlert({message:message,type:type})
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert = {alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
