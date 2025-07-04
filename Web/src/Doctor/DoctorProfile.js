import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const DoctorProfile = () => {
    const [DoctorData, setDoctorData] = useState([]);

    let DoctorID = localStorage.getItem("DoctorID");

    const GetDoctorProfile = () => {
        axios.get(MyApiUrl + "DoctorProfile/" + DoctorID).then((response) => {
            if (response.data.length > 0) {
                setDoctorData(response.data);
            }
        });
    };

    React.useEffect(() => {
        GetDoctorProfile();
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
                                <h2 className="title mb--40" style={{ textAlign: "center" }}>Doctor Profile</h2>
                                <div className="row">
                                    {DoctorData.length > 0 ? (
                                        DoctorData.map((doctor, index) => (
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
                                                                alt={`${doctor.doctor_name} Profile`}
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    borderRadius: "50%",
                                                                    marginBottom: "15px",
                                                                }}
                                                            />
                                                            <h3>{doctor.doctor_name}</h3>
                                                            <p>Email: {doctor.doctor_email}</p>
                                                            <p>Contact: {doctor.doctor_contact}</p>
                                                            <p>Designation: {doctor.doctor_designation}</p>
                                                            <p>Experience: {doctor.doctor_experience} years</p>
                                                            <p>Speciality: {doctor.doctor_speciality}</p>
                                                            <p>Address: {doctor.doctor_address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3"></div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Doctor Profile Found</p>
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

export default DoctorProfile;
