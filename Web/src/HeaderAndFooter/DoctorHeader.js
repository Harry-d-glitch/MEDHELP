import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorHeader = ({ setLoginType }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("LoginType", null);
    localStorage.setItem("DoctorID", null);
    localStorage.setItem("DoctorHospitalID", null);
    setLoginType(null);
    navigate("/");
  };
  return (
    <react-fragment>
      <header className="header-one  header--sticky">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-wrapper-1">
                <div className="logo-area-start">
                  <a href="index.html" style={{ width: "35%" }} className="logo">
                    <img src="assets/images/logo/logo.svg" style={{ width: "40%" }} alt="logo_area" />
                  </a>
                  <div className="nav-area">
                    <ul className="">
                      <li className="main-nav">
                        <a href="/DoctorDashboard">Home</a>
                      </li>
                      <li className="main-nav">
                        <a href="/DoctorViewPatient">View Patients</a>
                      </li>
                      <li className="main-nav">
                        <a href="/DoctorProfile">Profile</a>
                      </li>
                      <li className="main-nav">
                        <a href="/PatientReport">Patient Report</a>
                      </li>
                      <li className="main-nav">
                        <a href="/Appointments">Appointments</a>
                      </li>
                      <li className="main-nav">
                        <a onClick={Logout}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </react-fragment>
  );
};

export default DoctorHeader;
