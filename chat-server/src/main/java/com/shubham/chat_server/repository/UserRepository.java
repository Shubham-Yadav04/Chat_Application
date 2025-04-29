package com.shubham.chat_server.repository;

import com.shubham.chat_server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User getUserByUsername(@Param("username") String username);
//    User getUserByUsername(String username);
    User getUserByEmail(String email);
    @Query(value = "SELECT * FROM user WHERE username != :username ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<User> findRandomUsersExcludingUsername(@Param("username") String username, @Param("limit") int limit);

}
