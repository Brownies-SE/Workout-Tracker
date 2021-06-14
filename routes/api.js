const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )

    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .limit(7)
    .sort({ _id: 1 })
    .then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
