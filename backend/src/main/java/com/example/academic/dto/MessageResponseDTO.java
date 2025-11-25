package com.example.academic.dto;

public class MessageResponseDTO {
    
    private String msg;

    // Constructors
    public MessageResponseDTO() {}

    public MessageResponseDTO(String msg) {
        this.msg = msg;
    }

    // Getters and Setters
    public String getMessage() {
        return msg;
    }

    public void setMessage(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
