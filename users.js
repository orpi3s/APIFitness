const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getUser,
  getUserById,
  getPublicRoutinesByUser,
} = require("../db");
const jwt = require("jsonwebtoken");
const authorizeUser = require("./auth");
const { JWT_SECRET } = process.env;

module.exports = usersRouter;

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (password.length < 8) {
      throw new Error("Password length must be atleast 8 characters");
    }

    const user = await createUser({ username, password });
    res.send({ user });
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser({ username, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    res.send({ token });
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/me", authorizeUser, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const routines = await getPublicRoutinesByUser({
      username: req.params.username,
    });
    res.send(routines);
  } catch (err) {
    next(err);
  }
});
