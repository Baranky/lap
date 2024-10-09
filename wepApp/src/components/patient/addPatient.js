import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/patientAxios';
import { useNavigate, useParams } from 'react-router-dom';

function AddPatient() {
  const { id } = useParams(); // URL'den hasta ID'sini al
  const [patient, setPatient] = useState({
    patientName: '',
    patientSurname: '',
    patientTC: '', // patientNumber yerine patientTC kullanıyoruz
  });
  const [isUpdate, setIsUpdate] = useState(false); // Güncelleme işlemi olup olmadığını kontrol et
  const [errorMessage, setErrorMessage] = useState(''); // Genel hata mesajı için
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Eğer id varsa, güncelleme işlemi yapılacak
      const fetchPatient = async () => {
        try {
          const response = await axiosInstance.get(`/${id}`);
          setPatient(response.data);
          setIsUpdate(true); // Güncelleme işlemi yapılıyor
        } catch (error) {
          setErrorMessage('Error fetching patient data.');
          console.error('Error fetching patient:', error);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TC Kimlik numarası uzunluğu 11 olmalı
    if (patient.patientTC.length !== 11) {
      setErrorMessage('TC Kimlik numarası 11 karakter olmalıdır.');
      return;
    }

    try {
      if (isUpdate) {
        // Güncelleme işlemi
        await axiosInstance.put(`/${id}`, patient);
      } else {
        // Yeni hasta ekleme işlemi
        await axiosInstance.post('', patient);
      }
      setErrorMessage(''); // Eğer başarılıysa hata mesajını temizle
      navigate('/patientlist'); // İşlem bitince hasta listesine yönlendir
    } catch (error) {
      setErrorMessage('Error submitting patient. Please try again.');
      console.error('Error submitting patient:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isUpdate ? 'Update Patient' : 'Add New Patient'}</h2>

      {/* Genel hata mesajı */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            name="patientName"
            value={patient.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patientSurname" className="form-label">Patient Surname</label>
          <input
            type="text"
            className="form-control"
            id="patientSurname"
            name="patientSurname"
            value={patient.patientSurname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patientTC" className="form-label">Patient TC</label>
          <input
            type="text"
            className="form-control"
            id="patientTC"
            name="patientTC"
            value={patient.patientTC} // patientNumber yerine patientTC kullanılıyor
            onChange={handleChange}
            maxLength="11" // Kullanıcının 11'den fazla karakter girmesini engelle
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isUpdate ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
