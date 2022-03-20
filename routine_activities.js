const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  updateRoutineActivity,
  getRoutineActivityById,
  getRoutineById,
  destroyRoutineActivity,
} = require("../db");
const authorizeUser = require("./auth");
module.exports = routineActivitiesRouter;

async function checkUserOwnsRoutine(req, res, next) {
  try {
    const { routineId } = await getRoutineActivityById(
      req.params.routineActivityId
    );
    const routine = await getRoutineById(routineId);

    if (+routine.creatorId !== +req.user.id) {
      throw new Error("users can only modify routines that they have created");
    }
    next();
  } catch (err) {
    next(err);
  }
}

routineActivitiesRouter.patch(
  "/:routineActivityId",
  [authorizeUser, checkUserOwnsRoutine],
  async (req, res, next) => {
    try {
      const { count, duration } = req.body;
      const routineActivity = await updateRoutineActivity({
        id: req.params.routineActivityId,
        count,
        duration,
      });
      res.send(routineActivity);
    } catch (err) {
      next(err);
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  [authorizeUser, checkUserOwnsRoutine],
  async (req, res, next) => {
    try {
      const destroyRA = await destroyRoutineActivity(
        req.params.routineActivityId
      );
      res.send(destroyRA);
    } catch (err) {
      next(err);
    }
  }
);
