package com.example.laboratory.controller;

import com.example.laboratory.dto.Requests.PatientReq;
import com.example.laboratory.dto.Responses.PatientRes;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.entity.Report;
import com.example.laboratory.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patient")
public class PatientController {
    private final PatientService patientService;
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    //kaydetme
    @PostMapping()
    public ResponseEntity<PatientRes> savePatient(@Valid @RequestBody PatientReq patientReq){
        return new  ResponseEntity<>(patientService.createPatient(patientReq), HttpStatus.CREATED);
    }

    //tum hastaları listeleme
    @GetMapping()
    public ResponseEntity<List<PatientRes>> getAllPatient() {
        return new ResponseEntity<>(patientService.getAllPatient(), HttpStatus.OK);
    }

    //id gore sorgulama
    @GetMapping("{id}")
    public PatientRes getPatientById(@PathVariable Long id) {
        return  patientService.getPatientId(id);
    }

    //silme
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update
    @PutMapping("{id}")
    public ResponseEntity<PatientRes> updatePatient(@Valid @PathVariable Long id,@RequestBody PatientReq patientReq) throws Exception {
        return new ResponseEntity<>(patientService.updatePatient(id,patientReq),HttpStatus.OK);
    }
    //search
    @GetMapping("/search")
    public List<PatientRes> searchPatient(
            @RequestParam(required = false) Long patientTC,
            @RequestParam(required = false) String patientName,
            @RequestParam(required = false) String patientSurname
    ) {
        return patientService.searchPatient(patientTC,patientName, patientSurname);
    }
    @GetMapping("/a/{id}")
    public List<ReportsByPatientRes> getReportsByPatientId(@PathVariable Long id) {
        return patientService.findReportsByPatientId(id);
    }


}
