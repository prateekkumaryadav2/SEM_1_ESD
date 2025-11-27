package com.example.academic.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academic.dto.CourseRequestDTO;
import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.mapper.CourseMapper;
import com.example.academic.model.Course;
import com.example.academic.model.SpecialisationCourse;
import com.example.academic.repository.CourseRepository;
import com.example.academic.repository.SpecialisationCourseRepository;
import com.example.academic.repository.SpecialisationRepository;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final SpecialisationCourseRepository specialisationCourseRepository;
    private final SpecialisationRepository specialisationRepository;

    public CourseService(CourseRepository courseRepository, 
                        SpecialisationCourseRepository specialisationCourseRepository,
                        SpecialisationRepository specialisationRepository) {
        this.courseRepository = courseRepository;
        this.specialisationCourseRepository = specialisationCourseRepository;
        this.specialisationRepository = specialisationRepository;
    }

    /**
     * Retrieve all courses with their specialisations
     * @return List of CourseResponseDTO
     */
    public List<CourseResponseDTO> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
                .map(this::enrichCourseWithSpecialisations)
                .collect(Collectors.toList());
    }
    
    /**
     * Enrich course DTO with specialisation names using JOIN query
     */
    private CourseResponseDTO enrichCourseWithSpecialisations(Course course) {
        CourseResponseDTO dto = CourseMapper.toDTO(course);
        
        // Get specialisation names using JOIN query
        List<String> specialisationNames = courseRepository.findSpecialisationNamesByCourseId(course.getCourseId());
        dto.setSpecialisations(specialisationNames);
        
        return dto;
    }

    /**
     * Get a course by ID
     * @param id Course ID
     * @return Optional CourseResponseDTO
     */
    public Optional<CourseResponseDTO> getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(CourseMapper::toDTO);
    }

    /**
     * Create a new course
     * @param courseRequestDTO Course data
     * @return Created CourseResponseDTO
     * @throws IllegalArgumentException if course code or title already exists
     */
    public CourseResponseDTO createCourse(CourseRequestDTO courseRequestDTO) {
        // Check if course code already exists
        if (courseRepository.existsByCourseCode(courseRequestDTO.getCode())) {
            throw new IllegalArgumentException("Course code already exists: " + courseRequestDTO.getCode());
        }
        
        // Check if course title already exists
        if (courseRepository.existsByName(courseRequestDTO.getTitle())) {
            throw new IllegalArgumentException("Course title already exists: " + courseRequestDTO.getTitle());
        }
        
        Course course = CourseMapper.toEntity(courseRequestDTO);
        Course savedCourse = courseRepository.save(course);
        
        // Handle specialization assignments
        if (courseRequestDTO.getSpecialisationIds() != null && !courseRequestDTO.getSpecialisationIds().isEmpty()) {
            assignSpecialisationsToCourse(savedCourse.getCourseId(), courseRequestDTO.getSpecialisationIds());
        }
        
        return enrichCourseWithSpecialisations(savedCourse);
    }

    /**
     * Update an existing course
     * @param id Course ID
     * @param courseRequestDTO Updated course data
     * @return Updated CourseResponseDTO or empty if not found
     * @throws IllegalArgumentException if course code or title already exists for another course
     */
    public Optional<CourseResponseDTO> updateCourse(Long id, CourseRequestDTO courseRequestDTO) {
        return courseRepository.findById(id)
                .map(course -> {
                    // Check if new code conflicts with another course
                    if (!course.getCourseCode().equals(courseRequestDTO.getCode())) {
                        courseRepository.findByCourseCode(courseRequestDTO.getCode())
                            .ifPresent(existingCourse -> {
                                if (!existingCourse.getCourseId().equals(id.intValue())) {
                                    throw new IllegalArgumentException("Course code already exists: " + courseRequestDTO.getCode());
                                }
                            });
                    }
                    
                    // Check if new title conflicts with another course
                    if (!course.getName().equals(courseRequestDTO.getTitle())) {
                        courseRepository.findByName(courseRequestDTO.getTitle())
                            .ifPresent(existingCourse -> {
                                if (!existingCourse.getCourseId().equals(id.intValue())) {
                                    throw new IllegalArgumentException("Course title already exists: " + courseRequestDTO.getTitle());
                                }
                            });
                    }
                    
                    CourseMapper.updateEntity(course, courseRequestDTO);
                    Course updatedCourse = courseRepository.save(course);
                    
                    // Update specialization assignments
                    if (courseRequestDTO.getSpecialisationIds() != null) {
                        updateCourseSpecialisations(updatedCourse.getCourseId(), courseRequestDTO.getSpecialisationIds());
                    }
                    
                    return enrichCourseWithSpecialisations(updatedCourse);
                });
    }

    /**
     * Delete a course by ID
     * @param id Course ID
     * @return true if deleted, false if not found
     */
    public boolean deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Check if a course exists by ID
     * @param id Course ID
     * @return true if exists, false otherwise
     */
    public boolean courseExists(Long id) {
        return courseRepository.existsById(id);
    }

    /**
     * Count total courses
     * @return Total number of courses
     */
    public long countCourses() {
        return courseRepository.count();
    }
    
    /**
     * Assign specialisations to a course
     * @param courseId Course ID
     * @param specialisationIds List of specialisation IDs
     */
    private void assignSpecialisationsToCourse(Integer courseId, List<Integer> specialisationIds) {
        for (Integer specId : specialisationIds) {
            if (specialisationRepository.existsById(specId)) {
                SpecialisationCourse sc = new SpecialisationCourse();
                // Generate a unique ID (you might want to use auto-increment)
                sc.setId(generateSpecialisationCourseId());
                sc.setCourseId(courseId);
                sc.setSpecialisationId(specId);
                specialisationCourseRepository.save(sc);
            }
        }
    }
    
    /**
     * Update course specialisations
     * @param courseId Course ID
     * @param specialisationIds New list of specialisation IDs
     */
    private void updateCourseSpecialisations(Integer courseId, List<Integer> specialisationIds) {
        // Remove existing assignments
        List<SpecialisationCourse> existing = specialisationCourseRepository.findByCourseId(courseId);
        specialisationCourseRepository.deleteAll(existing);
        
        // Add new assignments
        if (specialisationIds != null && !specialisationIds.isEmpty()) {
            assignSpecialisationsToCourse(courseId, specialisationIds);
        }
    }
    
    /**
     * Generate a unique ID for SpecialisationCourse
     * @return Unique ID
     */
    private Integer generateSpecialisationCourseId() {
        List<SpecialisationCourse> all = specialisationCourseRepository.findAll();
        return all.isEmpty() ? 1 : all.stream().mapToInt(SpecialisationCourse::getId).max().orElse(0) + 1;
    }
}
