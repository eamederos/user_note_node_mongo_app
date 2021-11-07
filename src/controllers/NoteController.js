const NoteController = {}
const NoteModel = require('../models/Note')
//New Note
NoteController.renderNoteForm = (req,res)=>{
    res.render("notes/newnote")
}

NoteController.createNewNote = async (req,res)=>{
    const {title, description} = req.body
    const new_note = new NoteModel({title: title, description: description})
    new_note.user = req.user.id
    await new_note.save()
    req.flash('success_msg','Note added successfully')
    res.redirect('/notes')
    
    
}

//Get all notes
NoteController.renderNotes = async (req,res)=>{
    const notes = await NoteModel.find({user: req.user.id}).sort({createdAt: 'desc'}).lean()
    res.render('notes/allnotes', {notes})
}

//Render edit form
NoteController.renderEditNote = async (req,res)=>{
    id = req.params.id
    //noteId = NoteModel.Types.ObjectId(id)
    try {
        note = await NoteModel.findById(id).lean()
        if (note) {
            if (note.user != req.user.id){
                return res.redirect('/notes')
            }
            res.render("notes/editnote", {note})
        } 
    }
    catch(e) {
         // some sort of internal error (probably database issue)
         console.log(e);
         res.sendStatus(500);
     }
    
   
}

//Update note
NoteController.updateNote = async(req,res)=>{
    const {title, description} = req.body
    id = req.params.id
    await NoteModel.findByIdAndUpdate(id,{title,description})
    req.flash('success_msg','Note updated successfully')
    res.redirect("/notes")
}

//Delete
NoteController.deleteNote = async (req,res)=>{
    id = req.params.id
    console.log(id)
    await NoteModel.findByIdAndDelete(id)
    req.flash('success_msg','Note deleted successfully')
    res.redirect('/notes')
} 



module.exports = NoteController