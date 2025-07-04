import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ManagePatients = () => {
  const [PatientData, setPatientData] = useState("");
  const [PatientID, setPatientID] = useState(null);
  const [DisplayUpdateBtn, setDisplayUpdateBtn] = useState(false);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Password, setPassword] = useState("");

  let HospitalID = localStorage.getItem("HospitalID");

  const GetAllPatients = () => {
    axios.get(MyApiUrl + "Patients/" + HospitalID + "").then((response) => {
      if (response.data.length > 0) {
        setPatientData(response.data);
      }
    });
  };

  const AddPatient = () => {
    if (Name === "" || Name == null) {
      alert("Please Enter Patient Name");
    } else if (Email === "" || Email == null) {
      alert("Please Enter Patient Email");
    } else if (Phone === "" || Phone == null) {
      alert("Please Enter Contact Number");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (BloodGroup === "" || BloodGroup == null) {
      alert("Please Enter BloodGroup");
    } else if (Age === "" || Age == null) {
      alert("Please Enter Age");
    } else if (Gender === "" || Gender == null) {
      alert("Please Enter Gender");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address,
        BloodGroup: BloodGroup,
        Age: Age,
        Gender: Gender,
        Password: Password,
        HospitalID: HospitalID,
      };
      axios.post(MyApiUrl + "Patients", obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Add, Please try again with different email and password...!"
          );
        } else {
          alert("Patient Details added sucessfully.");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setBloodGroup("");
          setAge("");
          setGender("");
          setPassword("");
          GetAllPatients();
        }
      });
    }
  };

  const UpdatePatient = () => {
    if (Name === "" || Name == null) {
      alert("Please Enter Patient Name");
    } else if (Email === "" || Email == null) {
      alert("Please Enter Patient Email");
    } else if (Phone === "" || Phone == null) {
      alert("Please Enter Contact Number");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (BloodGroup === "" || BloodGroup == null) {
      alert("Please Enter BloodGroup");
    } else if (Age === "" || Age == null) {
      alert("Please Enter Age");
    } else if (Gender === "" || Gender == null) {
      alert("Please Enter Gender");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address,
        BloodGroup: BloodGroup,
        Age: Age,
        Gender: Gender,
        Password: Password,
        HospitalID: HospitalID,
      };
      axios.put(MyApiUrl + "/Patient/" + PatientID + "", obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Update, Please try again with different email and password...!"
          );
        } else {
          alert("Patient Details Updated sucessfully.");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setBloodGroup("");
          setAge("");
          setGender("");
          setPassword("");
          GetAllPatients();
          setDisplayUpdateBtn(false)
        }
      });
    }
  };

  const EditPatient = (id) => {
    const patient = PatientData.find((item) => item.patient_pkid === id);
    if (patient) {
      setPatientID(id);
      setName(patient.patient_name);
      setEmail(patient.patient_email);
      setPhone(patient.patient_phone);
      setAddress(patient.patient_address);
      setBloodGroup(patient.patient_blood_group);
      setAge(patient.patient_age);
      setGender(patient.patient_gender);
      setPassword(patient.patient_password);
      setDisplayUpdateBtn(true);
    }
  }

  const DeletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this Patienr")) {
      axios.delete(MyApiUrl + `Patient/${id}`).then((response) => {
        if (response.data) {
          alert("Patient Deleted Successfully.");
          GetAllPatients();
        } else {
          alert("Failed to delete Patient.")
        }
      });
    }
  }

  React.useEffect(() => {
    GetAllPatients();
  }, []);

  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">Manage Patients</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  Manage Patients
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-your-consulting rts-section-gap">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-12">
              <div className="appoinment-area-main appoinment-page bg_image">
                <h2 className="title mb--40">Patient Details</h2>
                <form action="#">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="DoctorName"
                          placeholder="Patient Name"
                          value={Name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="DoctorEmail"
                          placeholder="Patient Email"
                          value={Email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="ContactNumber"
                          placeholder="Contact Number"
                          value={Phone}
                          onChange={(event) => {
                            setPhone(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Designation"
                          placeholder="Patient Address"
                          value={Address}
                          onChange={(event) => {
                            setAddress(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Experience"
                          placeholder="Patient Blood Group"
                          value={BloodGroup}
                          onChange={(event) => {
                            setBloodGroup(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Address"
                          placeholder="Patient Age"
                          value={Age}
                          onChange={(event) => {
                            setAge(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Address"
                          placeholder="Patient Gender"
                          value={Gender}
                          onChange={(event) => {
                            setGender(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="password"
                          id="password"
                          placeholder="**** Password ****"
                          value={Password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {DisplayUpdateBtn ? (
                    <a style={{ cursor: "pointer" }} class="rts-btn btn-primary" onClick={UpdatePatient}>
                      Update{" "}
                      <img
                        src="assets/images/banner/icons/arrow--up-right.svg"
                        alt=""
                      />
                    </a>
                  ) : (
                    <a style={{ cursor: "pointer" }} class="rts-btn btn-primary" onClick={AddPatient}>
                      Add{" "}
                      <img
                        src="assets/images/banner/icons/arrow--up-right.svg"
                        alt=""
                      />
                    </a>
                  )}
                </form>
              </div>
            </div>
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
                    <th>Patient Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Blood Group</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientData.length > 0
                    ? PatientData.map((item, index) => {
                      return (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td>{index + 1}</td>
                          <td>{item.patient_name}</td>
                          <td>{item.patient_email}</td>
                          <td>{item.patient_phone}</td>
                          <td>{item.patient_address}</td>
                          <td>{item.patient_blood_group}</td>
                          <td>{item.patient_age}</td>
                          <td>{item.patient_gender}</td>
                          <td>{item.patient_password}</td>
                          <td><button className="btn btn-warning" onClick={() => EditPatient(item.patient_pkid)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => DeletePatient(item.patient_pkid)}>Delete</button>
                          </td>
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

export default ManagePatients;
