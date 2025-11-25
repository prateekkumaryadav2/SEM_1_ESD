package com.example.academic.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academic.dto.AuthResponseDTO;
import com.example.academic.dto.ErrorResponseDTO;
import com.example.academic.dto.GoogleLoginRequestDTO;
import com.example.academic.dto.LoginRequestDTO;
import com.example.academic.dto.MessageResponseDTO;
import com.example.academic.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        Optional<AuthResponseDTO> response = authService.login(loginRequest);
        
        if (response.isPresent()) {
            return ResponseEntity.ok(response.get());
        }
        return ResponseEntity.status(401).body(new ErrorResponseDTO("Invalid credentials"));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@Valid @RequestBody GoogleLoginRequestDTO googleRequest) {
        try {
            AuthResponseDTO response = authService.googleLogin(googleRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponseDTO("Invalid Google token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponseDTO> logout(@RequestHeader(value="X-Auth-Token", required=false) String token) {
        authService.logout(token);
        return ResponseEntity.ok(new MessageResponseDTO("Logged out"));
    }
}
