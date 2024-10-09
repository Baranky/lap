package com.example.laboratory.dto.Responses;

import java.time.LocalDate;

public record ReportsByPatientRes(
        Long id,
        String diagnosisTitle,
        String diagnosisDetails,
        LocalDate dateReported,
        Long workerId
) {
}
