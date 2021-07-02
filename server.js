const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes }  = require('./db/notes.json');

const PORT = process.env.PORT || 3001;
const app = express();

//parsing for incoming data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

 //note creation

 function createNote(body, noteArray)
 {
    const note = body;
    noteArray.push(note);

    fs.writeFileSync(
    
    path.join(__dirname, './db/notes.json'),
    JSON.stringify({notes: noteArray}, null, 2)
    );
     return note;
 }

 //validation for note creation here 

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req,res) => {
      //for id creation
      req.body.id = notes.length.toString();
      const note = createNote(req.body, notes);

      res.json(note);
  })

  app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`);
})