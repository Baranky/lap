import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/reportAxios';
import { useNavigate, useParams } from 'react-router-dom'; // Parametreleri almak için useParams kullanıyoruz

function AddReport() {
  const { id } = useParams(); // URL'den rapor ID'sini al
  const [report, setReport] = useState({
    diagnosisTitle: '',
    diagnosisDetails: '',
    workerId: '',
    patientId: '',
  });
  const [isUpdate, setIsUpdate] = useState(false); // Güncelleme işlemi olup olmadığını kontrol et
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  useEffect(() => {
    if (id) {
      // Eğer id varsa, güncelleme işlemi yapılacak
      const fetchReport = async () => {
        try {
          const response = await axiosInstance.get(`/${id}`);
          setReport(response.data);
          setIsUpdate(true); // Güncelleme işlemi yapılıyor
        } catch (error) {
          setErrorMessage('Error fetching report data.');
          console.error('Error fetching report:', error);
        }
      };
      fetchReport();
    }
  }, [id]);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        // Güncelleme işlemi
        await axiosInstance.put(`/${id}`, report);
      } else {
        // Yeni rapor ekleme işlemi
        await axiosInstance.post('', report);
      }
      navigate('/reportList'); // İşlem bitince raporlar listesine yönlendir
    } catch (error) {
      setErrorMessage('Error submitting report. Please try again.');
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isUpdate ? 'Update Report' : 'Add New Report'}</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="diagnosisTitle" className="form-label">Diagnosis Title</label>
          <input
            type="text"
            className="form-control"
            id="diagnosisTitle"
            name="diagnosisTitle"
            value={report.diagnosisTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="diagnosisDetails" className="form-label">Diagnosis Details</label>
          <textarea
            className="form-control"
            id="diagnosisDetails"
            name="diagnosisDetails"
            value={report.diagnosisDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workerId" className="form-label">Worker Id</label>
          <input
            type="number"
            className="form-control"
            id="workerId"
            name="workerId"
            value={report.workerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">Patient Id</label>
          <input
            type="number"
            className="form-control"
            id="patientId"
            name="patientId"
            value={report.patientId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isUpdate ? 'Update Report' : 'Add Report'}
        </button>
      </form>
    </div>
  );
}

export default AddReport;
