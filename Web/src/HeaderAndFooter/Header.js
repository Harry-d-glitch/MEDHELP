import React from "react";

const Header = () => {
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
                        <a href="/">Home</a>
                      </li>
                      <li className="main-nav">
                        <a href="/AdminLogin">Admin Login</a>
                      </li>
                      <li className="main-nav">
                        <a href="/HospitalLogin">Hospital Login</a>
                      </li>
                      <li className="main-nav">
                        <a href="/DoctorLogin">Doctor Login</a>
                      </li>
                      <li className="main-nav">
                        <a href="/PatientLogin">Patient Login</a>
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

export default Header;
