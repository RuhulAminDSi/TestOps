package com.example.aiqa.repository;

import com.example.aiqa.domain.SecurityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SecurityScanRepository extends JpaRepository<SecurityScan, UUID> {
    List<SecurityScan> findByTypeOrderByCreatedAtDesc(String type);
    List<SecurityScan> findAllByOrderByCreatedAtDesc();
}