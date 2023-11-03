const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const userController = {
  generateAcessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  registerUser: async (req, res) => {
    try {
      const { name, email, password: reqPassword, pic } = req.body;
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(404).json("User already exist");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(reqPassword, salt);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashed,
        pic: pic,
      });
      const accessToken = userController.generateAcessToken(newUser);
      const refreshToken = userController.generateRefreshToken(newUser);
      refreshTokens.push(refreshToken);
      //store REFRESH TOKEN in cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = newUser._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
      return res.status(500).json("Cannot register user");
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json("Incorrect email");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }

      if (user && validPassword) {
        const accessToken = userController.generateAcessToken(user);
        const refreshToken = userController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        //store REFRESH TOKEN in cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  requestRefreshToken: async (req, res) => {
    //take refresh token from user
    const refreshToken = req.cookies?.refreshToken;
    //send error if token is not valid
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens.filter((token) => token != refreshToken);
      //create new refresh token, access token, and send to user
      const newAccessToken = userController.generateAcessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },
  logout: async (req, res) => {
    refreshTokens.filter((token) => token != req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
  editUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);
      console.log(req.user.id);
      if (!user) {
        return res.status(404).json("User not found");
      }

      user.name = name || user.name;
      user.email = email || user.email;
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(404).json("User already exist");
      }
      user.pic = req.body.pic || user.pic;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        password = hashed;
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
