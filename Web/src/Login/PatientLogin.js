import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";
import { useNavigate } from "react-router-dom";

const PatientLogin = ({ setLoginType }) => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const Login = () => {
    if (Email === "" || Email == null) {
      alert("Please Enter Email");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        Email: Email,
        Password: Password,
      };
      axios.post(MyApiUrl + "PatientLogin", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Login, Please Enter Valid Credentials...!");
        } else {
          localStorage.setItem("LoginType", "Patient");
          localStorage.setItem("PatientID", response.data[0].patient_pkid);
          localStorage.setItem(
            "PatientHospitalID",
            response.data[0].patient_hospital_fkid
          );
          setLoginType("Patient");
          navigate("/PatientDashboard");
        }
      });
    }
  };
  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">Patient Login</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  Patient Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-your-consulting rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="appoinment-area-main appoinment-page bg_image">
                    <h2 className="title mb--40">Login Here</h2>
                    <form action="#">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="text"
                          placeholder="Email"
                          value={Email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </div>
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="Password"
                          id="password"
                          placeholder="Password"
                          value={Password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>
                      <a style={{cursor:"pointer"}} onClick={Login} class="rts-btn btn-primary">
                        Login{" "}
                        <img
                          src="assets/images/banner/icons/arrow--up-right.svg"
                          alt=""
                        />
                      </a>
                    </form>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  style={{
                    border: "1px solid #dbdbdb",
                    borderRadius: "5px",
                    alignContent: "center",
                  }}
                >
                  <h4 style={{ textAlign: "center" }}>
                    Please login here with a valid login credentials.
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </react-fragment>
  );
};

export default PatientLogin;
