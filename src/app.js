const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send("This is from user GET route");
});

app.post("/user", (req, res) => {
    res.send("This is from user POST route");
});

app.delete("/user", (req, res) => {
    res.send("This is from user DELETE route");
});

app.use("/hello", (req,res) => {
    res.send("Hello hello");
});

app.use("/test", (req,res) => {
    res.send("test test");
});

// app.use("/test/xyz", (req,res) => {
//     res.send("xyz is here");
// });

app.use("/", (req,res) => {                 //order matters its written at last as it check only after all other routes
    res.send("Hello world from dashboard");
});

app.listen(777, () =>{
    console.log("Server succesfully listening to port 777");
});