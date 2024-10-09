import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/workerAxios';
import { useNavigate, useParams } from 'react-router-dom'; // Parametre almak için

function AddWorker() {
  const { id } = useParams(); // URL'den id'yi al
  const [worker, setWorker] = useState({
    workerName: '',
    workerSurname: '',
    hospitalIdNumber: '', // Yeni alanı ekledik
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı için
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Eğer id varsa, güncelleme işlemi yapılacak
      const fetchWorker = async () => {
        try {
          const response = await axiosInstance.get(`/${id}`);
          setWorker(response.data);
          setIsUpdate(true); // Güncelleme işlemi yapılıyor
        } catch (error) {
          console.error('Error fetching worker data:', error);
        }
      };
      fetchWorker();
    }
  }, [id]);

  const handleChange = (e) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hospital ID Number 7 karakter olmalı
    if (worker.hospitalIdNumber.length !== 7) {
      setErrorMessage('Hospital ID Number 7 karakter olmalıdır.');
      return;
    }

    try {
      if (isUpdate) {
        // Güncelleme işlemi
        await axiosInstance.put(`/${id}`, worker);
      } else {
        // Yeni çalışan ekleme işlemi
        await axiosInstance.post('', worker);
      }
      setErrorMessage(''); // Hata mesajını temizle
      navigate('/workerlist'); // İşlem bitince çalışanlar listesine yönlendir
    } catch (error) {
      console.error('Error submitting worker:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isUpdate ? 'Update Worker' : 'Add New Worker'}</h2>

      {/* Genel hata mesajı */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="workerName" className="form-label">Worker Name</label>
          <input
            type="text"
            className="form-control"
            id="workerName"
            name="workerName"
            value={worker.workerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workerSurname" className="form-label">Worker Surname</label>
          <input
            type="text"
            className="form-control"
            id="workerSurname"
            name="workerSurname"
            value={worker.workerSurname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hospitalIdNumber" className="form-label">Hospital ID Number</label>
          <input
            type="text"
            className="form-control"
            id="hospitalIdNumber"
            name="hospitalIdNumber"
            value={worker.hospitalIdNumber} // Yeni alanın değerini formdan alıyoruz
            onChange={handleChange}
            maxLength="7" // Kullanıcı 7 karakterden fazlasını giremesin
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isUpdate ? 'Update Worker' : 'Add Worker'}
        </button>
      </form>
    </div>
  );
}

export default AddWorker;
