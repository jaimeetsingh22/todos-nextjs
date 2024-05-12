import { errorHandler } from "@/middlewares/error";
import { User } from "@/models/user";
import connectToMongodb, { cookieSetter } from "@/utils/feature";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST request is allowed");

    if (!email || !password)
      return errorHandler(res, 400, "please fill all the fields");

    connectToMongodb(process.env.MONGO_DB_URI);

    const user = await User.findOne({ email }).select("+password"); // humne model me select false kiya hai to password include karne ke liye ise lagaya hai

    if (!user) return errorHandler(res, 400, "wrong email or password");

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return errorHandler(res, 400, "wrong email or password");

    const token = jwt.sign({ _id: user._id }, process.env.SECRETE_KEY);

    cookieSetter(res, token, true);

    return res.status(200).json({
      success: true,
      message: `Welcome Back!  ${user.name}`,
      user,
    });
  } catch (err) {
    errorHandler(res, 400, err);
    console.log(err);
  }
};

export default loginHandler;
