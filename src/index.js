const express = require("express");
const cors = require("cors");
const EmployeerRoute = require("./emp");
const WorkerRoute = require("./worker");
const AdminRoute = require("./admin");
const app = express();

app.use(cors());
app.use(express.json())

app.use('/emp', EmployeerRoute);
app.use('/worker', WorkerRoute);
app.use('/admin', AdminRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});