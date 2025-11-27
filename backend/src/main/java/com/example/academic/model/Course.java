package com.example.academic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @NotBlank
    @Column(name = "course_code", unique = true, nullable = false, length = 10)
    private String courseCode;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer year;

    @Column(length = 30)
    private String term;

    @Column(length = 50)
    private String faculty;

    private Integer credits;

    private Integer capacity;

    // Getters and Setters
    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    
    // Legacy getters/setters for backward compatibility
    public Long getId() { return courseId != null ? courseId.longValue() : null; }
    public void setId(Long id) { this.courseId = id != null ? id.intValue() : null; }
    
    public String getCode() { return courseCode; }
    public void setCode(String code) { this.courseCode = code; }
    
    public String getTitle() { return name; }
    public void setTitle(String title) { this.name = title; }
}
