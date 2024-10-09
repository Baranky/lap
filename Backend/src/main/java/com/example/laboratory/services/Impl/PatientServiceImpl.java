package com.example.laboratory.services.Impl;

import com.example.laboratory.dto.Requests.PatientReq;
import com.example.laboratory.dto.Responses.PatientRes;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import com.example.laboratory.repository.PatientRepository;
import com.example.laboratory.services.PatientService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {
    private PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public List<PatientRes> getAllPatient() {
        List<Patient> patientList=patientRepository.findAll();
        List<PatientRes> responseList=new ArrayList<>();
        for(Patient patient:patientList){
            responseList.add(mapToResponse(patient));
        }
        return responseList;
    }

    @Override
    public PatientRes createPatient(PatientReq request) {
        Patient patient=mapToPatient(request);
        Patient newPatient=patientRepository.save(patient);
        return mapToResponse(newPatient);
    }

    @Override
    public void deletePatient(Long patientId) {
    patientRepository.deleteById(patientId);
    }

    @Override
    public PatientRes getPatientId(Long patientId) {
        Patient patient=patientRepository.getReferenceById(patientId);
        PatientRes patientRes=mapToResponse(patient);
        return patientRes;
    }

    @Override
    public PatientRes updatePatient(Long id, PatientReq patientReq) throws Exception {
        Patient existingPatient = patientRepository.findById(id).orElseThrow(() ->
                new Exception("patient not found with id: " + id));
        // Mevcut hasta nesnesini mapToPatient kullanarak güncelleme
        Patient updatedPatient = mapToPatient(patientReq);
        updatedPatient.setId(existingPatient.getId()); // Mevcut ID'yi koruyoruz
        Patient savedEmployee = patientRepository.save(updatedPatient);
        return mapToResponse(savedEmployee);
    }

    @Override
    public Patient getById(Long id) {
       return patientRepository.getReferenceById(id);
    }

    @Override
    public List<PatientRes> searchPatient(Long TC,String name, String surname) {
            List<Patient> patient= patientRepository.searchByNameAndSurname(TC,name, surname);
            return patient.stream().map(this::mapToResponse).collect(Collectors.toList());

    }

    //bir hastanın raporları
    @Override
    public List<ReportsByPatientRes> findReportsByPatientId(Long patientId) {
        List<Report> report= patientRepository.findReportsByPatientId(patientId);
        return report.stream().map(this::mapToReportResponse).collect(Collectors.toList());
    }


    private PatientRes mapToResponse(Patient patient){
        PatientRes response=new PatientRes(
                patient.getId(),
                patient.getPatientName(),
                patient.getPatientSurname(),
                patient.getPatientTC()
        );
        return response;
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
    private Patient mapToPatient(PatientReq request){
        Patient patient=new Patient();
        patient.setPatientName(request.patientName());
        patient.setPatientSurname(request.patientSurname());
        patient.setPatientTC(request.patientTC());

        return patient;
    }

}
