import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ViewPatients = () => {
  const [PatientData, setPatientData] = useState("");

  const GetAllPatients = () => {
    axios.get(MyApiUrl + "ViewPatients").then((response) => {
      if (response.data.length > 0) {
        setPatientData(response.data);
      }
    });
  };

  React.useEffect(() => {
    GetAllPatients();
  }, []);

  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">View Patients</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  View Patients
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-your-consulting rts-section-gap">
        <div className="container">
          <div className="row g-0">
            <div
              className="col-lg-12"
              style={{
                borderRadius: "5px",
                alignContent: "center",
                marginTop: "5%",
              }}
            >
              <table className="table table-striped table-hover table-responsive">
                <thead className="thead-dark">
                  <tr style={{ textAlign: "center" }}>
                    <th>Sl No</th>
                    <th>Hospital Name</th>
                    <th>Patient Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Blood Group</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientData.length > 0
                    ? PatientData.map((item, index) => {
                      return (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td>{index + 1}</td>
                          <td>{item.hospital_name}</td>
                          <td>{item.patient_name}</td>
                          <td>{item.patient_email}</td>
                          <td>{item.patient_phone}</td>
                          <td>{item.patient_address}</td>
                          <td>{item.patient_blood_group}</td>
                          <td>{item.patient_age}</td>
                          <td>{item.patient_gender}</td>
                          <td>{item.patient_password}</td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </react-fragment>
  );
};

export default ViewPatients;
