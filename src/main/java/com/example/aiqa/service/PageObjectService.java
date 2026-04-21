package com.example.aiqa.service;

import com.example.aiqa.dto.PageObjectDto;
import java.util.List;

public interface PageObjectService {
    List<PageObjectDto> getAllPageObjects();
    List<PageObjectDto> getPageObjectsByPageName(String pageName);
    PageObjectDto getPageObjectById(Long id);
    PageObjectDto createPageObject(PageObjectDto dto);
    PageObjectDto updatePageObject(Long id, PageObjectDto dto);
    void deletePageObject(Long id);
}