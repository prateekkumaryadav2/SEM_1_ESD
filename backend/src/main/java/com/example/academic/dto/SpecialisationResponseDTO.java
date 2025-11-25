package com.example.academic.dto;

public class SpecialisationResponseDTO {
    
    private Integer specialisationId;
    private String code;
    private String name;
    private String description;
    private Integer year;
    private Integer creditsRequired;

    // Constructors
    public SpecialisationResponseDTO() {}

    public SpecialisationResponseDTO(Integer specialisationId, String code, String name, String description, Integer year, Integer creditsRequired) {
        this.specialisationId = specialisationId;
        this.code = code;
        this.name = name;
        this.description = description;
        this.year = year;
        this.creditsRequired = creditsRequired;
    }

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
