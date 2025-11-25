package com.example.academic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.academic.model.SpecialisationCourse;

@Repository
public interface SpecialisationCourseRepository extends JpaRepository<SpecialisationCourse, Integer> {
    
    List<SpecialisationCourse> findBySpecialisationId(Integer specialisationId);
    
    List<SpecialisationCourse> findByCourseId(Integer courseId);
    
    @Query("SELECT sc.courseId FROM SpecialisationCourse sc WHERE sc.specialisationId = :specialisationId")
    List<Integer> findCourseIdsBySpecialisationId(@Param("specialisationId") Integer specialisationId);
    
    void deleteBySpecialisationIdAndCourseId(Integer specialisationId, Integer courseId);
}
