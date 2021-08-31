import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

// app config
const app =express();
const port = process.env.PORT || 8080 ;

// const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1257678",
  key: "698967bd920b9aac8e51",
  secret: "a5e37420a564535602ef",
  cluster: "ap2",
  useTLS: true
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });
// middleware
app.use(express.json());
app.use(cors());

// db config 
const connection_url='mongodb+srv://Nishant:nishu@cluster0.i2t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.connection.once("open",()=>{
    console.log("DB Connected")

    const changeStream= mongoose.connection.collection('post').watch()

    changeStream.on('change',(change)=>{
        console.log('change Triggered on pusher .....')
        console.log('change Triggered on pusher .....')
        console.log('change Triggered on pusher .....')
        if(change.operationType==='insert'){
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails=change.fullDocument;
            pusher.trigger('posts','inserted',{
                user:postDetails.user,
                caption:postDetails.caption,
                image:postDetails.image,
            })
        }else{
            console.log('Unknown trigger from Pusher')
        }
    })
})

app.get('/',(res,req)=>req.status(200).send("hey,Let's goo")
)

app.post('/upload',(req,res)=>{
const body=req.body;

dbModel.create(body,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(201).send(data);
    }
});
});

app.get('/sync',(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

// listen
app.listen(port ,()=>console.log(`App is running in port ${port}`))