package com.example.academic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.dto.MessageResponseDTO;
import com.example.academic.dto.SpecialisationRequestDTO;
import com.example.academic.dto.SpecialisationResponseDTO;
import com.example.academic.service.SpecialisationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/specialisations")
public class SpecialisationController {

    private final SpecialisationService specialisationService;

    public SpecialisationController(SpecialisationService specialisationService) {
        this.specialisationService = specialisationService;
    }

    @GetMapping
    public ResponseEntity<List<SpecialisationResponseDTO>> getAllSpecialisations() {
        List<SpecialisationResponseDTO> specialisations = specialisationService.getAllSpecialisations();
        return ResponseEntity.ok(specialisations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialisationResponseDTO> getSpecialisationById(@PathVariable Integer id) {
        Optional<SpecialisationResponseDTO> specialisation = specialisationService.getSpecialisationById(id);
        return specialisation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SpecialisationResponseDTO> createSpecialisation(@Valid @RequestBody SpecialisationRequestDTO dto) {
        SpecialisationResponseDTO created = specialisationService.createSpecialisation(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecialisationResponseDTO> updateSpecialisation(
            @PathVariable Integer id,
            @Valid @RequestBody SpecialisationRequestDTO dto) {
        Optional<SpecialisationResponseDTO> updated = specialisationService.updateSpecialisation(id, dto);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponseDTO> deleteSpecialisation(@PathVariable Integer id) {
        boolean deleted = specialisationService.deleteSpecialisation(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new MessageResponseDTO("Specialisation deleted successfully"));
    }

    @GetMapping("/{id}/courses")
    public ResponseEntity<List<CourseResponseDTO>> getCoursesBySpecialisation(@PathVariable Integer id) {
        List<CourseResponseDTO> courses = specialisationService.getCoursesBySpecialisationId(id);
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/{specialisationId}/courses/{courseId}")
    public ResponseEntity<MessageResponseDTO> addCourseToSpecialisation(
            @PathVariable Integer specialisationId,
            @PathVariable Integer courseId) {
        specialisationService.addCourseToSpecialisation(specialisationId, courseId);
        return ResponseEntity.ok(new MessageResponseDTO("Course added to specialisation"));
    }

    @DeleteMapping("/{specialisationId}/courses/{courseId}")
    public ResponseEntity<MessageResponseDTO> removeCourseFromSpecialisation(
            @PathVariable Integer specialisationId,
            @PathVariable Integer courseId) {
        specialisationService.removeCourseFromSpecialisation(specialisationId, courseId);
        return ResponseEntity.ok(new MessageResponseDTO("Course removed from specialisation"));
    }
}
