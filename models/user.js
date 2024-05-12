import mongoose from "mongoose";

const userSchema =mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:false,// iske madad se jisko v data bhejenge use ye password nhi diye jab tak hum tak hum manually password select karne ke liye force nhi karte hai
    minLenght: [6, "Password must be at least 6 characters"],
  },
}, { timestamps: true });

mongoose.models = {}; // for rendering in  the browser

export const User = mongoose.model("User", userSchema);
