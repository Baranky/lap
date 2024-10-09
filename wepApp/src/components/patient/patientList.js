import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/patientAxios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; // Bootstrap Modal ve Form kullanımı

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // Seçilen hasta için state
  const [showModal, setShowModal] = useState(false); // Silme modalının açık/kapalı durumu
  const [showReportsModal, setShowReportsModal] = useState(false); // Raporları gösteren modal için state
  const [reports, setReports] = useState([]); // Hastanın raporları
  const [selectedReport, setSelectedReport] = useState(null); // Seçilen raporun detaylarını göstermek için state
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false); // Rapor detayları modalı için state
  const [searchParams, setSearchParams] = useState({ patientTC: '', patientName: '', patientSurname: '' }); // Arama parametreleri
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  useEffect(() => {
    fetchPatients(); // İlk yüklemede tüm hastaları getir
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          patientTC: searchParams.patientTC || null,
          patientName: searchParams.patientName || null,
          patientSurname: searchParams.patientSurname || null,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Arama formundaki input değişikliklerini işleme
  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  // Arama butonuna basıldığında hastaları filtreleme
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatients(); // Hastaları arama kriterlerine göre getir
  };

  // Hastayı silme işlemi
  const handleDeletePatient = async () => {
    try {
      await axiosInstance.delete(`/${selectedPatient.id}`); // DELETE isteği
      setPatients(patients.filter((patient) => patient.id !== selectedPatient.id)); // Silinen hastayı listeden kaldır
      setShowModal(false); // Modalı kapat
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Raporları getirme işlemi
  const handleShowReports = async (patient) => {
    try {
      const response = await axiosInstance.get(`/a/${patient.id}`); // Hastanın raporlarını getir
      setReports(response.data); // Raporları state'e kaydet
      setSelectedPatient(patient);
      setShowReportsModal(true); // Raporlar modalını aç
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Raporun detaylarını göstermek için modal açma
  const handleShowReportDetails = (report) => {
    setSelectedReport(report);
    setShowReportDetailsModal(true); // Detay modalını aç
  };

  // Silme modalını açma
  const handleShowDeleteModal = (patient) => {
    setSelectedPatient(patient); // Silinecek hastayı belirle
    setShowModal(true); // Modalı aç
  };

  // Modalı kapatma
  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapat
  };

  // Raporlar modalını kapatma
  const handleCloseReportsModal = () => {
    setShowReportsModal(false); // Raporlar modalını kapat
  };

  // Rapor detay modalını kapatma
  const handleCloseReportDetailsModal = () => {
    setShowReportDetailsModal(false); // Detay modalını kapat
  };

  // Hasta güncelleme işlemi
  const handleUpdatePatient = (id) => {
    navigate(`/addpatient/${id}`); // Güncelleme için AddPatient sayfasına yönlendir
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Patient List</h2>
        <button className="btn btn-success" onClick={() => navigate('/addpatient')}>
          Add Patient
        </button>
      </div>

      {/* Arama Formu */}
      <Form className="mt-4" onSubmit={handleSearch}>
        <div className="row">
          <div className="col-md-3">
            <Form.Group controlId="patientTC">
              <Form.Label>Patient TC</Form.Label>
              <Form.Control
                type="number"
                name="patientTC"
                value={searchParams.patientTC}
                onChange={handleInputChange}
                min={10000000000} // TC numarası için minimum değer
                max={99999999999} // TC numarası için maksimum değer
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="patientName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={searchParams.patientName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="patientSurname">
              <Form.Label>Patient Surname</Form.Label>
              <Form.Control
                type="text"
                name="patientSurname"
                value={searchParams.patientSurname}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3 align-self-end">
            <Button type="submit" className="btn btn-primary">
              Search
            </Button>
          </div>
        </div>
      </Form>

      {patients.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Patient Name</th>
              <th>Patient Surname</th>
              <th>Patient TC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.patientName}</td>
                <td>{patient.patientSurname}</td>
                <td>{patient.patientTC}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdatePatient(patient.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleShowReports(patient)}
                  >
                    Reports
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(patient)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p>
      )}

      {/* Silme Onayı Modalı */}
      {selectedPatient && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            "{selectedPatient.patientName} {selectedPatient.patientSurname}" adlı hastayı silmek istediğinizden emin misiniz? 
            Bu işlem geri alınamaz.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeletePatient}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Hastanın Raporlarını Gösteren Modal */}
      {selectedPatient && (
        <Modal show={showReportsModal} onHide={handleCloseReportsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reports for {selectedPatient.patientName} {selectedPatient.patientSurname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reports.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Diagnosis Title</th>
                    <th>Date Reported</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.diagnosisTitle}</td>
                      <td>{report.dateReported}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleShowReportDetails(report)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reports found for this patient.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Seçilen Raporun Detaylarını Gösteren Modal */}
      {selectedReport && (
        <Modal show={showReportDetailsModal} onHide={handleCloseReportDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Report Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Diagnosis Title:</strong> {selectedReport.diagnosisTitle}</p>
            <p><strong>Diagnosis Details:</strong> {selectedReport.diagnosisDetails}</p>
            <p><strong>Date Reported:</strong> {selectedReport.dateReported}</p>
            <p><strong>Worker ID:</strong> {selectedReport.workerId}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportDetailsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default PatientList;
