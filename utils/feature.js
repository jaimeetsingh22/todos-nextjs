import { User } from "@/models/user";
import { serialize } from "cookie";
import jwt, { decode } from "jsonwebtoken";
import mongoose from "mongoose";

const connectToMongodb = (link) => {
  mongoose
    .connect(link)
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log(err));
};

export default connectToMongodb;

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      maxAge: set ? 60 * 60 * 24 * 7 : 0, //1 week
      httpOnly: true, // cant be accessible by clients
      path: "/",
    })
  );
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie; // cookie will be token=askdciuewhfaskjiuhwehnajnKJNIUHUajsdniu
  // console.log(cookie)
  if (!cookie) return null;

  const token = cookie.split("=")[1]; // this split() will split it and put in an array i.e [ 'token', 'jsdofjoaisdjsdijOIJOIHJ']

  const decoded = jwt.verify(token, process.env.SECRETE_KEY);

  return await User.findById(decoded._id);
};
