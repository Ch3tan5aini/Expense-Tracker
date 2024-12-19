import express from "express";
import User from "../Modals/usersModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// For Signing In Users
router.post("/sign-in", async (req, res) => {
  try {
    // Validating User Entries
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(401)
        .send({ success: false, message: "Please Enter All Details" });
    }

    const matched = await User.findOne({
      username: req.body.username,
    });

    if (matched) {
      return res
        .status(409)
        .send({ success: false, message: "Username Exists" });
    }

    //Saving New User to DB
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const protectedUser = { username, email, hashPassword };
    const newUser = new User(protectedUser);
    await newUser.save();

    //Jwt Token Generator
    const token = jwt.sign(
      { username: newUser.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    //response to client
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60000,
    });
    res.status(200).send({ success: true, cookie: true, newUser });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Error Occured!" });
  }
});

// For Logging in user
router.post("/login", async (req, res) => {
  try {
    //Validating User Entries

    if (!req.body.username || !req.body.password) {
      return res
        .status(401)
        .send({ success: false, message: "Please Enter All Details" });
    }

    const matched = await User.findOne({ username: req.body.username });

    if (!matched) {
      return res
        .status(409)
        .send({ success: false, message: "Invalid Username" });
    }

    bcrypt.compare(req.body.password, matched.hashPassword, (error, result) => {
      if (error) {
        console.error("Error comparing passwords:", error);
        return res
          .status(500)
          .send({ success: false, message: "Try Again Later" });
        return;
      }
      console.log(result);
      if (result) {
        //Jwt Cookie
        const token = jwt.sign(
          { username: req.body.username },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        //response to client
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 30 * 24 * 60 * 60000,
        });
        res.status(200).send({
          success: true,
          cookie: true,
          message: "Authentication Successfull",
        });
      } else {
        res.status(409).send({ success: false, message: "Invalid Password" });
      }
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

//for Getting all Users
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

//for logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'none', 
});
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
