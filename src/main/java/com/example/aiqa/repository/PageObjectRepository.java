package com.example.aiqa.repository;

import com.example.aiqa.domain.PageObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageObjectRepository extends JpaRepository<PageObject, Long> {
    List<PageObject> findByPageName(String pageName);
    List<PageObject> findByPageNameOrderByUpdatedAtDesc(String pageName);
}