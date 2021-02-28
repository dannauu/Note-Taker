const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  // Reads file for database
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // function to update the database
    function populateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
      });
    }
    var notes = JSON.parse(data);
    // get route for api/notes
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });
    // post route for api/notes
    app.post("/api/notes", function (req, res) {
      let newNote = req.body;
      notes.push(newNote);
      populateDb();
      res.json(notes);
    });
    // get route for specific note
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });
    // delete route for deleting note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      populateDb();
      res.json(notes);
    });
    // get route that displays static notes.html
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    // get route to handle anything starting with / using a wildcard
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
