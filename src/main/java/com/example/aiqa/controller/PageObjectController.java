package com.example.aiqa.controller;

import com.example.aiqa.dto.PageObjectDto;
import com.example.aiqa.service.PageObjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/page-objects")
@CrossOrigin(origins = "*")
public class PageObjectController {
    
    private final PageObjectService pageObjectService;
    
    public PageObjectController(PageObjectService pageObjectService) {
        this.pageObjectService = pageObjectService;
    }
    
    @GetMapping
    public ResponseEntity<List<PageObjectDto>> getAllPageObjects() {
        return ResponseEntity.ok(pageObjectService.getAllPageObjects());
    }
    
    @GetMapping("/page/{pageName}")
    public ResponseEntity<List<PageObjectDto>> getPageObjectsByPageName(@PathVariable String pageName) {
        return ResponseEntity.ok(pageObjectService.getPageObjectsByPageName(pageName));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PageObjectDto> getPageObject(@PathVariable Long id) {
        PageObjectDto dto = pageObjectService.getPageObjectById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }
    
    @PostMapping
    public ResponseEntity<PageObjectDto> createPageObject(@RequestBody PageObjectDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(pageObjectService.createPageObject(dto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PageObjectDto> updatePageObject(
            @PathVariable Long id, 
            @RequestBody PageObjectDto dto) {
        PageObjectDto updated = pageObjectService.updatePageObject(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePageObject(@PathVariable Long id) {
        pageObjectService.deletePageObject(id);
        return ResponseEntity.noContent().build();
    }
}