package com.example.laboratory.repository;

import com.example.laboratory.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {
    //tarihe gore sıralama
    @Query("SELECT r FROM Report r ORDER BY r.dateReported DESC")
    List<Report> findAllReportsOrderByDate();

    //bir hastanın raporları
    @Query("SELECT r FROM Report r WHERE r.patient.patientTC = :patientTC")
    List<Report> findReportsByPatientTC(Long patientTC);
}
