const express = require("express");

const app = express();

app.use("/hello", (req,res) => {
    res.send("Hello hello");
});

app.use("/test", (req,res) => {
    res.send("test test");
});

app.use("/", (req,res) => {
    res.send("Hello world from dashboard");
});

app.listen(777, () =>{
    console.log("Server succesfully listening to port 777");
});