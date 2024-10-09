package com.example.laboratory.dto.Requests;

import com.example.laboratory.entity.Patient;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

public record PatientReq (
        String patientName,
        String patientSurname,
        Long patientTC){
}
