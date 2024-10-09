package com.example.laboratory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    //private String photo;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private LabWorker labWorker;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
