package com.example.academic.dto;

public class AuthResponseDTO {
    
    private String token;
    private String username;
    private String name;
    private String role;

    // Constructors
    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public AuthResponseDTO(String token, String username, String name) {
        this.token = token;
        this.username = username;
        this.name = name;
    }

    public AuthResponseDTO(String token, String username, String name, String role) {
        this.token = token;
        this.username = username;
        this.name = name;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
