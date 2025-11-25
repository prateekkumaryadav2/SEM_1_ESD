package com.example.academic.dto;

public class ErrorResponseDTO {
    
    private String error;

    // Constructors
    public ErrorResponseDTO() {}

    public ErrorResponseDTO(String error) {
        this.error = error;
    }

    // Getters and Setters
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
