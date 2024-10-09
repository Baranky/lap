import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Report from './components/report/reportList';
import AddReport from './components/report/addReport';
import WorkerList from './components/worker/workerList'; 
import AddWorker from './components/worker/addWorker'; 
import PatientList from './components/patient/patientList'; 
import AddPatient from './components/patient/addPatient'; 
import PatientReportList from './components/patient/patientReportList'; // Hasta raporları bileşeni
import NavigationBar from './components/navbar/navbar'; // Navbar bileşeni

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Token'dan rolü çözümleme
      setRole(decodedToken.roles[0]); // İlk rolü alıyoruz
    }
  }, []);

  return (
    <div>
      <Router>
        {/* Navbar her zaman gösterilir, ama giriş yapıldığında menüler de görünür */}
        <NavigationBar setIsLoggedIn={setIsLoggedIn} />

        {/* Sayfalar */}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route path="/reportList" element={isLoggedIn && role !== 'ROLE_PATIENT' ? <Report /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route path="/addReport/:id?" element={isLoggedIn && role !== 'ROLE_PATIENT' ? <AddReport /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />

            {/* Yalnızca ROLE_ADMIN olan kullanıcılar için */}
            <Route
              path="/workerList"
              element={
                isLoggedIn && role === 'ROLE_ADMIN' ? <WorkerList /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
              }
            />
            <Route
              path="/addWorker/:id?"
              element={
                isLoggedIn && role === 'ROLE_ADMIN' ? <AddWorker /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
              }
            />

            {/* iki rolde erişebilir */}
            <Route
              path="/patientList"
              element={isLoggedIn && role !== 'ROLE_PATIENT' ? <PatientList /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
            />
            <Route
              path="/addPatient/:id?"
              element={isLoggedIn && role !== 'ROLE_PATIENT' ? <AddPatient /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
            />
            
            {/* Yalnızca ROLE_PATIENT olan kullanıcılar için */}
            <Route
              path="/patientReports"
              element={isLoggedIn && role === 'ROLE_PATIENT' ? <PatientReportList /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
            />

            {/* Diğer sayfalara gitmeye çalışırsa login sayfasına yönlendirme */}
            <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
