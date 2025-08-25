const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req,res) => {
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

      res.send("Login Successfull!!!");
    }else{
      throw new Error("Invalid credentials");
    }
  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error fetching profile: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
  const user = req.user;
  res.send(user.firstName   + " sent the connection request");
});

// //Get user by email
// app.get("/user", async (req, res) => {
//   // call from postman by get method pass a json object emailId it will list all docs with that emailId
//   //     {
//   //     "emailId":"mohammed.favas@example.com"
//   // }
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       return res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("Error fetching user: " + error.message);
//   }
// });

// //Get one user by email
// app.get("/userOne", async (req, res) => {
//   // call from postman by get method pass a json object emailId it will list only one doc with that emailId
//   //     {
//   //     "emailId":"mohammed.favas@example.com"
//   // }
//   const userEmail = req.body.emailId;
//   const user = await User.findOne({ emailId: userEmail });
//   if (!user) {
//     return res.status(404).send("User not found");
//   } else {
//     res.send(user);
//   }
// });

// //Feed API - GET - get all the users from the databse
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("Error fetching users: " + error.message);
//   }
// });

// //Get one user by email
// app.delete("/user", async (req, res) => {
//   // call from postman by delete method pass a json object, it will delete one doc with that objectId (NB: we passed it has an userId key)
//   //     {
//   //     "userId":"objectId here"
//   // }
//   const userId = req.body.userId;
//   try {
//     //const user = await User.findByIdAndDelete({_id: userId}); //or use short hand
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (error) {
//     res.status(400).send("Error fetching users: " + error.message);
//   }
// });

// Update data of the user
//send this json data to update from postman by patch method
// {
//     "userId":"68a8dad63c28555cab3276e1",
//     "firstName":"changed to something",
//     "lastName":"lastName changed"
// }

// app.patch("/user/:userId", async (req, res) => {
//   //const userId = req.body.userId;
//   const userId = req.params?.userId;
//   const updateData = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((key) =>
//       ALLOWED_UPDATES.includes(key)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Cannot add more than 10 skills");
//     }

//     const user = await User.findByIdAndUpdate(userId, updateData, {
//       returnDocument: "after",
//       runValidators: true,
//     }); //options also available learn from documentation
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send("Error updating user: " + error.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(process.env.PORT || 777, () => {
      console.log(
        "Server successfully listening to port " + (process.env.PORT || 777)
      );
    });
  })
  .catch((error) => {
    console.error("Database connection failed: " + error.message);
  });