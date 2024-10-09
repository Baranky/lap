package com.example.laboratory.services.Impl;

import com.example.laboratory.dto.Requests.LabWorkerReq;
import com.example.laboratory.dto.Responses.LabWorkerRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.dto.Responses.ReportsByWorkerRes;
import com.example.laboratory.entity.LabWorker;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import com.example.laboratory.repository.LabWorkerRepository;
import com.example.laboratory.services.LabWorkerService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabWorkerServiceImpl  implements LabWorkerService {
    private LabWorkerRepository labWorkerRepository;

    public LabWorkerServiceImpl(LabWorkerRepository labWorkerRepository) {
        this.labWorkerRepository = labWorkerRepository;
    }

    @Override
    public List<LabWorkerRes> getAllLabWorker() {
        List<LabWorker> labWorkerList=labWorkerRepository.findAll();
        List<LabWorkerRes> responseList=new ArrayList<>();
        for(LabWorker worker:labWorkerList){
            responseList.add(mapToResponse(worker));
        }
        return responseList;
    }

    @Override
    public LabWorkerRes createLabWorker(LabWorkerReq request) {
        LabWorker labWorker=mapToLabWorker(request);
        LabWorker newLabWorker=labWorkerRepository.save(labWorker);
        return mapToResponse(newLabWorker);
    }

    @Override
    public void deleteLabWorker(Long workerId) {
        labWorkerRepository.deleteById(workerId);

    }

    @Override
    public LabWorkerRes getLabWorkerId(Long workerId) {
        LabWorker labWorker=labWorkerRepository.getReferenceById(workerId);
        LabWorkerRes labWorkerRes=mapToResponse(labWorker);
        return labWorkerRes;
    }

    @Override
    public LabWorkerRes updateLabWorker(Long id, LabWorkerReq labWorkerReq) throws Exception {
        LabWorker existingLabWorker = labWorkerRepository.findById(id).orElseThrow(() ->
                new Exception("worker not found with id: " + id));
        // Mevcut hasta nesnesini mapToWorker kullanarak güncelleme
        LabWorker updateLabWorker = mapToLabWorker(labWorkerReq);
        updateLabWorker.setId(existingLabWorker.getId()); // Mevcut ID'yi koruyoruz
        LabWorker savedEmployee = labWorkerRepository.save(updateLabWorker);
        return mapToResponse(savedEmployee);
    }

    @Override
    public List<LabWorkerRes> searchWorker(Long id,String name, String surname) {
        List<LabWorker> labWorker= labWorkerRepository.searchByNameAndSurname(id ,name, surname);
        return labWorker.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public LabWorker getById(Long id) {
        return labWorkerRepository.getReferenceById(id);
    }

    @Override
    public List<ReportsByWorkerRes> ReportsByWorker(Long workerId) {
        List<Report> report= labWorkerRepository.ReportsByWorker(workerId);
        return report.stream().map(this::mapToReportResponse).collect(Collectors.toList());
    }

    private ReportsByWorkerRes mapToReportResponse(Report report){
        ReportsByWorkerRes response =new ReportsByWorkerRes(
                report.getId(),
                report.getDiagnosisTitle(),
                report.getDiagnosisDetails(),
                report.getDateReported(),
                report.getPatient().getId()
        );
        return response;
    }

    private LabWorkerRes mapToResponse(LabWorker labWorker){
        LabWorkerRes response=new LabWorkerRes(
                labWorker.getId(),
                labWorker.getHospitalIdNumber(),
                labWorker.getWorkerName(),
                labWorker.getWorkerSurname()
        );
        return response;
    }

    private LabWorker mapToLabWorker(LabWorkerReq request){
        LabWorker labWorker=new LabWorker();
        labWorker.setHospitalIdNumber(request.hospitalIdNumber());
        labWorker.setWorkerName(request.workerName());
        labWorker.setWorkerSurname(request.workerSurname());

        return labWorker;
    }
}
