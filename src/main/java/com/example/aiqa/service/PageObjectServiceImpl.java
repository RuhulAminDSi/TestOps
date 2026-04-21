package com.example.aiqa.service;

import com.example.aiqa.domain.PageObject;
import com.example.aiqa.dto.PageObjectDto;
import com.example.aiqa.repository.PageObjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PageObjectServiceImpl implements PageObjectService {
    
    private final PageObjectRepository pageObjectRepository;
    
    public PageObjectServiceImpl(PageObjectRepository pageObjectRepository) {
        this.pageObjectRepository = pageObjectRepository;
    }
    
    @Override
    public List<PageObjectDto> getAllPageObjects() {
        return pageObjectRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<PageObjectDto> getPageObjectsByPageName(String pageName) {
        return pageObjectRepository.findByPageNameOrderByUpdatedAtDesc(pageName).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public PageObjectDto getPageObjectById(Long id) {
        return pageObjectRepository.findById(id)
            .map(this::toDto)
            .orElse(null);
    }
    
    @Override
    public PageObjectDto createPageObject(PageObjectDto dto) {
        PageObject entity = toEntity(dto);
        entity = pageObjectRepository.save(entity);
        return toDto(entity);
    }
    
    @Override
    public PageObjectDto updatePageObject(Long id, PageObjectDto dto) {
        return pageObjectRepository.findById(id)
            .map(existing -> {
                existing.setName(dto.getName());
                existing.setPageName(dto.getPageName());
                existing.setDescription(dto.getDescription());
                existing.setLocatorType(dto.getLocatorType());
                existing.setLocatorValue(dto.getLocatorValue());
                existing.setElementType(dto.getElementType());
                existing = pageObjectRepository.save(existing);
                return toDto(existing);
            })
            .orElse(null);
    }
    
    @Override
    public void deletePageObject(Long id) {
        pageObjectRepository.deleteById(id);
    }
    
    private PageObjectDto toDto(PageObject entity) {
        PageObjectDto dto = new PageObjectDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPageName(entity.getPageName());
        dto.setDescription(entity.getDescription());
        dto.setLocatorType(entity.getLocatorType());
        dto.setLocatorValue(entity.getLocatorValue());
        dto.setElementType(entity.getElementType());
        if (entity.getUpdatedAt() != null) {
            dto.setUpdatedAt(entity.getUpdatedAt().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")));
        }
        return dto;
    }
    
    private PageObject toEntity(PageObjectDto dto) {
        PageObject entity = new PageObject();
        entity.setName(dto.getName());
        entity.setPageName(dto.getPageName());
        entity.setDescription(dto.getDescription());
        entity.setLocatorType(dto.getLocatorType());
        entity.setLocatorValue(dto.getLocatorValue());
        entity.setElementType(dto.getElementType());
        return entity;
    }
}