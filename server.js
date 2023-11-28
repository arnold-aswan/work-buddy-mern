// dotenv configuration
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const workoutRoutes = require("./routes/workouts");

// express application
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () =>
      console.log(`connected to db & listening on port: ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
