package com.example.laboratory.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Table(name = "LabWorker")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LabWorker extends BaseEntity {

    @Column(name = "worker_name")
    private String workerName;

    @Column(name = "worker_surname")
    private String workerSurname;

    @Min(value = 1000000, message = "Hospital ID Number 7 haneli bir sayı olmalıdır.")
    @Max(value = 9999999, message = "Hospital ID Number 7 haneli bir sayı olmalıdır.")
    @Column(unique = true,name = "hospital_id_number")
    private Long hospitalIdNumber;

    @OneToMany(mappedBy = "labWorker")
    private List<Report> reports;


}
