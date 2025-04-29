package com.shubham.chat_server.services;

import com.shubham.chat_server.model.ChatRoom;
import com.shubham.chat_server.model.Message;
import com.shubham.chat_server.model.User;
import com.shubham.chat_server.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;

@Service
public class ChatRoomServices {

@Autowired
    ChatRoomRepository chatRoomRepository;

public List<User> getChatRoomParticipants( String id){
    ChatRoom chatRoom= chatRoomRepository.findById(id).get();
    if(chatRoom!=null){
        return chatRoom.getParticipants();
    }
    return null;
}
public List<Message> getAllChatRoomMessages( String id){
    ChatRoom chatRoom= chatRoomRepository.findById(id).get();
    if(chatRoom!=null){
        return chatRoom.getMessages();
    }
    return null;
}
public Date getChatRoomCreationDate(String id){
    ChatRoom chatRoom= chatRoomRepository.findById(id).get();
    if(chatRoom!=null){
        return chatRoom.getCreatedAt();
    }
    return null;
}
public boolean isGroupChat( String id){
    ChatRoom chatRoom= chatRoomRepository.findById(id).get();
    if(chatRoom!=null){
        return chatRoom.getIsGroupChat();
    }
    return false;
}
public List<ChatRoom> getUserChatRooms(String userId) {
    // get the chatroom which contain this userId in it
    List<ChatRoom> usersChatroom=chatRoomRepository.findByParticipants_Id(userId);
    return usersChatroom;
}

public ChatRoom getChatroom(String id){
    return chatRoomRepository.findById(id).get();
}


public ChatRoom createChatRoom(ChatRoom chatRoom){
    try{
        ChatRoom savedChatroom= chatRoomRepository.save(chatRoom);
        if(savedChatroom!=null){
            return savedChatroom;
        }
        return null;
    }
    catch(Exception ex ){
        System.out.println(ex.getMessage());
        return null;
    }
}
}