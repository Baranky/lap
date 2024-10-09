package com.example.laboratory.services;

import com.example.laboratory.dto.Requests.LabWorkerReq;
import com.example.laboratory.dto.Responses.LabWorkerRes;
import com.example.laboratory.dto.Responses.PatientRes;
import com.example.laboratory.dto.Responses.ReportsByWorkerRes;
import com.example.laboratory.entity.LabWorker;
import com.example.laboratory.entity.Report;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LabWorkerService {
    List<LabWorkerRes> getAllLabWorker();
    LabWorkerRes createLabWorker(LabWorkerReq request) ;
    void deleteLabWorker(Long workerId);
    LabWorkerRes getLabWorkerId(Long workerId);
    LabWorkerRes updateLabWorker(Long id, LabWorkerReq labWorkerReq) throws Exception;
    List<LabWorkerRes> searchWorker(Long id,String name, String surname);
    LabWorker getById(Long id);
    List<ReportsByWorkerRes> ReportsByWorker(Long workerId);
}
