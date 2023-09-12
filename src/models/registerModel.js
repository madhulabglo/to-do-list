const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RegistrationSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  registered_date:{type:Date,default:Date.now},
  image:{type:String,required:false}
});
const RegistrationModel = model("register datas", RegistrationSchema);

module.exports = RegistrationModel;
