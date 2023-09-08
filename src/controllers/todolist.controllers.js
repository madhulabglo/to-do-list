const toDolistDatas = require("../models/todolistModel");


// post task in to-do list

async function createTask (req, res) {
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
};

//get all task

 async function getAllTasks (req, res){
  try {
    const allList = await toDolistDatas.find();
    if (allList) {
      res.status(200).json({ list: allList });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get specific task in to-do list

async function getIntidualTask (req, res) {
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
};

// update specific task in todo list

async function updateTask (req, res) {
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
};

//   Delete specific task in todo list

 async function deleteTask(req, res) {
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
};

module.exports = {
  createTask,
  getAllTasks,
  getIntidualTask,
  updateTask,
  deleteTask

}
