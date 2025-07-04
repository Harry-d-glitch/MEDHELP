import React from "react";
import { useNavigate } from "react-router-dom";

const HospitalHeader = ({ setLoginType }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("LoginType", null);
    localStorage.setItem("HospitalID", null);
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
                  <a href="index.html" style={{ width: "29%" }} className="logo">
                    <img src="assets/images/logo/logo.svg" style={{ width: "40%" }} alt="logo_area" />
                  </a>
                  <div className="nav-area">
                    <ul className="">
                      <li className="main-nav">
                        <a href="/HospitalDashboard">Home</a>
                      </li>
                      <li className="main-nav">
                        <a href="/ManageDoctors">Manage Doctor</a>
                      </li>
                      <li className="main-nav">
                        <a href="/ManagePatients">Manage Patients</a>
                      </li>
                      <li className="main-nav">
                        <a href="/ViewAppointments">Appointments</a>
                      </li>
                      <li className="main-nav">
                        <a href="/ViewPatientReport">Patient Report</a>
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

export default HospitalHeader;
