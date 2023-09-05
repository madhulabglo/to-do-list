const mongoose = require('mongoose')
const {Schema,model}= mongoose

const toDolistSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:false},
    status:{type:String,required:false}
})

const toDolistModel = model("tasks",toDolistSchema)

module.exports = toDolistModel