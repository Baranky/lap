package com.example.laboratory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="reports")
public class Report extends BaseEntity {
    private String diagnosisTitle;
    private  String diagnosisDetails;
    private LocalDate dateReported;
    @PrePersist
    protected void onCreate() {
        this.dateReported = LocalDate.now();
    }

    //private String photo;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private LabWorker labWorker;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
