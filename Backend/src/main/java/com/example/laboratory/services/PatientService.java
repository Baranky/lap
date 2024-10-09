package com.example.laboratory.services;

import com.example.laboratory.dto.Requests.PatientReq;
import com.example.laboratory.dto.Responses.PatientRes;
import com.example.laboratory.dto.Responses.ReportRes;
import com.example.laboratory.dto.Responses.ReportsByPatientRes;
import com.example.laboratory.entity.Patient;
import com.example.laboratory.entity.Report;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PatientService {
    List<PatientRes> getAllPatient();
    PatientRes createPatient(PatientReq request) ;
    void deletePatient(Long PatientId);
    PatientRes getPatientId(Long PatientId);
    PatientRes updatePatient(Long id, PatientReq PatientReq) throws Exception;
    Patient getById(Long id);
    List<PatientRes> searchPatient(Long tc,String name, String surname);
    List<ReportsByPatientRes> findReportsByPatientId(Long patientId);
}
