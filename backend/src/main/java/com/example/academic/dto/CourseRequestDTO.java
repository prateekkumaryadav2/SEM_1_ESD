package com.example.academic.dto;

import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CourseRequestDTO {
    
    @NotBlank(message = "Course code is required")
    private String code;
    
    @NotBlank(message = "Course title is required")
    private String title;
    
    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    private Integer credits;
    
    private String description;
    
    private List<Integer> specialisationIds;

    // Constructors
    public CourseRequestDTO() {}

    public CourseRequestDTO(String code, String title, Integer credits, String description) {
        this.code = code;
        this.title = title;
        this.credits = credits;
        this.description = description;
    }

    // Getters and Setters
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

    public List<Integer> getSpecialisationIds() {
        return specialisationIds;
    }

    public void setSpecialisationIds(List<Integer> specialisationIds) {
        this.specialisationIds = specialisationIds;
    }
}
