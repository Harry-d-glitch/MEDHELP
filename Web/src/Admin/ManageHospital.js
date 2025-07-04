import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ManageHospital = () => {
  const [HospitalData, setHospitalData] = useState("");
  const [HospitalID, setHospitalID] = useState(null);
  const [DisplayUpdateBtn, setDisplayUpdateBtn] = useState(false);


  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");

  const GetAllHospitals = () => {
    axios.get(MyApiUrl + "Hospital").then((response) => {
      if (response.data.length > 0) {
        setHospitalData(response.data);
      }
    });
  };

  const AddHospital = () => {
    if (Name === "" || Name == null) {
      alert("Please Enter Hospital Name");
    } else if (Email === "" || Email == null) {
      alert("Please Enter Hospital Email");
    } else if (Phone === "" || Phone == null) {
      alert("Please Enter Contact Number");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address,
        Password: Password,
      };
      axios.post(MyApiUrl + "Hospital", obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Add, Please try again with different email and password...!"
          );
        } else {
          alert("Hospital details added successfully.");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setPassword("");
          GetAllHospitals();
        }
      });
    }
  };

  const UpdateHospital = () => {
    if (Name === "" || Name == null) {
      alert("Please Enter Hospital Name");
    } else if (Email === "" || Email == null) {
      alert("Please Enter Hospital Email");
    } else if (Phone === "" || Phone == null) {
      alert("Please Enter Contact Number");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address,
        Password: Password,
      };
      axios.put(MyApiUrl + "Hospital/" + HospitalID, obj).then((response) => {
        if (response.data === false) {
          alert(
            "Failed To Update, Please try again with different email and password...!"
          );
        } else {
          alert("Hospital details Updated successfully.");
          GetAllHospitals();
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setPassword("");
          setDisplayUpdateBtn(false);
        }
      });
    }
  };

  const EditHospital = (id) => {
    const hospital = HospitalData.find((item) => item.hospital_pkid === id);
    if (hospital) {
      setHospitalID(id);
      setName(hospital.hospital_name);
      setEmail(hospital.hospital_email);
      setPhone(hospital.hospital_phone);
      setAddress(hospital.hospital_address);
      setPassword(hospital.hospital_password);
      setDisplayUpdateBtn(true);
    }
  };

  const DeleteHospital = (id) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      axios.delete(MyApiUrl + `Hospital/${id}`).then((response) => {
        if (response.data) {
          alert("Hospital deleted successfully.");
          GetAllHospitals();
        } else {
          alert("Failed to delete hospital.");
        }
      });
    }
  };


  React.useEffect(() => {
    GetAllHospitals();
  }, []);

  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">Manage Hospital</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  Manage Hospital
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
                <h2 className="title mb--40">Hospital Details</h2>
                <form action="#">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="DoctorName"
                          placeholder="Hospital Name"
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
                          placeholder="Hospital Email"
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
                          id="Address"
                          placeholder="Hospital Address"
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
                    <a style={{ cursor: "pointer" }} className="rts-btn btn-primary" onClick={UpdateHospital}>
                      Update{" "}
                      <img
                        src="assets/images/banner/icons/arrow--up-right.svg"
                        alt=""
                      />
                    </a>
                  ) : (
                    <a style={{ cursor: "pointer" }} className="rts-btn btn-primary" onClick={AddHospital}>
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
                    <th>Hospital Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {HospitalData.length > 0
                    ? HospitalData.map((item, index) => {
                      return (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td>{index + 1}</td>
                          <td>{item.hospital_name}</td>
                          <td>{item.hospital_email}</td>
                          <td>{item.hospital_phone}</td>
                          <td>{item.hospital_address}</td>
                          <td>{item.hospital_password}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => EditHospital(item.hospital_pkid)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => DeleteHospital(item.hospital_pkid)}
                            >
                              Delete
                            </button>
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
    </react-fragment >
  );
};

export default ManageHospital;
