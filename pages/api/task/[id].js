import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import connectToMongodb, { checkAuth } from "@/utils/feature";
import React from "react";

const id = async (req, res) => {
  try {
    connectToMongodb(process.env.MONGO_DB_URI);
    const user = await checkAuth(req);
    if (!user) return errorHandler(res, 401, "Login first!!");

    const Taskid = req.query.id;
    // console.log(Taskid)

    const task = await Task.findById(Taskid);
    // console.log(task)

    if (!task) return errorHandler(res, 404, "task not found");

    if (req.method === "PUT") {
      task.isCompleted = !task.isCompleted;
      await task.save();
      res.status(201).json({
        success: true,
        message: "Updated successfully",
      });
    } else if (req.method === "DELETE") {
      await task.deleteOne();
      res.status(200).json({
        success: true,
        message: "deleted successfully",
      });
    } else {
      errorHandler(res, 404, "this method is not allowed");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500);
  }
};

export default id;
