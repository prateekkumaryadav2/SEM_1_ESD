package com.example.academic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.academic.dto.SpecialisationRequestDTO;
import com.example.academic.dto.SpecialisationResponseDTO;
import com.example.academic.model.Specialisation;

public class SpecialisationMapper {
    
    public static Specialisation toEntity(SpecialisationRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Specialisation specialisation = new Specialisation();
        specialisation.setSpecialisationId(dto.getSpecialisationId());
        specialisation.setCode(dto.getCode());
        specialisation.setName(dto.getName());
        specialisation.setDescription(dto.getDescription());
        specialisation.setYear(dto.getYear());
        specialisation.setCreditsRequired(dto.getCreditsRequired());
        
        return specialisation;
    }
    
    public static SpecialisationResponseDTO toDTO(Specialisation entity) {
        if (entity == null) {
            return null;
        }
        
        return new SpecialisationResponseDTO(
            entity.getSpecialisationId(),
            entity.getCode(),
            entity.getName(),
            entity.getDescription(),
            entity.getYear(),
            entity.getCreditsRequired()
        );
    }
    
    public static List<SpecialisationResponseDTO> toDTOList(List<Specialisation> entities) {
        if (entities == null) {
            return null;
        }
        
        return entities.stream()
                .map(SpecialisationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public static void updateEntity(Specialisation entity, SpecialisationRequestDTO dto) {
        if (entity == null || dto == null) {
            return;
        }
        
        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setYear(dto.getYear());
        entity.setCreditsRequired(dto.getCreditsRequired());
    }
}
