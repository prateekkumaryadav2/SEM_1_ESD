package com.example.academic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialisation_course")
public class SpecialisationCourse {
    
    @Id
    private Integer id;

    @Column(name = "specialisation_id", nullable = false)
    private Integer specialisationId;

    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getSpecialisationId() { return specialisationId; }
    public void setSpecialisationId(Integer specialisationId) { this.specialisationId = specialisationId; }

    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }
}
