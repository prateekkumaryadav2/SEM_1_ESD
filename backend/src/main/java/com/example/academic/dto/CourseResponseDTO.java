package com.example.academic.dto;

import java.util.List;

public class CourseResponseDTO {
    
    private Long id;
    private String code;
    private String title;
    private Integer credits;
    private String description;
    private List<String> specialisations;

    // Constructors
    public CourseResponseDTO() {}

    public CourseResponseDTO(Long id, String code, String title, Integer credits, String description) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.credits = credits;
        this.description = description;
    }

    public CourseResponseDTO(Long id, String code, String title, Integer credits, String description, List<String> specialisations) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.credits = credits;
        this.description = description;
        this.specialisations = specialisations;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSpecialisations() {
        return specialisations;
    }

    public void setSpecialisations(List<String> specialisations) {
        this.specialisations = specialisations;
    }
}
