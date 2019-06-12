const express = require("express");
const app = express();
const amqp = require("amqplib/callback_api");

const port = 3001;

amqp.connect("amqp://localhost",(err,conn)=>{
    conn.createChannel((err,ch)=>{
        const queue = "FirstQueue";//name of the queue in rabbit 
        const message = {type:"2",content:"Hello RabbitMQ"};
        ch.assertQueue(queue,{durable:false});
        ch.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
        console.log("Message was sent!!!!");
    });
    setTimeout(()=>{
        conn.close();
        process.emit(0);
    },500);
    app.listen(port,()=>console.log(`app listen on port ${port}`));
});