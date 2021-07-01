const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const  db  = require('./db/db.json')


app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`);
})

app.get('/api/notes', (req, res) => {
    res.json(db);
  });
