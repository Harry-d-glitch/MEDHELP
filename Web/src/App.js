import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./HeaderAndFooter/Header";
import AdminHeader from "./HeaderAndFooter/AdminHeader";
import HospitalHeader from "./HeaderAndFooter/HospitalHeader";
import DoctorHeader from "./HeaderAndFooter/DoctorHeader";
import PatientHeader from "./HeaderAndFooter/PatientHeader";
import Footer from "./HeaderAndFooter/Footer";
import Home from "./components/Home";
import AdminLogin from "./Login/AdminLogin";
import HospitalLogin from "./Login/HospitalLogin";
import DoctorLogin from "./Login/DoctorLogin";
import PatientLogin from "./Login/PatientLogin";
import AdminDashboard from "./Admin/Dashboard";
import ManageHospital from "./Admin/ManageHospital";
import ViewDoctors from "./Admin/ViewDoctors";
import ViewPatients from "./Admin/ViewPatients";
import HospitalDashboard from "./Hospital/HospitalDashboard";
import ManageDoctors from "./Hospital/ManageDoctors";
import ManagePatients from "./Hospital/ManagePatients";
import DoctorDashboard from "./Doctor/DoctorDashboard";
import DoctorViewPatient from "./Doctor/ViewPatients";
import PatientDashboard from "./Patient/PatientDashboard";
import "./App.css";
import PatientReport from "./Doctor/PatientReport";
import ViewPatientReport from "./Hospital/ViewPatientReport";
import ViewMedicalReport from "./Patient/ViewMedicalReport";
import Appointments from "./Doctor/Appointments";
import ViewAppointments from "./Hospital/ViewAppointments";
import PatientViewAppointment from "./Patient/PatientViewAppointment";
import DoctorProfile from "./Doctor/DoctorProfile";
import PatientProfile from "./Patient/PatientProfile";

function App() {
  const [loginType, setLoginType] = useState(localStorage.getItem("LoginType"));

  useEffect(() => {
    const savedLoginType = localStorage.getItem("LoginType");
    setLoginType(savedLoginType);
  }, []);

  const UpdateLoginType = (type) => {
    localStorage.setItem("LoginType", type);
    setLoginType(type);
  };

  return (
    <BrowserRouter>
      {loginType === "Admin" ? (
        <AdminHeader setLoginType={UpdateLoginType} />
      ) : loginType === "Hospital" ? (
        <HospitalHeader setLoginType={UpdateLoginType} />
      ) : loginType === "Doctor" ? (
        <DoctorHeader setLoginType={UpdateLoginType} />
      ) : loginType === "Patient" ? (
        <PatientHeader setLoginType={UpdateLoginType} />
      ) : (
        <Header />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/AdminLogin"
            element={<AdminLogin setLoginType={UpdateLoginType} />}
          />
          <Route
            path="/HospitalLogin"
            element={<HospitalLogin setLoginType={UpdateLoginType} />}
          />
          <Route
            path="/DoctorLogin"
            element={<DoctorLogin setLoginType={UpdateLoginType} />}
          />
          <Route
            path="/PatientLogin"
            element={<PatientLogin setLoginType={UpdateLoginType} />}
          />

          {/* Admin Pages */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ManageHospital" element={<ManageHospital />} />
          <Route path="/ViewDoctors" element={<ViewDoctors />} />
          <Route path="/ViewPatients" element={<ViewPatients />} />

          {/* Hospital Pages */}
          <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
          <Route path="/ManageDoctors" element={<ManageDoctors />} />
          <Route path="/ManagePatients" element={<ManagePatients />} />
          <Route path="/ViewPatientReport" element={<ViewPatientReport />} />
          <Route path="/ViewAppointments" element={<ViewAppointments />} />

          {/* Doctor Pages */}
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/DoctorViewPatient" element={<DoctorViewPatient />} />
          <Route path="/PatientReport" element={<PatientReport />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/DoctorProfile" element={<DoctorProfile />} />

          {/* Patient Pages */}
          <Route path="/PatientDashboard" element={<PatientDashboard />} />
          <Route path="/ViewMedicalReport" element={<ViewMedicalReport />} />
          <Route path="/PatientViewAppointment" element={<PatientViewAppointment />} />
          <Route path="/PatientProfile" element={<PatientProfile />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
