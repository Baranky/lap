package com.example.laboratory.controller;

import com.example.laboratory.dto.Requests.ReportReq;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.services.ReportService;
import jdk.management.jfr.RemoteRecordingStream;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/report")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    //kaydetme
    @PostMapping()
    public ResponseEntity<ReportRes> saveReport(@RequestBody ReportReq reportReq){
        return new  ResponseEntity<>(reportService.createReport(reportReq), HttpStatus.CREATED);
    }

    //tum raporları listeleme
    @GetMapping()
    public ResponseEntity<List<ReportRes>> getAllReport() {
        return new ResponseEntity<>(reportService.getAllReport(), HttpStatus.OK);
    }

    //id gore sorgulama
    @GetMapping("{id}")
    public ReportRes getReportById(@PathVariable Long id) {
        return  reportService.getReportId(id);
    }

    @GetMapping("sort")
    public ResponseEntity<List<ReportRes>> find(){
         return new ResponseEntity<>(reportService.findAllReportsOrderByDate(),HttpStatus.OK);
    }
    //silme
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update
    @PutMapping("{id}")
    public ResponseEntity<ReportRes> updateReport(@PathVariable Long id,@RequestBody ReportReq reportReq) throws Exception {
        return new ResponseEntity<>(reportService.updateReport(id,reportReq),HttpStatus.OK);
    }

    //hastanın raporları
    @GetMapping("/r/{patientTC}")
    public List<ReportsByPatientRes> getReportsByPatientId(@PathVariable Long patientTC) {
        return reportService.getReportsByPatientTC(patientTC);
    }

}
