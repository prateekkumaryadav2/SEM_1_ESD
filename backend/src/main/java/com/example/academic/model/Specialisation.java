package com.example.academic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialisation")
public class Specialisation {
    
    @Id
    @Column(name = "specialisation_id")
    private Integer specialisationId;

    @Column(unique = true, nullable = false, length = 50)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer year;

    @Column(name = "credits_required")
    private Integer creditsRequired;

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
