import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import connectToMongodb, { checkAuth } from "@/utils/feature";

const newtask = async (req, res) => {
  try {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST request is allowed");

    connectToMongodb(process.env.MONGO_DB_URI);
    const { title, description } = req.body;

    if (!title || !description)
      return errorHandler(res, 400, "please all the fields");

    const user = await checkAuth(req);
    if (!user) return errorHandler(res, 401, "Login first!!");

    await Task.create({
      title,
      description,
      user: user._id,
    });
    return res.status(201).send({ success: true, message: "task created!" });
  } catch (err) {
    errorHandler(res, 500, err);
  }
};

export default newtask;
