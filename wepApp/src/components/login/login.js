import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login({ setIsLoggedIn, setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('generateToken', {
        username,
        password,
      });

      const token = response.data;

      if (!token) {
        setErrorMessage('Login failed. Please check your credentials.');
      } else {
        console.log('Token:', token);

        // Token'i decode edip içindeki rol bilgisini alıyoruz
        const decodedToken = parseJwt(token);
        const role = decodedToken.roles[0]; // İlk rolü alıyoruz (genelde bir rol olur)

        // Token ve rolü localStorage'a kaydediyoruz
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        setIsLoggedIn(true);
        setRole(role); // Rolü set ediyoruz

        if (role === 'ROLE_PATIENT') {
          navigate('/patientReports'); // Patient rolü varsa patientReports sayfasına yönlendir
        } else {
          navigate('/reportList'); // Diğer roller için reportList sayfasına yönlendir
        }
      }
    } catch (error) {
      console.error('Login Error:', error); // Hata varsa console'da göster
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3 w-100" onClick={handleLogin}>
              Login
            </Button>
          </Form>
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </Col>
      </Row>
    </Container>
  );
}

// JWT'nin payload kısmını decode eden yardımcı fonksiyon
function parseJwt(token) {
  const base64Url = token.split('.')[1]; // Token'in ikinci kısmı (payload)
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  return JSON.parse(jsonPayload);
}

export default Login;
