const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors())
app.use(express.json())
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

mongoose.connect('mongodb+srv://stevecarter1123:d29Zrrqap6pWwPq8@cluster0.f6gpx.mongodb.net/sample_mflix')
app.get("/", (req, res) => res.send("Server Running..."));
app.get("/getUsers", (request, res) => {
    UserModel.find()
        .then(result => { res.json(result) })
        .catch(err => {res.json(err)})
})
app.post("/addUser", async (request, result) => {
    const user = request.body;
    const newUser = new UserModel(user)
    if(await UserModel.exists({email: user.email})) {
        result.json({...user, status: "User already exist"})
    } else {
        await newUser.save()
        result.json(user)
    }
    
    // console.log(request.body)
    
})

app.listen(3001, () => {
    console.log("Server running!")
})