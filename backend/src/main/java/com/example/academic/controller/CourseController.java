package com.example.academic.controller;

import com.example.academic.model.Course;
import com.example.academic.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository repo;

    public CourseController(CourseRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Course> list() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Course c) {
        Course saved = repo.save(c);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("msg","Deleted"));
    }
}
