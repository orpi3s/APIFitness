// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");
const activitiesRouter = require("./activities");
const routinesRouter = require("./routines");
const routineActivitiesRouter = require("./routine_activities");

module.exports = apiRouter;

apiRouter.use("/users", usersRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/routine_activities", routineActivitiesRouter);

apiRouter.get("/health", async (req, res, next) => {
  try {
    res.send({ message: "healthy" });
  } catch (err) {
    next(err);
  }
});
