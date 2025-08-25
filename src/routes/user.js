const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

//Get all the pending connection requests for the logged in user
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try{
        const loggedUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        //}).populate("fromUserId",["firstName","lastName"," "," "]); can be written like array also

        res.json({message:"Data fetched successfully", data: connectionRequests});

    }catch(err){
        return res.status(400).send("Error: " + err.message);  
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedUser._id, status: "accepted" },
                { toUserId: loggedUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", USER_SAFE_DATA )
        .populate("toUserId", USER_SAFE_DATA);

        const data = connections.map((row) => {
            if(row.fromUserId._id.toString() === loggedUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({message:"Data fetched successfully", data});

    }catch(err){
        return res.status(400).send("Error: " + err.message);
    }
});

module.exports = userRouter;