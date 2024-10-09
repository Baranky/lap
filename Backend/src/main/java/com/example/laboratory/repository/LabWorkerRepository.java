package com.example.laboratory.repository;

import com.example.laboratory.entity.LabWorker;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabWorkerRepository extends JpaRepository<LabWorker,Long> {
    @Query("SELECT l FROM LabWorker l WHERE (:name IS NULL OR l.workerName = :name) AND (:surname IS NULL OR l.workerSurname =:surname)AND (:id IS NULL OR l.hospitalIdNumber = :id)")
    List<LabWorker> searchByNameAndSurname(@Param("id") Long hospitalIdNumber,@Param("name") String workerName, @Param("surname") String workerSurname);

    @Query("SELECT l.reports FROM LabWorker l WHERE l.id = :workerId")
    List<Report> ReportsByWorker(Long workerId);

}
