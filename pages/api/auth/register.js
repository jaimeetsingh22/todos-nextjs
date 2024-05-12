import { errorHandler } from "@/middlewares/error";
import { User } from "@/models/user";
import connectToMongodb, { cookieSetter } from "@/utils/feature";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST request is allowed");

    if (!email || !name || !password)
      return errorHandler(res, 400, "please fill the fields");

    connectToMongodb(process.env.MONGO_DB_URI);

    let user = await User.findOne({ email });

    if (user)
      return errorHandler(res, 400, "user already exists with this email");

    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({
      name,
      email,
      password:hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.SECRETE_KEY);

    cookieSetter(res, token, true);

    return res.status(201).json({
      success: true,
      message: "Registered succesfully",
      user,
    });
  } catch (err) {
    errorHandler(res, 400, err);
    console.log(err);
  }
};

export default registerHandler;
