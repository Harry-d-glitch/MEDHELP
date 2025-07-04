import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ManageDoctor = () => {
  const [DoctorData, setDoctorData] = useState("");
  const [DoctorID, setDoctorID] = useState(null);
  const [DisplayUpdateBtn, setDisplayUpdateBtn] = useState(false);

  const [DoctorName, setDoctorName] = useState("");
  const [DoctorEmail, setDoctorEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Designation, setDesignation] = useState("");
  const [Experience, setExperience] = useState("");
  const [Speciality, setSpeciality] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");

  let HospitalID = localStorage.getItem("HospitalID");

  const GetAllDoctors = () => {
    axios.get(MyApiUrl + "Doctor/" + HospitalID + "").then((response) => {
      if (response.data.length > 0) {
        setDoctorData(response.data);
      }
    });
  };

  const AddDoctor = () => {
    if (DoctorName === "" || DoctorName == null) {
      alert("Please Enter Doctor Name");
    } else if (DoctorEmail === "" || DoctorEmail == null) {
      alert("Please Enter Doctor Email");
    } else if (ContactNumber === "" || ContactNumber == null) {
      alert("Please Enter Contact Number");
    } else if (Designation === "" || Designation == null) {
      alert("Please Enter Designation");
    } else if (Experience === "" || Experience == null) {
      alert("Please Enter Experience");
    } else if (Speciality === "" || Speciality == null) {
      alert("Please Enter Speciality");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        DoctorName: DoctorName,
        DoctorEmail: DoctorEmail,
        ContactNumber: ContactNumber,
        Designation: Designation,
        Experience: Experience,
        Speciality: Speciality,
        Address: Address,
        Password: Password,
        HospitalID: HospitalID,
      };
      axios.post(MyApiUrl + "Doctor", obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Add, Please try again with different email and password...!"
          );
        } else {
          alert("Doctor Details added sucessfully.");
          setDoctorName("");
          setDoctorEmail("");
          setContactNumber("");
          setDesignation("");
          setExperience("");
          setSpeciality("");
          setAddress("");
          setPassword("");
          GetAllDoctors();
        }
      });
    }
  };

  const UpdateDoctor = () => {
    if (DoctorName === "" || DoctorName == null) {
      alert("Please Enter Doctor Name");
    } else if (DoctorEmail === "" || DoctorEmail == null) {
      alert("Please Enter Doctor Email");
    } else if (ContactNumber === "" || ContactNumber == null) {
      alert("Please Enter Contact Number");
    } else if (Designation === "" || Designation == null) {
      alert("Please Enter Designation");
    } else if (Experience === "" || Experience == null) {
      alert("Please Enter Experience");
    } else if (Speciality === "" || Speciality == null) {
      alert("Please Enter Speciality");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        DoctorName: DoctorName,
        DoctorEmail: DoctorEmail,
        ContactNumber: ContactNumber,
        Designation: Designation,
        Experience: Experience,
        Speciality: Speciality,
        Address: Address,
        Password: Password,
        HospitalID: HospitalID,
      };
      axios.put(MyApiUrl + "/Doctor/" + DoctorID + "", obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Update, Please try again with different email and password...!"
          );
        } else {
          alert("Doctor Details Updated sucessfully.");
          setDoctorName("");
          setDoctorEmail("");
          setContactNumber("");
          setDesignation("");
          setExperience("");
          setSpeciality("");
          setAddress("");
          setPassword("");
          GetAllDoctors();
          setDisplayUpdateBtn(false);
        }
      });
    }
  };

  const EditDoctor = (id) => {
    const doctor = DoctorData.find((item) => item.doctor_pkid === id);
    if (doctor) {
      setDoctorID(id);
      setDoctorName(doctor.doctor_name);
      setDoctorEmail(doctor.doctor_email);
      setContactNumber(doctor.doctor_contact);
      setDesignation(doctor.doctor_designation);
      setExperience(doctor.doctor_experience);
      setSpeciality(doctor.doctor_speciality);
      setAddress(doctor.doctor_address);
      setPassword(doctor.doctor_password);
      setDisplayUpdateBtn(true);
    }
  };

  const DeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this Doctor?")) {
      axios.delete(MyApiUrl + `Doctor/${id}`).then((response) => {
        if (response.data) {
          alert("Doctor deleted successfully.");
          GetAllDoctors();
        } else {
          alert("Failed to delete doctor.");
        }
      });
    }
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
              <h1 className="title">Manage Doctor</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  Manage Doctor
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
                <h2 className="title mb--40">Doctor Details</h2>
                <form action="#">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="DoctorName"
                          placeholder="Doctor Name"
                          value={DoctorName}
                          onChange={(event) => {
                            setDoctorName(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="DoctorEmail"
                          placeholder="Doctor Email"
                          value={DoctorEmail}
                          onChange={(event) => {
                            setDoctorEmail(event.target.value);
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
                          value={ContactNumber}
                          onChange={(event) => {
                            setContactNumber(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Designation"
                          placeholder="Doctor Designation"
                          value={Designation}
                          onChange={(event) => {
                            setDesignation(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Experience"
                          placeholder="Doctor Experience"
                          value={Experience}
                          onChange={(event) => {
                            setExperience(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Speciality"
                          placeholder="Doctor Speciality"
                          value={Speciality}
                          onChange={(event) => {
                            setSpeciality(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="Address"
                          placeholder="Doctor Address"
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
                    <a style={{ cursor: "pointer" }} class="rts-btn btn-primary" onClick={UpdateDoctor}>
                      Update{" "}
                      <img
                        src="assets/images/banner/icons/arrow--up-right.svg"
                        alt=""
                      />
                    </a>
                  ) : (
                    <a style={{ cursor: "pointer" }} class="rts-btn btn-primary" onClick={AddDoctor}>
                      ADD{" "}
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
                    <th>Doctor Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Designation</th>
                    <th>Experience</th>
                    <th>Speciality</th>
                    <th>Address</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {DoctorData.length > 0
                    ? DoctorData.map((item, index) => {
                      return (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td>{index + 1}</td>
                          <td>{item.doctor_name}</td>
                          <td>{item.doctor_email}</td>
                          <td>{item.doctor_contact}</td>
                          <td>{item.doctor_designation}</td>
                          <td>{item.doctor_experience}</td>
                          <td>{item.doctor_speciality}</td>
                          <td>{item.doctor_address}</td>
                          <td>{item.doctor_password}</td>
                          <td><button className="btn btn-warning" onClick={() => EditDoctor(item.doctor_pkid)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => DeleteDoctor(item.doctor_pkid)}>Delete</button></td>
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

export default ManageDoctor;
