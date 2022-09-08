const { response } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../model/user");

//'C'reating
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//'R'ead
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});
//'U'pdating
//Using PATCH instead of PUT to update only one property of the book
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.img != null) {
    res.user.img = req.body.img;
  }
  if (req.body.summary != null) {
    res.user.summary = req.body.summary;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//'D'eleting
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: `Deleted User ${res.user.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
