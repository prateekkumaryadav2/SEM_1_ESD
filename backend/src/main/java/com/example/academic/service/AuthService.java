package com.example.academic.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academic.config.AuthFilter;
import com.example.academic.dto.AuthResponseDTO;
import com.example.academic.dto.GoogleLoginRequestDTO;
import com.example.academic.dto.LoginRequestDTO;
import com.example.academic.mapper.AuthMapper;
import com.example.academic.model.User;
import com.example.academic.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final GoogleIdTokenVerifier googleVerifier;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.googleVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        ).build();
    }

    /**
     * Authenticate user with username and password
     * @param loginRequest Login credentials
     * @return AuthResponseDTO if successful, empty otherwise
     */
    public Optional<AuthResponseDTO> login(LoginRequestDTO loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword() != null && user.getPassword().equals(password)) {
                String token = generateToken();
                AuthFilter.TOKENS.put(token, username);
                AuthResponseDTO response = AuthMapper.toAuthResponse(user, token);
                return Optional.of(response);
            }
        }
        return Optional.empty();
    }

    /**
     * Authenticate user with Google OAuth
     * @param googleRequest Google credential
     * @return AuthResponseDTO if successful
     * @throws GeneralSecurityException if token verification fails
     * @throws IOException if token parsing fails
     */
    public AuthResponseDTO googleLogin(GoogleLoginRequestDTO googleRequest) 
            throws GeneralSecurityException, IOException {
        String credential = googleRequest.getCredential();

        GoogleIdToken idToken = GoogleIdToken.parse(googleVerifier.getJsonFactory(), credential);
        GoogleIdToken.Payload payload = idToken.getPayload();

        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        // Check if user exists
        Optional<User> existingUser = userRepository.findByUsername(email);
        User user;

        if (existingUser.isEmpty()) {
            // Create new user using mapper
            user = AuthMapper.createGoogleUser(email, googleId);
            user = userRepository.save(user);
        } else {
            user = existingUser.get();
        }

        String token = generateToken();
        AuthFilter.TOKENS.put(token, email);

        return AuthMapper.toAuthResponse(user, token, name);
    }

    /**
     * Logout user by removing token
     * @param token Authentication token
     * @return true if token was removed, false otherwise
     */
    public boolean logout(String token) {
        if (token != null && AuthFilter.TOKENS.containsKey(token)) {
            AuthFilter.TOKENS.remove(token);
            return true;
        }
        return false;
    }

    /**
     * Validate if a token is valid
     * @param token Authentication token
     * @return true if valid, false otherwise
     */
    public boolean isTokenValid(String token) {
        return token != null && AuthFilter.TOKENS.containsKey(token);
    }

    /**
     * Get username associated with a token
     * @param token Authentication token
     * @return Optional username
     */
    public Optional<String> getUsernameFromToken(String token) {
        if (token != null && AuthFilter.TOKENS.containsKey(token)) {
            return Optional.of(AuthFilter.TOKENS.get(token));
        }
        return Optional.empty();
    }

    /**
     * Generate a new authentication token
     * @return Generated token
     */
    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    /**
     * Find user by username
     * @param username Username
     * @return Optional User
     */
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
