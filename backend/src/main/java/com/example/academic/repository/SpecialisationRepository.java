package com.example.academic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.academic.model.Specialisation;

@Repository
public interface SpecialisationRepository extends JpaRepository<Specialisation, Integer> {
    Optional<Specialisation> findByCode(String code);
}
