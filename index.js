const express = require("express");
const connectToDatabase = require("./src/config/db.config")

const port = process.env.PORT||3000

const todoListRouter = require("./src/routes/todolist.router")
const RegisterRouter =  require("./src/routes/register.router")


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use(RegisterRouter)
app.use(`/todolist-tasks`,todoListRouter)


connectToDatabase()

console.log(port,"port")

app.listen(port, () => {
  console.log(`server Listening on port ${port}`);
});
