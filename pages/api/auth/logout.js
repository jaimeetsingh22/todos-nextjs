import { errorHandler } from '@/middlewares/error';
import { cookieSetter } from '@/utils/feature';

const logout = (req,res) => {
  try {
    if (req.method !== "GET")
        return errorHandler(res, 400, "Only GET request is allowed");

    cookieSetter(res, null, false);

    return res.status(200).json({
      success: true,
      message: `Logged Out successfully!`,
    });
  } catch (error) {
    errorHandler(res, 400, "Only GET request is allowed");
   console.log(error);
  }
}

export default logout