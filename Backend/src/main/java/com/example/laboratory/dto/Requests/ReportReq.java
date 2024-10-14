package com.example.laboratory.dto.Requests;

import java.time.LocalDate;

public record ReportReq (
         String diagnosisTitle,
         String diagnosisDetails,
        // LocalDate dateReported,
         //String photo,
         Long workerId,
         Long patientId){

}

