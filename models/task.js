import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted:{
    type : Boolean ,
    default : false
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'user',
  }
}, { timestamps: true });

mongoose.models = {}; // for rendering in  the browser

export const Task = mongoose.model("task", taskSchema);
