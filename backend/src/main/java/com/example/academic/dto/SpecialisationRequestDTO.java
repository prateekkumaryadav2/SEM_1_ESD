package com.example.academic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SpecialisationRequestDTO {
    
    @NotNull(message = "Specialisation ID is required")
    private Integer specialisationId;
    
    @NotBlank(message = "Code is required")
    private String code;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    private String description;
    private Integer year;
    private Integer creditsRequired;

    // Constructors
    public SpecialisationRequestDTO() {}

    // Getters and Setters
    public Integer getSpecialisationId() { return specialisationId; }
    public void setSpecialisationId(Integer specialisationId) { this.specialisationId = specialisationId; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public Integer getCreditsRequired() { return creditsRequired; }
    public void setCreditsRequired(Integer creditsRequired) { this.creditsRequired = creditsRequired; }
}
