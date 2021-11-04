const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use("/", express.json());
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "student",
  database: "pedro",
});

app.listen(3001, () => console.log("running on port 3001"));

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie')";
  //   db.query(sqlInsert, (err, result) => {
  //     res.send("hey 👋🏻");
  //   });
  res.send("sup!");
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.json(result);
    // console.log(result);
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  console.log(movieName, movieReview);
  const sqlInsert = `INSERT INTO movie_reviews (movieName, movieReview) VALUES ('${movieName}', '${movieReview}')`;
  db.query(sqlInsert, (err, result) => {
    console.log(`Err : ${err}, Result : ${result}`);
    console.log(typeof err);
    if (err == null) {
      console.log("this is happening");
      res.status(200).end();
    }
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = `DELETE FROM movie_reviews WHERE movieName='${name}'`;
  db.query(sqlDelete, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The data has got deleted");
      res.status(200).end();
    }
  });
});

app.put("/api/update", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlUpdate = `UPDATE movie_reviews SET movieReview='${movieReview}' WHERE movieName='${movieName}'`;
  db.query(sqlUpdate, (err, result) => {
    if (err) {
      console.log(err, result);
    } else {
      res.status(200).end();
    }
  });
});
