package com.shubham.chat_server.controller;

import com.shubham.chat_server.model.ChatRoom;
import com.shubham.chat_server.model.Message;
import com.shubham.chat_server.model.MessageStatus;
import com.shubham.chat_server.model.ReceivedMessage;
import com.shubham.chat_server.services.ChatRoomServices;
import com.shubham.chat_server.services.MessageServices;
import com.shubham.chat_server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SocketController {

    @Autowired
    UserService userService;
    @Autowired
    SimpMessagingTemplate simpleMessagingTemplate;
    @Autowired
    ChatRoomServices chatRoomServices;
    @Autowired
    MessageServices messageServices;

    @MessageMapping("/topic/chatroom")

    public void sendMessage(@Payload ReceivedMessage receivedMessage){

        Message message = new Message();
        String roomId= receivedMessage.getRoomId();
        System.out.println(receivedMessage + "    " + roomId);
        message.setMessage(receivedMessage.getContent());
        message.setReceiver(userService.getUserByUsername(receivedMessage.getReceiverName()));
        message.setSender(userService.getUserByUsername(receivedMessage.getSenderName()));
        message.setChatroom(chatRoomServices.getChatroom(roomId));
        message.setStatus(MessageStatus.Delivered);
       Message result= messageServices.saveMessage(message);
       if(result!=null){
           System.out.println("message generated ");
           simpleMessagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message);
       }

    }
    @MessageMapping("/private-message/{receiverId}")
    public void sendPrivateMessage(@Payload Message message, Principal sender){
        simpleMessagingTemplate.convertAndSendToUser(message.getReceiver().getUsername(),"/queue/message", message);
    }
}
