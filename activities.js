const express = require("express");
const activitiesRouter = express.Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (err) {
    next(err);
  }
});

activitiesRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const activity = await createActivity({ name, description });
    res.send(activity);
  } catch (err) {
    next(err);
  }
});

activitiesRouter.patch("/:activityId", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const activity = await updateActivity({
      id: req.params.activityId,
      name,
      description,
    });
    res.send(activity);
  } catch (err) {
    next(err);
  }
});

activitiesRouter.get("/:activityid/routines", async (req, res, next) => {
  try {
    const routines = await getPublicRoutinesByActivity({
      id: req.params.activityid,
    });
    res.send(routines);
  } catch (err) {
    next(err);
  }
});

module.exports = activitiesRouter;
