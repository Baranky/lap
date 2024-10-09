package com.example.laboratory.services;


import com.example.laboratory.dto.Requests.ReportReq;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.entity.Report;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReportService {
    List<ReportRes> getAllReport();
    ReportRes createReport(ReportReq request) ;
    void deleteReport(Long ReportId);
    ReportRes getReportId(Long ReportId);
    ReportRes updateReport(Long id, ReportReq reportReq) throws Exception;
    List<ReportRes> findAllReportsOrderByDate();
    List<ReportsByPatientRes> getReportsByPatientTC(Long patientTC);

}
