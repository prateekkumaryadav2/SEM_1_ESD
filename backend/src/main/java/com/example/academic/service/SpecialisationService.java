package com.example.academic.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.dto.SpecialisationRequestDTO;
import com.example.academic.dto.SpecialisationResponseDTO;
import com.example.academic.mapper.CourseMapper;
import com.example.academic.mapper.SpecialisationMapper;
import com.example.academic.model.Course;
import com.example.academic.model.Specialisation;
import com.example.academic.model.SpecialisationCourse;
import com.example.academic.repository.CourseRepository;
import com.example.academic.repository.SpecialisationCourseRepository;
import com.example.academic.repository.SpecialisationRepository;

@Service
@Transactional
public class SpecialisationService {

    private final SpecialisationRepository specialisationRepository;
    private final SpecialisationCourseRepository specialisationCourseRepository;
    private final CourseRepository courseRepository;

    public SpecialisationService(SpecialisationRepository specialisationRepository,
                                  SpecialisationCourseRepository specialisationCourseRepository,
                                  CourseRepository courseRepository) {
        this.specialisationRepository = specialisationRepository;
        this.specialisationCourseRepository = specialisationCourseRepository;
        this.courseRepository = courseRepository;
    }

    /**
     * Get all specialisations
     */
    public List<SpecialisationResponseDTO> getAllSpecialisations() {
        List<Specialisation> specialisations = specialisationRepository.findAll();
        return SpecialisationMapper.toDTOList(specialisations);
    }

    /**
     * Get a specialisation by ID
     */
    public Optional<SpecialisationResponseDTO> getSpecialisationById(Integer id) {
        return specialisationRepository.findById(id)
                .map(SpecialisationMapper::toDTO);
    }

    /**
     * Create a new specialisation
     */
    public SpecialisationResponseDTO createSpecialisation(SpecialisationRequestDTO dto) {
        Specialisation specialisation = SpecialisationMapper.toEntity(dto);
        Specialisation saved = specialisationRepository.save(specialisation);
        return SpecialisationMapper.toDTO(saved);
    }

    /**
     * Update an existing specialisation
     */
    public Optional<SpecialisationResponseDTO> updateSpecialisation(Integer id, SpecialisationRequestDTO dto) {
        return specialisationRepository.findById(id)
                .map(specialisation -> {
                    SpecialisationMapper.updateEntity(specialisation, dto);
                    Specialisation updated = specialisationRepository.save(specialisation);
                    return SpecialisationMapper.toDTO(updated);
                });
    }

    /**
     * Delete a specialisation
     */
    public boolean deleteSpecialisation(Integer id) {
        if (specialisationRepository.existsById(id)) {
            // Also delete all course associations
            List<SpecialisationCourse> associations = specialisationCourseRepository.findBySpecialisationId(id);
            specialisationCourseRepository.deleteAll(associations);
            specialisationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Get all courses for a specialisation
     */
    public List<CourseResponseDTO> getCoursesBySpecialisationId(Integer specialisationId) {
        List<Integer> courseIds = specialisationCourseRepository.findCourseIdsBySpecialisationId(specialisationId);
        List<Course> courses = courseRepository.findAllById(
                courseIds.stream().map(Integer::longValue).collect(Collectors.toList())
        );
        return CourseMapper.toDTOList(courses);
    }

    /**
     * Add a course to a specialisation
     */
    public void addCourseToSpecialisation(Integer specialisationId, Integer courseId) {
        SpecialisationCourse sc = new SpecialisationCourse();
        // Generate a simple ID (in production, use a proper ID generation strategy)
        int maxId = specialisationCourseRepository.findAll().stream()
                .mapToInt(SpecialisationCourse::getId)
                .max()
                .orElse(0);
        sc.setId(maxId + 1);
        sc.setSpecialisationId(specialisationId);
        sc.setCourseId(courseId);
        specialisationCourseRepository.save(sc);
    }

    /**
     * Remove a course from a specialisation
     */
    public void removeCourseFromSpecialisation(Integer specialisationId, Integer courseId) {
        specialisationCourseRepository.deleteBySpecialisationIdAndCourseId(specialisationId, courseId);
    }
}
