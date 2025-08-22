const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth.js");

app.use("/admin", adminAuth);     

app.post("/user/login", (req, res) => {                  //Call by using postman post method
    res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {          //Call by using postman get method
    res.send("User Data sent successfully");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {  //Call by using postman get method
    res.send("All data sent");
});

app.get("/admin/deleteUser", adminAuth, (req, res) => {  //Call by using postman get method
    res.send("User deleted successfully");
});

app.listen(777, () => {
    console.log("Server succesfully listening to port 777");
});