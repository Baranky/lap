package com.example.laboratory.repository;

import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Long> {
    @Query("SELECT p FROM Patient p WHERE (:name IS NULL OR p.patientName = :name) AND (:surname IS NULL OR p.patientSurname =:surname)AND (:tc IS NULL OR p.patientTC = :tc)")
    List<Patient> searchByNameAndSurname( @Param("tc") Long patientTC,@Param("name") String patientName, @Param("surname") String patientSurname);


    //bir hastanın raporları
    @Query("SELECT p.reports FROM Patient p WHERE p.id = :patientId")
    List<Report> findReportsByPatientId(Long patientId);
}
