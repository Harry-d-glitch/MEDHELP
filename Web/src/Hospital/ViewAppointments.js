import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ViewAppointments = () => {

    let HospitalID = localStorage.getItem("HospitalID");

    const [AppointmentData, setAppointmentData] = useState("");

    const GetAllAppointments = () => {
        axios.get(MyApiUrl + "Appointments/" + HospitalID + "").then((response) => {
            console.log(response.data);
            setAppointmentData(response.data);
        });
    }

    React.useEffect(() => {
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
            <div
                className="col-lg-12"
                style={{
                    borderRadius: "5px",
                    alignContent: "center",
                    marginTop: "5%",
                    marginBottom: "5%",
                    padding: "0 5% 0 5%"
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
        </react-fragment >
    );
};

export default ViewAppointments;
