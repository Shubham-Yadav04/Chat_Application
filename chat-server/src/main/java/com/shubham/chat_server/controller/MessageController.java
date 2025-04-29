package com.shubham.chat_server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
//     i have to create a controller which will get the sender and receiver name and based on that it will find the messages related

    @MessageMapping("/sendmessage")
    public void sendMessage(){

    }

}
