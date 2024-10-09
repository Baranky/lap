package com.example.laboratory.dto.Responses;

import java.time.LocalDate;

public record ReportRes (
        Long id,
        String diagnosisTitle,
        String diagnosisDetails,
        LocalDate dateReported,
        //String photo,
        Long workerId,
        Long patientId){

}
