const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      type: {
        type: String,
        required: "The type of exercise is required",
      },

      name: {
        type: String,
        required: "The name of the exercise is required",
      },

      weight: {
        type: Number,
      },

      sets: {
        type: Number,
      },

      reps: {
        type: Number,
      },

      duration: {
        type: Number,
      },

      distanceTraveled: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
