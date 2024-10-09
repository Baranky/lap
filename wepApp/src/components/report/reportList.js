import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/reportAxios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için kullanılır

function Report() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // Seçilen rapor için state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Silme modalının açık/kapalı durumu
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Detay modalının açık/kapalı durumu
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get(''); // Backend'den rapor verilerini çekiyoruz
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Raporu silme işlemi
  const handleDeleteReport = async () => {
    try {
      await axiosInstance.delete(`/${selectedReport.id}`); // DELETE isteği
      setReports(reports.filter((report) => report.id !== selectedReport.id)); // Silinen raporu listeden kaldır
      setShowDeleteModal(false); // Modalı kapat
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  // Silme modalını açma
  const handleShowDeleteModal = (report) => {
    setSelectedReport(report); // Silinecek raporu belirle
    setShowDeleteModal(true); // Modalı aç
  };

  // Detay modalını açma
  const handleShowDetailsModal = (report) => {
    setSelectedReport(report); // Detayları göstermek için seçilen raporu belirle
    setShowDetailsModal(true); // Detay modalını aç
  };

  // Modalı kapatma
  const handleCloseModal = () => {
    setShowDeleteModal(false); // Silme modalını kapat
    setShowDetailsModal(false); // Detay modalını kapat
  };

  // Rapor güncelleme işlemi
  const handleUpdateReport = (id) => {
    navigate(`/addreport/${id}`); // Güncelleme için AddReport sayfasına yönlendir
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Report List</h2>
        <button className="btn btn-success" onClick={() => navigate('/addreport')}>
          Add New Report
        </button>
      </div>

      {reports.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Diagnosis Title</th>
              <th>Date Reported</th>
              <th>Worker Id</th>
              <th>Patient Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.diagnosisTitle}</td>
                <td>{report.dateReported}</td>
                <td>{report.workerId}</td>
                <td>{report.patientId}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => handleShowDetailsModal(report)} // Detay modalını açma
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdateReport(report.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(report)} // Silme modalını açma
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports found.</p>
      )}

      {/* Silme Onayı Modalı */}
      {selectedReport && (
        <Modal show={showDeleteModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             "{selectedReport.diagnosisTitle}" Raporunu silmek istediğinizden emin misiniz? 
             bu işlem geri alınamaz.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteReport}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Detay Modalı (Sadece Diagnosis Details, uzun metin kaydırılabilir hale getirildi) */}
      {selectedReport && (
        <Modal show={showDetailsModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Report Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Kaydırılabilir alan */}
            <p>
              <strong>Diagnosis Details:</strong>
            </p>
            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {selectedReport.diagnosisDetails}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Report;
