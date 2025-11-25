package com.example.academic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.academic.dto.CourseRequestDTO;
import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.model.Course;

public class CourseMapper {
    
    public static Course toEntity(CourseRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Course course = new Course();
        course.setCode(dto.getCode());
        course.setTitle(dto.getTitle());
        course.setCredits(dto.getCredits());
        course.setDescription(dto.getDescription());
        
        return course;
    }
    
    public static CourseResponseDTO toDTO(Course entity) {
        if (entity == null) {
            return null;
        }
        
        return new CourseResponseDTO(
            entity.getId(),
            entity.getCode(),
            entity.getTitle(),
            entity.getCredits(),
            entity.getDescription()
        );
    }
    
    public static List<CourseResponseDTO> toDTOList(List<Course> entities) {
        if (entities == null) {
            return null;
        }
        
        return entities.stream()
                .map(CourseMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public static void updateEntity(Course entity, CourseRequestDTO dto) {
        if (entity == null || dto == null) {
            return;
        }
        
        entity.setCode(dto.getCode());
        entity.setTitle(dto.getTitle());
        entity.setCredits(dto.getCredits());
        entity.setDescription(dto.getDescription());
    }
}
