package com.example.laboratory.services.Impl;

import com.example.laboratory.dto.Requests.ReportReq;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.entity.LabWorker;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import com.example.laboratory.repository.ReportRepository;
import com.example.laboratory.services.LabWorkerService;
import com.example.laboratory.services.PatientService;
import com.example.laboratory.services.ReportService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    private ReportRepository reportRepository;
    private PatientService patientService;
    private LabWorkerService labotaryPersonService;

    public ReportServiceImpl(ReportRepository reportRepository, PatientService patientService, LabWorkerService labotaryPersonService) {
        this.reportRepository = reportRepository;
        this.labotaryPersonService = labotaryPersonService;
        this.patientService = patientService;
    }


    @Override
    public List<ReportRes> getAllReport() {
        List<Report> reportList=reportRepository.findAll();
        List<ReportRes> responseList=new ArrayList<>();
        for(Report user:reportList){
            responseList.add(mapToResponse(user));
        }
        return responseList;
    }

    @Override
    public ReportRes createReport(ReportReq request) {
        Report report=mapToReport(request);
        Report newReport=reportRepository.save(report);
        return mapToResponse(newReport);
    }

    // Hastanın TC numarasına göre raporları bulma ve dönme
    @Override
    public List<ReportsByPatientRes> getReportsByPatientTC(Long patientTC) {
        List<Report> reportList=reportRepository.findReportsByPatientTC(patientTC);
        List<ReportsByPatientRes> responseList=new ArrayList<>();
        for (Report user:reportList) {
            responseList.add((mapToReportResponse(user)));
        }

        return responseList;
    }

    @Override
    public void deleteReport(Long reportId) {
        reportRepository.deleteById((reportId));
    }

    @Override
    public ReportRes getReportId(Long reportId) {
        Report report=reportRepository.getReferenceById(reportId);
        ReportRes  reportRes=mapToResponse(report);
        return reportRes;
    }

    @Override
    public ReportRes updateReport(Long id, ReportReq reportReq) throws Exception {
        Report existingReport = reportRepository.findById(id).orElseThrow(() ->
                new Exception("report not found with id: " + id));
        // Mevcut rapor nesnesini maptoReport kullanarak güncelleme
        Report updateReport = mapToReport(reportReq);
        updateReport.setId(existingReport.getId()); // Mevcut ID'yi koruyoruz
        Report savedReport = reportRepository.save(updateReport);
        return mapToResponse(savedReport);
    }

    @Override
    public List<ReportRes> findAllReportsOrderByDate() {
        List<Report> report= reportRepository.findAllReportsOrderByDate();
        return report.stream().map(this::mapToResponse).collect(Collectors.toList());

    }

    private ReportsByPatientRes mapToReportResponse(Report report){
        ReportsByPatientRes response =new ReportsByPatientRes(
                report.getId(),
                report.getDiagnosisTitle(),
                report.getDiagnosisDetails(),
                report.getDateReported(),
                report.getLabWorker().getId()
        );
        return response;
    }

    private ReportRes mapToResponse(Report report) {
        ReportRes response = new ReportRes(
                report.getId(),
                report.getDiagnosisTitle(),
                report.getDiagnosisDetails(),
                report.getDateReported(),
                report.getLabWorker().getId(),
                report.getPatient().getId()
        );
        return response;
    }

    private Report mapToReport(ReportReq request) {
        Report report = new Report();
        report.setDiagnosisTitle(request.diagnosisTitle());
        report.setDiagnosisDetails(request.diagnosisDetails());
        //report.setDateReported(request.dateReported());

        LabWorker labWorker = labotaryPersonService.getById(request.workerId());
        report.setLabWorker(labWorker);

        Patient patient = patientService.getById(request.patientId());
        report.setPatient(patient);

        return report;
    }
}
