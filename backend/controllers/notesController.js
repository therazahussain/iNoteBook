const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// Controller 1 --> for fetching all the notes of a logged in user.
const fetchAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        res.status(404).send("Some Internal Server Error")
        console.log(error);
    }

}

// Controller 2 --> for creating notes and storing them in the database.
const addNotes = ([
    body("title", "Enter a valid Title").isLength({ min: 1 }),
    body("description", "Enter a valid description").isLength({ min: 5 })],
    async (req, res) => {
        // Try Catch Statement
        try {
            // Destructuring of the values send by the user through
            const { title, description, tag } = req.body;
            // Check if there are any validations error or not and if there are any send bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Create New Notes
            const note = new Notes({
                user: req.user.id,
                title: title,
                description: description,
                tag: tag
            })
            const saveNote = await note.save();
            res.json({ saveNote });
        } catch (error) {
            res.status(404).send("Some Internal Server Error")
            console.log(error);
        }

    }
)

// Controller 3 --> for updating notes of the logged in user.
const updateNotes = async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a empty a object and fill all the details giiven by the user.
        let newNote = {};
        // Check all details passed by used and fill them inside the newNote obj if there are any.
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };
        // Find the note that we want to Update by the use of id that is paseed in the Route
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json("Not Found");
        }
        // Check if the user is authorized or not.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Please authenticate using a valid token" });
        }
        // Updating the note.
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        res.status(404).send("Some Internal Server Error")
        console.log(error);
    }
}


// Controller 4 --> for deleting notes of the logged in user.
const deleteNotes = async (req, res) => {
    try {
        // Find the note that we want to delete by the use of id that is paseed in the Route
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json("Not Found");
        }
        // Check if the user is authorized or not.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Please authenticate using a valid token" });
        }
        // Delete the note from the database.
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Has Been Deleted" });


    } catch (error) {
        res.status(404).send("Some Internal Server Error")
        console.log(error);
    }
}
// Exporting the functions from the Controller File.
module.exports = { fetchAllNotes, addNotes, updateNotes, deleteNotes } 