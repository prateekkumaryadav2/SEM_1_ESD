package com.example.academic.controller;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academic.config.AuthFilter;
import com.example.academic.model.User;
import com.example.academic.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isPresent() && userOpt.get().getPassword() != null && userOpt.get().getPassword().equals(password)) {
            String token = UUID.randomUUID().toString();
            AuthFilter.TOKENS.put(token, username);
            return ResponseEntity.ok(Map.of("token", token, "username", username));
        }
        return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String,String> body) {
        String credential = body.get("credential");
        
        try {
            // Verify Google token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), 
                GsonFactory.getDefaultInstance()
            ).build();

            GoogleIdToken idToken = GoogleIdToken.parse(verifier.getJsonFactory(), credential);
            GoogleIdToken.Payload payload = idToken.getPayload();

            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // Check if user exists
            Optional<User> existingUser = userRepository.findByUsername(email);
            User user;

            if (existingUser.isEmpty()) {
                // Create new user
                user = new User();
                user.setUsername(email);
                user.setEmail(email);
                user.setGoogleId(googleId);
                user.setAuthProvider("google");
                userRepository.save(user);
            } else {
                user = existingUser.get();
            }

            String token = UUID.randomUUID().toString();
            AuthFilter.TOKENS.put(token, email);
            
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", email,
                "name", name != null ? name : email
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid Google token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value="X-Auth-Token", required=false) String token) {
        if (token != null) AuthFilter.TOKENS.remove(token);
        return ResponseEntity.ok(Map.of("msg","Logged out"));
    }
}
