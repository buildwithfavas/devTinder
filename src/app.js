const express = require("express");

const app = express();

// app.get("/.*fly$/",(req,res) =>{  //regex      only work on that route ends with fly.
//     res.send("end with fly");
// });

app.get("/a/",(req,res) =>{  //regex      only work for exact a.
    res.send("its a regex contain exact a");
});

app.get("/a*bc",(req,res) =>{  //regex      here anything can be inserted at place of *.
    res.send("its a regex from /a*bc");
});

app.get("/a/",(req,res) =>{  //regex      only work for exact a.
    res.send("its a regex contain exact a");
});

// app.get("/ab+c",(req,res) =>{  //regex      works for /abbc and /abbbbbc   + means in route the character can be repeated.
//     res.send("+ means in route the character can be repeated");
// });

// app.get("/a(bc)?d",(req,res) =>{  //regex      works for /ad and /abcd    ? means optional character that written before it here in () that is optional.
//     res.send("? means optional in route the character before ?");
// });

// app.get("/ab?c",(req,res) =>{  //regex      works for /abc and /ac    ? means optional character that written before it.
//     res.send("? means optional in route the character before ?");
// });

app.get("/study",(req,res) =>{  //query params    call like this =>  http://localhost:777/study?name=favas&password=1234
    console.log(req.query)
    res.send("This is from study GET route");
});

app.get("/study/:userId/:name/:password",(req,res) =>{  //dynamic routing   call like this =>  http://localhost:777/study/1/favas/1234
    console.log(req.params)
    res.send("This is from study GET route");
});

app.get("/user", (req, res) => {      //GET method
    res.send("This is from user GET route");
});

app.post("/user", (req, res) => {     //POST method
    res.send("This is from user POST route");
});

app.delete("/user", (req, res) => {   //DELETE method
    res.send("This is from user DELETE route");
});

app.use("/hello", (req,res) => {     //app.use  handle all route starts with /hello (order matters line by line)
    res.send("Hello hello");
});

app.use("/test", (req,res) => {     //app.use  handle all route starts with /test  (order matters line by line)
    res.send("test test");
});

// app.use("/test/xyz", (req,res) => {
//     res.send("xyz is here");
// });

app.use("/", (req,res) => {                 //order matters its written at last as it check only after all other routes for all start with /
    res.send("Hello world from dashboard");
});

app.listen(777, () =>{
    console.log("Server succesfully listening to port 777");
});