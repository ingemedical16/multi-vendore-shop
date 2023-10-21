import jwt from "jsonwebtoken";
const dayInmillsecond = 24 * 60 * 60 * 1000;
const exp = process.env.JWT_EXPIRES?.split("d")[0] || 30;
export const createActivationToken = (user) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "30d",
  });
};
const generateToken = async (res, user, statusCode) => {
  console.log(user);
  const token = await createActivationToken(user);

  res
    .status(statusCode)
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: parseInt(exp) * dayInmillsecond, // 30 days
    })
    .json({
      success: true,
      user,
      token,
    });
};

export default generateToken;
