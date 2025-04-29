package com.shubham.chat_server.services;

import com.shubham.chat_server.model.Message;
import com.shubham.chat_server.model.User;
import com.shubham.chat_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User getUser( String userId){
        return userRepository.findById(userId).get();
    }
    public User getUserByUsername( String username){
        return userRepository.getUserByUsername(username);
    }


//    public List<Message> getSentMessages( String userId){
//        User user =userRepository.findById(userId).get();
//        return user.getMessagesSent();
//    }
//    public List<Message> getReceivedMessage( String userId){
//        User user = getUser(userId);
//        if(user!=null){
//            return user.getMessagesRecieved();
//        }
//        return null;
//    }
    public User createUser(User user){
        try {
            User isUsernameExists = userRepository.getUserByUsername(user.getUsername());
            User isEmailExists = userRepository.getUserByEmail(user.getEmail());
            if (isEmailExists == null || isEmailExists == null) {

               return userRepository.save(user);
            }

        }
            catch
            (Exception e){
                System.out.println("User already exists");
            }
        return null;
        }
        public String updateUser(User user){
         userRepository.save(user);
        return "updated";
        }

public List<User> getRandomUser(String username){
        try{
            return userRepository.findRandomUsersExcludingUsername(username,12);
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }
}

}
