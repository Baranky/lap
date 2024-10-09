import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">Lab Automation</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* ROLE_PATIENT için sadece Reports linki */}
              {role === 'ROLE_PATIENT' && (
                <li className="nav-item mx-4">
                  <a className="nav-link text-white" href="/patientReportList">Reports</a>
                </li>
              )}

              {/* ROLE_ADMIN ve ROLE_WORKER için menüler */}
              {(role === 'ROLE_ADMIN' || role === 'ROLE_WORKER') && (
                <>
                  <li className="nav-item mx-4">
                    <a className="nav-link text-white" href="/reportList">Reports</a>
                  </li>
                  <li className="nav-item mx-4">
                    <a className="nav-link text-white" href="/patientList">Patients</a>
                  </li>
                </>
              )}

              {/* ROLE_ADMIN için ek olarak Workers linki */}
              {role === 'ROLE_ADMIN' && (
                <li className="nav-item mx-4">
                  <a className="nav-link text-white" href="/workerList">Workers</a>
                </li>
              )}
            </ul>

            {/* Logout button */}
            <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
