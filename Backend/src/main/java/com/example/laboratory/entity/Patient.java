package com.example.laboratory.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "patients")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Patient extends BaseEntity {

    @Min(value = 10000000000L, message = "Hospital ID Number 11 haneli olmalıdır.")
    @Max(value = 99999999999L, message = "Hospital ID Number 11 haneli olmalıdır.")
    @Column(unique = true,name = "patient_tc")
    private Long patientTC;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "patient_surname")
    private String patientSurname;

    @OneToMany(mappedBy = "patient")
    private List<Report> reports;

}
