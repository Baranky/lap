import React, { useState } from 'react';
import axiosInstance from '../axios/reportAxios';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';

function PatientReportList() {
  const [patientTC, setPatientTC] = useState('');
  const [reports, setReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetchReports = async () => {
    try {
      const response = await axiosInstance.get(`/r/${patientTC}`);
      setReports(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('No reports found for this TC or an error occurred.');
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Patient Reports</h2>
      <Form className="mt-4">
        <Row className="align-items-center">
          <Col md={8}>
            <Form.Group controlId="patientTC">
              <Form.Label>Enter Your TC Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="TC Number"
                value={patientTC}
                onChange={(e) => setPatientTC(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button className="mt-3" onClick={handleFetchReports}>
              Fetch Reports
            </Button>
          </Col>
        </Row>
      </Form>
      
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      
      {reports.length > 0 && (
        <div className="mt-5">
          <h4>Reports</h4>
          <Table className="table" striped bordered hover>
            <thead>
              <tr>
                <th>Diagnosis Title</th>
                <th>Diagnosis Details</th>
                <th>Date Reported</th>
                <th>Worker ID</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.diagnosisTitle}</td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', maxWidth: '200px' }}>
                    {report.diagnosisDetails}
                  </td>
                  <td>{report.dateReported}</td>
                  <td>{report.workerId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default PatientReportList;
