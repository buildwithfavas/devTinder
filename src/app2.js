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

app.get("/dummyError1", (req, res) => {
    try{
        throw new Error("This is a dummy error");
    } catch (error) {
        res.status(500).send("Something broke! Contact support team");
    }
});

app.get("/dummyError2", (req, res) => {
    throw new Error("This is a dummy error");
});

app.use((err, req, res, next) => {
    console.error(err.stack);  //This is a dummy error and stack information
    res.status(500).send("Something broke!");
});

app.listen(777, () => {
    console.log("Server succesfully listening to port 777");
});