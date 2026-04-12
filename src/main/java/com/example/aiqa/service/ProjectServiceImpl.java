package com.example.aiqa.service;

import com.example.aiqa.domain.Project;
import com.example.aiqa.dto.ProjectDto;
import com.example.aiqa.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    
    @Override
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return toDto(project);
    }
    
    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setProjectType(projectDto.getProjectType());
        project.setStatus("active");
        
        Project saved = projectRepository.save(project);
        return toDto(saved);
    }
    
    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setProjectType(projectDto.getProjectType());
        if (projectDto.getStatus() != null) {
            project.setStatus(projectDto.getStatus());
        }
        
        Project updated = projectRepository.save(project);
        return toDto(updated);
    }
    
    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
    
    private ProjectDto toDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setProjectType(project.getProjectType());
        dto.setStatus(project.getStatus());
        
        if (project.getCreatedAt() != null) {
            dto.setCreatedAt(project.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        if (project.getUpdatedAt() != null) {
            dto.setUpdatedAt(project.getUpdatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        
        return dto;
    }
}