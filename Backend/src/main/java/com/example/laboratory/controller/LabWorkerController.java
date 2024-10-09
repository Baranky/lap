package com.example.laboratory.controller;

import com.example.laboratory.dto.Requests.LabWorkerReq;
import com.example.laboratory.dto.Responses.LabWorkerRes;
import com.example.laboratory.dto.Responses.PatientRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.dto.Responses.ReportsByWorkerRes;
import com.example.laboratory.services.LabWorkerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/worker")
public class LabWorkerController {
    private final LabWorkerService labWorkerService;

    public LabWorkerController(LabWorkerService labWorkerService) {
        this.labWorkerService = labWorkerService;
    }

    //kaydetme
    @PostMapping()
    public ResponseEntity<LabWorkerRes> saveWorker(@Valid  @RequestBody LabWorkerReq labWorkerReq){
        return new  ResponseEntity<>(labWorkerService.createLabWorker(labWorkerReq), HttpStatus.CREATED);
    }

    //tum calışanları listeleme
    @GetMapping()
    public ResponseEntity<List<LabWorkerRes>> getAllWorker() {
        return new ResponseEntity<>(labWorkerService.getAllLabWorker(), HttpStatus.OK);
    }

    //id gore sorgulama
    @GetMapping("{id}")
    public LabWorkerRes getWorkerById(@PathVariable Long id) {
        return  labWorkerService.getLabWorkerId(id);
    }

    //silme
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
        labWorkerService.deleteLabWorker(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update
    @PutMapping("{id}")
    public ResponseEntity<LabWorkerRes> updateWorker(@Valid @PathVariable Long id,@RequestBody LabWorkerReq labWorkerReq) throws Exception {
        return new ResponseEntity<>(labWorkerService.updateLabWorker(id,labWorkerReq),HttpStatus.OK);
    }
    //search
    @GetMapping("/search")
    public List<LabWorkerRes> searchWorker(
            @RequestParam(required=false) Long hospitalIdNumber,
            @RequestParam(required = false) String workerName,
            @RequestParam(required = false) String workerSurname
    ) {
        return labWorkerService.searchWorker(hospitalIdNumber,workerName, workerSurname);
    }

    @GetMapping("/a/{id}")
    public List<ReportsByWorkerRes> getReportsByWorker(@PathVariable Long id) {
        return labWorkerService.ReportsByWorker(id);
    }

}
