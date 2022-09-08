const { response } = require("express");
const express = require("express");
const router = express.Router();
const Movie = require("../model/movie");

//'C'reating
router.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//'R'ead
router.get("/:id", getMovie, (req, res) => {
  res.send(res.movie);
});
//'U'pdating
//Using PATCH instead of PUT to update only one property of the Movie
router.patch("/:id", getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name;
  }
  if (req.body.img != null) {
    res.movie.img = req.body.img;
  }
  if (req.body.summary != null) {
    res.movie.summary = req.body.summary;
  }

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//'D'eleting
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: `Deleted Movie ${res.movie.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read all
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware
async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();
}

module.exports = router;
