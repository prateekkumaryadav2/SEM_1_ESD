package com.example.academic.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academic.dto.CourseRequestDTO;
import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.dto.MessageResponseDTO;
import com.example.academic.model.Specialisation;
import com.example.academic.repository.SpecialisationRepository;
import com.example.academic.service.CourseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final SpecialisationRepository specialisationRepository;

    public CourseController(CourseService courseService, SpecialisationRepository specialisationRepository) {
        this.courseService = courseService;
        this.specialisationRepository = specialisationRepository;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> list() {
        List<CourseResponseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    public ResponseEntity<CourseResponseDTO> create(@Valid @RequestBody CourseRequestDTO courseDTO) {
        CourseResponseDTO created = courseService.createCourse(courseDTO);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponseDTO> delete(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new MessageResponseDTO("Deleted"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> update(@PathVariable Long id, @Valid @RequestBody CourseRequestDTO courseDTO) {
        return courseService.updateCourse(id, courseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/specialisations")
    public ResponseEntity<List<SpecialisationDTO>> getAllSpecialisations() {
        List<Specialisation> specialisations = specialisationRepository.findAll();
        List<SpecialisationDTO> dtos = specialisations.stream()
                .map(s -> new SpecialisationDTO(s.getSpecialisationId(), s.getName(), s.getCode()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    // Inner DTO class for specialisation response
    public static class SpecialisationDTO {
        private Integer id;
        private String name;
        private String code;
        
        public SpecialisationDTO(Integer id, String name, String code) {
            this.id = id;
            this.name = name;
            this.code = code;
        }
        
        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }
}
