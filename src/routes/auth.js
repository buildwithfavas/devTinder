const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    
    // call from postman by post method pass a json object like below
    //   {
    //   "firstName": "Mohammed",
    //   "lastName": "Favas",
    //   "emailId": "mohammed.favas@example.com",
    //   "password": "password123"
    //   }

    // or create a new instance of the User model
    // const user = new User({
    //     firstName: "Mohammed",
    //     lastName: "Favas",
    //     emailId: "mohammed.favas@example.com",
    //     password: "password123"
    // });

    //validation of data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //Create a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error registering user: " + error.message);
  }
});

authRouter.post("/login", async (req,res) => {
  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){

      //Create a JWT token
      const token = await user.getJWT();
      //console.log(token);
      //Add the token to cookie send response back to user
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) }); // 8 hours

      res.send(user);
    }else{
      throw new Error("Invalid credentials");
    }
  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", (req,res) => {
  res.cookie("token",null,{expires: new Date(Date.now())});
  res.send("Logout successful");
});

module.exports = authRouter;
