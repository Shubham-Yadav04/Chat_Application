package com.shubham.chat_server.controller;

import com.shubham.chat_server.model.ChatRoom;
import com.shubham.chat_server.model.Message;
import com.shubham.chat_server.model.ReceivedMessage;
import com.shubham.chat_server.model.User;
import com.shubham.chat_server.services.ChatRoomServices;
import com.shubham.chat_server.services.UserService;
import com.shubham.chat_server.utils.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChatroomController {
    @Autowired
    ChatRoomServices chatRoomServices;
    @Autowired
    UserService userService;
@Autowired
    JwtService jwtService;

    // used to get all the chatroom for the specific userId
    @GetMapping("/chatroom/user/{userId}")
    public ResponseEntity<List<ChatRoom>> getUserChatRooms(@PathVariable String userId){
        try{
            User user = userService.getUser(userId);
            if(user!=null){

            // get the chatroom if user exists
            List<ChatRoom> chatRooms= chatRoomServices.getUserChatRooms(userId);
            return new ResponseEntity<>(chatRooms,HttpStatus.OK);
            }
        }
        catch (Exception ex){
            System.out.println("Error occurred while getting the chatroom "+ ex.getMessage());
        }
        return  new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/chatroom/messages/{id}")
    public ResponseEntity<?> getChatroomMessages(@PathVariable String id){

        try{
          List<Message> messages= chatRoomServices.getAllChatRoomMessages(id);
            if(messages!=null){
                return new ResponseEntity<>(messages,HttpStatus.OK);
            }
        }
        catch (Exception ex){
            System.out.println("Error occurred while getting the chatroom "+ ex.getMessage());
        }
        return  new ResponseEntity<>("chatroom not found", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/chatroom/participants/{id}")
    public ResponseEntity<?> getChatroomParticipants(@PathVariable String roomId){
        try{
            List<User> participants= chatRoomServices.getChatRoomParticipants(roomId);
            if(participants!=null){
                return new ResponseEntity<>(participants,HttpStatus.OK);
            }
        }
        catch (Exception ex){
            System.out.println("error while fetching participants"+ex.getMessage());
        }
        return new ResponseEntity<>("Chat room not found",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/chatroom/{id}")
    public ResponseEntity<?> getChatroom (@PathVariable String roomId){
        try{
            ChatRoom chatRoom= chatRoomServices.getChatroom(roomId);
            if(chatRoom!=null){
                return new ResponseEntity<>(chatRoom,HttpStatus.OK);

            }
        }
        catch(Exception ex){
            System.out.println("error occured "+ex.getMessage());
        }
        return new ResponseEntity<>("No such Chatroom " , HttpStatus.NOT_FOUND);
    }
    @PostMapping("/create.room")
    public ResponseEntity<?> createChatroom(@RequestBody ReceivedMessage receivedMessage){
        String receiverName= receivedMessage.getReceiverName();
        String senderName = receivedMessage.getSenderName();
System.out.println(senderName + "  " + receiverName);
        // find the user with respective usernames
        ChatRoom chatRoom= new ChatRoom();
        chatRoom.setRoomId("20"+senderName+"30"+receiverName);
        List<User> participants= new ArrayList<User>();

        User sender=userService.getUserByUsername(senderName);
        User receiver=userService.getUserByUsername(receiverName);
        if(sender!=null && receiver!=null) {
            participants.add(sender);
            participants.add(receiver);

            chatRoom.setParticipants(participants);
            ChatRoom savedChatroom = chatRoomServices.createChatRoom(chatRoom);
            if (savedChatroom != null) {
                return new ResponseEntity<>(savedChatroom.getId(), HttpStatus.OK);
            }
            return new ResponseEntity<>("Error occurred while creating the chatroom", HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return new ResponseEntity<>("BAD_REQUEST",HttpStatus.BAD_REQUEST);
    }
}
