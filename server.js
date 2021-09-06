import express from "express";
import mongoose from "mongoose";

import Data from "./data.js";
import Videos from './dbModel.js';

// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json());



// DB config
const connection_url = 'mongodb+srv://<ID>@cluster0.qma34.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
useNewUrlParser: true,
//useCreateIndex: true,
useUnifiedTopology: true,

});


app.get("/", (req, res)=> res.status(200).send("Hello Asif"));

app.get("/v1/posts", (req, res)=> res.status(200).send(Data));

app.get("/v2/posts", (req, res)=>
{
Videos.find((err, data)=>{
    if (err) {
        res.status(500).send(err);
    } else {
        res.status(200).send(data);
    }
});
});

app.get("/v2/posts", (req, res)=> {
    const dbVideos = req.body;
    Videos.create(dbVideos, (err, data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});


app.listen(port, ( )=> console.log(`listening on localhost: ${port}`));