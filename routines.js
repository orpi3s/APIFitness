const express = require("express");
const routinesRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  destroyRoutineActivity,
  addActivityToRoutine,
} = require("../db");
const authorizeUser = require("./auth");

module.exports = routinesRouter;

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (err) {
    next(err);
  }
});

routinesRouter.post("/", authorizeUser, async (req, res, next) => {
  try {
    const { isPublic, name, goal } = req.body;
    const routine = await createRoutine({
      creatorId: req.user.id,
      isPublic,
      name,
      goal,
    });
    res.send(routine);
  } catch (err) {
    next(err);
  }
});

routinesRouter.patch("/:routineId", async (req, res, next) => {
  try {
    const { isPublic, name, goal } = req.body;
    const routine = await updateRoutine({
      id: req.params.routineId,
      isPublic,
      name,
      goal,
    });
    res.send(routine);
  } catch (err) {
    next(err);
  }
});

/* passing this off to the group not enough time i finsh need to add in
 delete posts, fix issues with activites in order to be able to delete. 
 god spped guys*/

//routinesRouter.delete("/:routineId", authorizeUser, async (req, res, next) => {
//try {

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  try {
    const { activityId, count, duration } = req.body;
    const activity = await addActivityToRoutine({
      routineId: req.params.routineId,
      activityId,
      count,
      duration,
    });
    res.send(activity);
  } catch (err) {
    next(err);
  }
});
