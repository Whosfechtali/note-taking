const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require("cors");
require('dotenv').config()


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));


//Connect to the database
mongoose.connect(process.env.MongoDBServer)


//Create Schema for the database
const noteSchema = {
  title: String,
  description: String,
  Time: Date
};

//Create the Model
const Note = mongoose.model("Note", noteSchema);

//////////////////////// Using HTTP Methods for RESTful Services ////////////

app.route("/")
////////// GET THE WHOLE DATABASE AND SORT BY NEWLY ADDED /////

  .get((req, res) => {
        Note.find({}).sort({Time: 'desc'}).exec((err, FoundNotes) => {
          if(!err){
            res.send(FoundNotes);
            console.log('FETCHED')
          }else{
            res.send(err)
          }})
        })

////////// POST NEW DATA AND SAVE IT THE DATABASE /////

  .post((req, res) => {
    const NewNote = new Note({
      title: req.body.title,
      description: req.body.description,
      Time: req.body.Time
    })
    NewNote.save((err)  =>{
      if(!err){
        res.send("Successfully added new note")

      }else{
        res.send(err)
      }
    })

////////// GET THE WHOLE DATABASE AND SORT BY NEWLY ADDED /////


  }).delete((req, res) =>{
        Note.deleteMany( (err) => {
          if(!err){
            res.send("Successfully deleted all notes");
          }else{
            res.send(err)
          }});
        })


//////////////////////// GET, UPDATE, DELETE SPECIFIC DATA////////////

  app.route('/:id')

    .get((req,res) =>{
      Note.findOne(
        {_id : req.params.id}
      ).exec((err, FoundNote) =>{
        if(!err){
          res.send(FoundNote)
          }else{
              res.send(err)
            }})
          })
    .put((req,res) =>{
      console.log(req.params)
      Note.updateOne(
        {_id : req.params.id},
        {title: req.body.title, description: req.body.description, Time: req.body.Time},
        (err) =>{
          if(!err){
            res.send("Successfully updated the note ")
          }
      })
    })

    .patch((req, res) =>{
      Note.updateOne(
        {_id: req.params.id},
        {$set: req.body},
        (err)=>{
            if(!err){
              res.send("Successfully updated the note ")
            }else{
              res.send(err)
            }
        })
    })
    .delete((req, res) =>{
      Note.deleteOne(
        {_id: req.params.id},
      (err)=>{
        if(!err){
          res.send("Successfully deleted")
          console.log(`Note ${req.params.id} deleted`);
        }else{
          res.send("Can not delete, try again")
        }
      })
    })
    app.route('/last')
    .get((req, res) =>{
      Note.findOne({}).sort({_id: -1}).limit(10).exec((err, FoundNote) =>{
        if(!err){
          res.send(FoundNote)
          }else{
              res.send(err)
            }})
          })

app.listen(3000, ()=>{
  console.log("Server Started on port 3000")
})
