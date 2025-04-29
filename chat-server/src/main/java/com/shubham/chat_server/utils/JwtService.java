package com.shubham.chat_server.utils;

import com.shubham.chat_server.model.User;
import com.shubham.chat_server.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Autowired
    UserService userService;
    private static final String SECRET = "shubhamYadavbillionairetill2030s";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());


    public String generateToken(String username,int time) {
        String jwtToken = Jwts.builder()
                .setSubject(username)

                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .signWith(SECRET_KEY,SignatureAlgorithm.HS256)
                .compact();
return jwtToken;
    }

    public Claims extractToken(String token){

        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean isTokenExpired(String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration().before(new Date());
    }
}
