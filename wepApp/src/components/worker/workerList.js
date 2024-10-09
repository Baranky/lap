import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/workerAxios';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import { Modal, Button, Form } from 'react-bootstrap'; // Bootstrap Modal ve Form kullanımı

function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null); // Seçilen çalışan için state
  const [showModal, setShowModal] = useState(false); // Silme modalının açık/kapalı durumu
  const [showReportsModal, setShowReportsModal] = useState(false); // Raporları gösteren modal için state
  const [reports, setReports] = useState([]); // Çalışanın yazdığı raporlar
  const [searchParams, setSearchParams] = useState({ workerName: '', workerSurname: '', hospitalIdNumber: '' }); // Arama parametreleri
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  useEffect(() => {
    fetchWorkers(); // İlk yüklemede tüm çalışanları getir
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          hospitalIdNumber: searchParams.hospitalIdNumber || null,
          workerName: searchParams.workerName || null,
          workerSurname: searchParams.workerSurname || null
        }
      });
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  // Arama formundaki input değişikliklerini işleme
  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  // Arama butonuna basıldığında çalışanları filtreleme
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers(); // Çalışanları arama kriterlerine göre getir
  };

  // Çalışanı silme işlemi
  const handleDeleteWorker = async () => {
    try {
      await axiosInstance.delete(`/${selectedWorker.id}`); // DELETE isteği
      setWorkers(workers.filter((worker) => worker.id !== selectedWorker.id)); // Silinen çalışanı listeden kaldır
      setShowModal(false); // Modalı kapat
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
  };

  // Raporları getirme işlemi
  const handleShowReports = async (worker) => {
    try {
      const response = await axiosInstance.get(`/a/${worker.id}`); // Çalışanın yazdığı raporları getir
      setReports(response.data); // Raporları state'e kaydet
      setSelectedWorker(worker);
      setShowReportsModal(true); // Raporlar modalını aç
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Silme modalını açma
  const handleShowDeleteModal = (worker) => {
    setSelectedWorker(worker); // Silinecek çalışanı belirle
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

  // Çalışanı güncelleme işlemi
  const handleUpdateWorker = (id) => {
    navigate(`/addworker/${id}`); // Güncelleme için AddWorker sayfasına yönlendir
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Worker List</h2>
        <button className="btn btn-success" onClick={() => navigate('/addworker')}>
          Add Worker
        </button>
      </div>

      {/* Arama Formu */}
      <Form className="mt-4" onSubmit={handleSearch}>
        <div className="row align-items-end">
          <div className="col-md-3">
            <Form.Group controlId="workerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="workerName"
                value={searchParams.workerName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="workerSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="workerSurname"
                value={searchParams.workerSurname}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="hospitalIdNumber">
              <Form.Label>Hospital ID</Form.Label>
              <Form.Control
                type="text"
                name="hospitalIdNumber"
                value={searchParams.hospitalIdNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Button type="submit" className="btn btn-primary">
              Search
            </Button>
          </div>
        </div>
      </Form>

      {workers.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Worker Name</th>
              <th>Worker Surname</th>
              <th>Hospital ID Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.workerName}</td>
                <td>{worker.workerSurname}</td>
                <td>{worker.hospitalIdNumber}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdateWorker(worker.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleShowReports(worker)}
                  >
                    Reports
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(worker)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workers found.</p>
      )}

      {/* Silme Onayı Modalı */}
      {selectedWorker && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          "{selectedWorker.workerName} {selectedWorker.workerSurname}" adlı çalışanı silmek istediğinizden emin misiniz? 
             Bu işlem geri alınamaz.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteWorker}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Çalışanın yazdığı raporları gösteren modal */}
      {selectedWorker && (
        <Modal show={showReportsModal} onHide={handleCloseReportsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reports by {selectedWorker.workerName} {selectedWorker.workerSurname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reports.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Diagnosis Title</th>
                    <th>Date Reported</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.diagnosisTitle}</td>
                      <td>{report.dateReported}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reports found for this worker.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default WorkerList;
