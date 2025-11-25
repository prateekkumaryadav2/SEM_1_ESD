package com.example.academic.dto;

import jakarta.validation.constraints.NotBlank;

public class GoogleLoginRequestDTO {
    
    @NotBlank(message = "Credential is required")
    private String credential;

    // Constructors
    public GoogleLoginRequestDTO() {}

    public GoogleLoginRequestDTO(String credential) {
        this.credential = credential;
    }

    // Getters and Setters
    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }
}
