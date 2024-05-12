import { errorHandler } from "@/middlewares/error";
import connectToMongodb, { checkAuth } from "@/utils/feature";

const mytask = async (req, res) => {
  try {
    if (req.method !== "GET")
      return errorHandler(res, 400, "Only GET request is allowed");

    connectToMongodb(process.env.MONGO_DB_URI);

    const user = await checkAuth(req);

    if(!user) return errorHandler(res,401,"Login first!!"); 


    return res.status(201).send({
      success: true,
      user, 
    });
  } catch (err) {
    errorHandler(res, 500, err);
  }
};

export default mytask;
