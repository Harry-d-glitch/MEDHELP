import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const Appointments = () => {

    let HospitalID = localStorage.getItem("DoctorHospitalID");

    const [PatientOption, setPatientOption] = useState([]);
    const [PatientOption2, setPatientOption2] = useState([]);
    const [PatientID, setPatientID] = useState("-");
    const [PatientName, setPatientName] = useState("");
    const [PatientEmail, setPatientEmail] = useState("");
    const [PatientPhone, setPatientPhone] = useState("");
    const [Description, setDescription] = useState("");
    const [Title, setTitle] = useState("");
    const [AppointmentDate, setAppointmentDate] = useState("");
    const [AppointmentTime, setAppointmentTime] = useState("");
    const [AppointmentData, setAppointmentData] = useState("");

    const GetAllPatients = () => {
        axios.get(MyApiUrl + "Patients/" + HospitalID + "").then((response) => {
            const PatientOption = response.data.map((item) => (
                <option value={item.patient_pkid}>{item.patient_name}</option>
            ));
            setPatientOption(PatientOption);
            setPatientOption2(response.data);
        });
    };

    const GetPatientDetails = (event) => {
        let SelectedPatient = parseInt(event.target.value);
        setPatientID(SelectedPatient)

        const patient = PatientOption2.find((item) => item.patient_pkid === SelectedPatient);
        if (patient) {
            setPatientName(patient.patient_name);
            setPatientEmail(patient.patient_email);
            setPatientPhone(patient.patient_phone);
        }
    };

    const AddAppointment = () => {
        if (PatientID === "-") {
            alert("Please select Patient");
        } else if (Description === "" || Description === null) {
            alert("Please enter Previous Disease");
        } else if (Title === "" || Title === null) {
            alert("Please enter Current Disease");
        } else if (AppointmentDate === "" || AppointmentDate === null) {
            alert("Please enter AppointmentDate");
        } else if (AppointmentTime === "" || AppointmentTime === null) {
            alert("Please enter AppointmentTime")
        } else {
            let obj = {
                PatientID: PatientID,
                Description: Description,
                Title: Title,
                AppointmentDate: AppointmentDate,
                AppointmentTime: AppointmentTime,
                HospitalID: HospitalID,
            };
            axios.post(MyApiUrl + "Appointments", obj).then((response) => {
                if (response.data === false) {
                    alert(
                        "Failed to Add, Please try again....!"
                    );
                } else {
                    alert("Patient Appointment added Successfully.");
                    setPatientID("");
                    setPatientName("");
                    setPatientEmail("");
                    setPatientPhone("");
                    setDescription("");
                    setTitle("");
                    setAppointmentDate("");
                    setAppointmentTime("");
                    GetAllPatients();
                    GetAllAppointments();
                }
            });
        }
    };

    const GetAllAppointments = () => {
        axios.get(MyApiUrl + "Appointments/" + HospitalID + "").then((response) => {
            console.log(response.data);
            setAppointmentData(response.data);
        });
    }

    React.useEffect(() => {
        GetAllPatients();
        GetAllAppointments();
    }, []);

    return (
        <react-fragment>
            <div className="rts-breadcrumb-area bg_image rts-section-gap">
                <div className="container ptb--40">
                    <div className="row">
                        <div className="breadcrumb-area-wrapper">
                            <h1 className="title">Appointments</h1>
                            <div className="nav-bread-crumb">
                                <a href="/">Home</a>
                                <i className="fa-solid fa-chevron-right"></i>
                                <a href="#" className="current">
                                    Appointments
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
                                <h2 className="title mb--40">Appointments</h2>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <select value={PatientID} className="nice-select" onChange={GetPatientDetails} style={{ width: "100%" }}>
                                                    <option value="-">Select Patient</option>
                                                    {PatientOption}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <input
                                                    type="text"
                                                    id="DoctorName"
                                                    placeholder="Patient Name"
                                                    value={PatientName}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <input
                                                    type="text"
                                                    id="DoctorEmail"
                                                    placeholder="Patient Email"
                                                    value={PatientEmail}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <input
                                                    type="text"
                                                    id="ContactNumber"
                                                    placeholder="Contact Number"
                                                    value={PatientPhone}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <textarea
                                                    rows="5" cols="10"
                                                    placeholder="Description"
                                                    value={Description}
                                                    onChange={(event) => {
                                                        setDescription(event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <textarea
                                                    rows="5" cols="10"
                                                    placeholder="Title"
                                                    value={Title}
                                                    onChange={(event) => {
                                                        setTitle(event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ marginTop: "20px" }}>
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <label style={{ color: "#fff" }}>Select Date:</label>
                                                <input
                                                    type="date"
                                                    id="appointmentDate"
                                                    value={AppointmentDate}
                                                    onChange={(event) => setAppointmentDate(event.target.value)}
                                                    style={{ width: "100%", padding: "8px", marginTop: "10px" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ marginTop: "20px" }}>
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <label style={{ color: "#fff" }}>Select Time:</label>
                                                <input
                                                    type="time"
                                                    id="appointmentTime"
                                                    value={AppointmentTime}
                                                    onChange={(event) => setAppointmentTime(event.target.value)}
                                                    style={{ width: "100%", padding: "8px", marginTop: "10px" }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <a class="rts-btn btn-primary" style={{ float: "right", cursor: "pointer" }} onClick={AddAppointment}>
                                        Submit{" "}
                                    </a>
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
                                        <th>Description</th>
                                        <th>Title</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AppointmentData.length > 0
                                        ? AppointmentData.map((item, index) => {
                                            return (
                                                <tr key={index} style={{ textAlign: "center" }}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patient_name}</td>
                                                    <td>{item.patient_email}</td>
                                                    <td>{item.patient_phone}</td>
                                                    <td>{item.patient_description}</td>
                                                    <td>{item.patient_title}</td>
                                                    <td>{item.appointment_date}</td>
                                                    <td>{item.appointment_time}</td>
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

export default Appointments;
