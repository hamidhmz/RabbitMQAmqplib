const express = require("express");
const app = express();
const amqp = require("amqplib/callback_api");

const port = 3002;

amqp.connect("amqp://localhost",(err,conn)=>{
    conn.createChannel((err,ch)=>{
        const queue = "FirstQueue";//name of the queue in rabbit if queue doesn't exist then consumer(receiver) create this queue and waite for it till that queue will fill with a message 
        
        ch.assertQueue(queue,{durable:false});
        console.log(`waiting for message in ${queue}`)
        ch.consume(queue,(message)=>{
            console.log(`Received ${message.content}`);
        },{noAck:true});
        console.log("Message was sent!!!!");
    });
    setTimeout(()=>{
        conn.close();
        process.emit(0);
    },500);
    app.listen(port,()=>console.log(`app listen on port ${port}`));
});