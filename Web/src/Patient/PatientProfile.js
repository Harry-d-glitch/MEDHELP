import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const PatientProfile = () => {
    const [PatientData, setPatientData] = useState([]);

    let PatientID = localStorage.getItem("PatientID");

    const GetPatientProfile = () => {
        axios.get(MyApiUrl + "PatientProfile/" + PatientID).then((response) => {
            if (response.data.length > 0) {
                setPatientData(response.data);
            }
        });
    };

    React.useEffect(() => {
        GetPatientProfile();
    }, []);

    return (
        <react-fragment>
            <div className="rts-breadcrumb-area bg_image rts-section-gap">
                <div className="container ptb--40">
                    <div className="row">
                        <div className="breadcrumb-area-wrapper">
                            <h1 className="title">Patient Profile</h1>
                            <div className="nav-bread-crumb">
                                <a href="/">Home</a>
                                <i className="fa-solid fa-chevron-right"></i>
                                <a href="#" className="current">
                                    Patient Profile
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
                                <h2 className="title mb--40" style={{ textAlign: "center" }}>Patient Profile</h2>
                                <div className="row">
                                    {PatientData.length > 0 ? (
                                        PatientData.map((patient, index) => (
                                            <div className="row">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-6">
                                                    <div key={index}>
                                                        <div
                                                            className="profile-card"
                                                            style={{
                                                                border: "1px solid #dbdbdb",
                                                                borderRadius: "10px",
                                                                padding: "20px",
                                                                margin: "10px",
                                                                textAlign: "center",
                                                                backgroundColor: "#fff",
                                                                justifyItems: "center"
                                                            }}
                                                        >
                                                            <img
                                                                src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                                                                alt={`${patient.patient_name} Profile`}
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    borderRadius: "50%",
                                                                    marginBottom: "15px",
                                                                }}
                                                            />
                                                            <h3>{patient.patient_name}</h3>
                                                            <p>Email: {patient.patient_email}</p>
                                                            <p>Contact: {patient.patient_phone}</p>
                                                            <p>Address: {patient.patient_address}</p>
                                                            <p>Blood Group: {patient.patient_blood_group} years</p>
                                                            <p>Age: {patient.patient_age}</p>
                                                            <p>Gender: {patient.patient_gender}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3"></div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Patient Profile Found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </react-fragment>
    );
};

export default PatientProfile;
