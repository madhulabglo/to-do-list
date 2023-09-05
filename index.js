const express = require("express");
const mongoose = require("mongoose");

const toDolistDatas = require("./models/todolistModel");

const app = express();
app.use(express.json());

const DB =
  "mongodb+srv://madhumathilabglo:pjAHbnBx68cByJ9s@cluster0.bpgupso.mongodb.net/toDolist?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connected Sucessfully");
  })
  .catch(() => {
    console.log("DB connection is failed");
  });

app.get("/", (req, res) => {
  res.send("Server is Running");
});

// post task in to-do list

app.post("/create", async (req, res) => {
  const { title, description, status } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ title: "Title is required" });
    } else if (title === "") {
      return res.status(400).json({ title: "Title is required" });
    }

    const data = await toDolistDatas.create({
      title,
      description,
      status,
    });

    if (data) {
      res.status(200).json({ list: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all task 

app.get("/alllist", async (req, res) => {
  try {
    const allList = await toDolistDatas.find();
    if (allList) {
      res.status(200).json({ list: allList });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get specific task in to-do list

app.get("/alllist/:id/", async (req, res) => {
  try {
    const taskId = req.params.id;

    const allTasks = await toDolistDatas.find({}, "_id");
    const allIds = allTasks.map((task) => task._id.toString());

    if (!allIds.includes(taskId)) {
      return res.status(404).json({ error: "Data not found" });
    }

    const specfic_Task = await toDolistDatas.findById(taskId);
    if (specfic_Task) {
      res.status(200).json(specfic_Task);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update specific task in todo list

app.put("/alllist/update/:id/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    const allTasks = await toDolistDatas.find({}, "_id");
    const allIds = allTasks.map((task) => task._id.toString());

    if (!allIds.includes(taskId)) {
      return res.status(404).json({ error: "Data not found" });
    }
    const update_Task = await toDolistDatas.findByIdAndUpdate(
      taskId,
      {
        title: title,
        description: description,
        status: status,
      },
      { new: true } // response updated immediately
    );
    if (update_Task) {
      res
        .status(200)
        .json({ list: update_Task, message: "Task Updated Successfully" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//   Delete specific task in todo list

app.delete("/alllist/delete/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const allTasks = await toDolistDatas.find({}, "_id");
    const allIds = allTasks.map((task) => task._id.toString());
    console.log(allIds, "all");

    if (!allIds.includes(taskId)) {
      return res.status(404).json({ error: "Data not found" });
    }

    const delete_Task = await toDolistDatas.findByIdAndDelete(taskId);

    if (delete_Task) {
      res.status(200).json({ message: "Task Deleted Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

PORT = 3000;
app.listen(PORT, () => {
  console.log(`server Listening on port ${PORT}`);
});
