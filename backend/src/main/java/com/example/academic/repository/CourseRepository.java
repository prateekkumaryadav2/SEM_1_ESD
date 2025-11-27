package com.example.academic.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.academic.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseCode(String courseCode);
    Optional<Course> findByName(String name);
    boolean existsByCourseCode(String courseCode);
    boolean existsByName(String name);
    
    @Query("SELECT s.name FROM Specialisation s " +
           "JOIN SpecialisationCourse sc ON s.specialisationId = sc.specialisationId " +
           "WHERE sc.courseId = :courseId")
    List<String> findSpecialisationNamesByCourseId(@Param("courseId") Integer courseId);
}
