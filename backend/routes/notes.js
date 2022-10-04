const express = require('express');
const router = express.Router();  
const {fetchAllNotes,addNotes, updateNotes, deleteNotes} = require('../controllers/notesController') 
const fetchUser = require('../middleware/authMiddleware') 

// Route 1 --> to fetch all the notes of a logged in user 
router.get("/fetchallnotes",fetchUser,fetchAllNotes);
// Route 2 --> to create the notes of a logged in user
router.post("/addnotes",fetchUser,addNotes); 
// Route 3 --> to update the notes of a logged in user
router.put("/updatenotes/:id",fetchUser,updateNotes);
// Route 4 --> to delete the notes of a logged in user
router.delete("/deletenotes/:id",fetchUser,deleteNotes);

module.exports = router