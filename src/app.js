const express = require("express");

const app = express();

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