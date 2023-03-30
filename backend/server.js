require("dotenv").config();
const express = require("express");
const appRoutes = require("./routes/leaveApp");
const studentUserRoutes = require("./routes/studentUser");
const app = express();

// middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/apiv1/leaveapp/", appRoutes);
app.use("/apiv1/student/", studentUserRoutes);

// listen for request
app.listen(process.env.PORT, () => {
  console.log("connected to db and server is started on " + process.env.PORT);
});

module.exports = app;
