import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ViewDoctors = () => {
  const [DoctorData, setDoctorData] = useState("");

  const GetAllDoctors = () => {
    axios.get(MyApiUrl + "ViewDoctors").then((response) => {
      if (response.data.length > 0) {
        setDoctorData(response.data);
      }
    });
  };

  React.useEffect(() => {
    GetAllDoctors();
  }, []);

  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">View Doctor</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  View Doctor
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
                    <th>Doctor Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Designation</th>
                    <th>Experience</th>
                    <th>Speciality</th>
                    <th>Address</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {DoctorData.length > 0
                    ? DoctorData.map((item, index) => {
                      return (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td>{index + 1}</td>
                          <td>{item.hospital_name}</td>
                          <td>{item.doctor_name}</td>
                          <td>{item.doctor_email}</td>
                          <td>{item.doctor_contact}</td>
                          <td>{item.doctor_designation}</td>
                          <td>{item.doctor_experience}</td>
                          <td>{item.doctor_speciality}</td>
                          <td>{item.doctor_address}</td>
                          <td>{item.doctor_password}</td>
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

export default ViewDoctors;
