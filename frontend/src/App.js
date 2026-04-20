import React, { useState, useEffect } from 'react';
import api from './api'; // Ensure you created the api.js file in src/

function HealthcareManagementPortal() {
  const [patientName, setPatientName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Load Initial Data
  useEffect(() => {
    const init = async () => {
      try {
        const docRes = await api.get('/appointments/doctors/');
        setDoctors(docRes.data);
        
        const token = localStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);
          setCurrentPatient({ name: localStorage.getItem('userName') });
          fetchAppointments();
        }
      } catch (err) {
        console.error("Initial load failed", err);
      }
    };
    init();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments/book/');
      if (Array.isArray(res.data)) setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  // 🔐 Sign In Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/token/', { 
        username: patientName, 
        password: password 
      });

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('userName', patientName);
        
        setIsLoggedIn(true);
        setCurrentPatient({ name: patientName });
        setPatientName('');
        setPassword('');
        fetchAppointments();
        setMessage({ text: 'Logged in successfully!', type: 'success' });
      }
    } catch (err) {
      setMessage({ text: 'Invalid credentials. Please try again.', type: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentPatient(null);
    setAppointments([]);
  };

  // 📝 Create Appointment Logic
  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/appointments/book/', { 
        patient_name: currentPatient.name, 
        doctor: selectedDoctor,
        appointment_date: appointmentDate 
      });
      
      if (response.status === 201 || response.status === 200) {
        setMessage({ text: 'Appointment Scheduled!', type: 'success' });
        setAppointmentDate('');
        fetchAppointments();
      }
    } catch (err) {
      setMessage({ text: 'Failed to book appointment.', type: 'error' });
    }
  };

  const cancelAppointment = async (id) => {
    if (window.confirm("Cancel this appointment?")) {
      try {
        await api.delete(`/appointments/book/${id}/`);
        setMessage({ text: 'Cancelled successfully.', type: 'success' });
        fetchAppointments();
      } catch (err) {
        setMessage({ text: 'Cancellation failed.', type: 'error' });
      }
    }
  };

  // UI RENDER
  return (
    <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      {!isLoggedIn ? (
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', width: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#003366' }}>Healthcare Portal Login</h2>
          {message.text && <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input placeholder="Username" value={patientName} onChange={(e) => setPatientName(e.target.value)} style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
            <button type="submit" style={{ backgroundColor: '#003366', color: 'white', padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>SIGN IN</button>
          </form>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', width: '90%', maxWidth: '1000px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#003366' }}>Welcome, {currentPatient?.name}! <button onClick={handleLogout} style={{ float: 'right', padding: '8px 15px', cursor: 'pointer', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '4px' }}>Logout</button></h2>
          
          {message.text && <p style={{ color: message.type === 'success' ? 'green' : 'red', fontWeight: 'bold' }}>{message.text}</p>}

          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', marginBottom: '20px', borderRadius: '4px' }}>
            <h3>Schedule New Appointment</h3>
            <form onSubmit={bookAppointment} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} style={{ flex: '1', padding: '10px' }} required>
                <option value="">Select Doctor</option>
                {doctors.map(doc => <option key={doc.id} value={doc.id}>Dr. {doc.name} ({doc.specialization})</option>)}
              </select>
              <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} style={{ flex: '1', padding: '10px' }} required />
              <button type="submit" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Confirm Booking</button>
            </form>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h3>Your Scheduled Appointments</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#003366', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Doctor</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date & Time</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app, index) => {
                  const doctor = doctors.find(d => d.id === parseInt(app.doctor));
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px' }}>{doctor ? `Dr. ${doctor.name}` : `ID: ${app.doctor}`}</td>
                      <td style={{ padding: '12px' }}>{new Date(app.appointment_date).toLocaleString()}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button onClick={() => cancelAppointment(app.id)} style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}>Cancel</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthcareManagementPortal;