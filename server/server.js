const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

const teacherSchema = new mongoose.Schema({
  tecaherName: { type: String, required: true },
  teacherEmail: { type: String, required: true },
  teacherPassword: { type: String, required: true },
});

const Teachers = mongoose.model("Teachers", teacherSchema);

app.get("/teachers", async (req, res) => {
  const data = await Teachers.find();
  return res.json(data);
});
// Post request
app.post("/teachers/", async (req, res) => {
  const newTeacher = new Teachers(req.body);
  newTeacher.save();
  res.status(201).send(newTeacher);
  res.status(400).send("Error");
  res.status(200).send("Success");
});
// find by ID
app.get("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Teachers.findById(id);
  return res.send(data);
});
// delete by ID
app.delete("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Teachers.findByIdAndDelete(id);
  return res.send(data);
});

mongoose.connect(
  "mongodb+srv://aladdinlizada:aladdinalizada@cluster0.htufrr8.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  }
);
