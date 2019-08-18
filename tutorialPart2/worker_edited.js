const express = require("express");
const app = express();
const amqp = require("amqplib/callback_api");

const port = 3008;
let ack = false;

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            console.log(`this is our msg :${msg}`);
            channel.nack(msg, );

            // do {
            //     setTimeout(function () {
            //         // if (Math.round(Math.random()) < 0.5) {
            //         //     console.log(" [x] Done");
            //         //     // channel.ack(msg);
            //         //     ack = false;

            //         // }else{
            //         //     channel.reject(msg,true);
            //         // }

            //     }, secs * 1000);
            // } while (ack)
        }, {
                // manual acknowledgment mode,
                // see https://www.rabbitmq.com/confirms.html for details
                noAck: false

            });
    });
});