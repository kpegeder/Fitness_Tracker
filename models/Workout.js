const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now(),
    },
    exercises: [
      {
        type: {
          type: String,
          required: [true, "Exercise type required"],
        },
        name: {
          type: String,
          required: [true, "Exercise name required"],
        },
        duration: {
          type: Number,
          min: [0, "Duration time can't be zero"],
          required: [true, "Exercise duration required"],
        },
        weight: {
          type: Number,
          min: [0, "Can't Enter Zero"],
        },
        reps: {
          type: Number,
          min: [0, "Can't Enter Zero"],
        },
        sets: {
          type: Number,
          min: [0, "Can't Enter Zero"],
        },
        distance: {
          type: Number,
          min: [0, "Can't Enter Zero"],
        },
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercises) => {
    return total + exercises.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
