import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";

const ViewPatientReport = () => {

    let HospitalID = localStorage.getItem("HospitalID");

    const [PatientReportData, setPatientReportData] = useState("")

    const GetAllPatientReport = () => {
        axios.get(MyApiUrl + "Report/" + HospitalID + "").then((response) => {
            console.log(response.data);
            setPatientReportData(response.data);
        });
    }

    React.useEffect(() => {
        GetAllPatientReport();
    }, []);

    return (
        <react-fragment>
            <div className="rts-breadcrumb-area bg_image rts-section-gap">
                <div className="container ptb--40">
                    <div className="row">
                        <div className="breadcrumb-area-wrapper">
                            <h1 className="title">Patients Report</h1>
                            <div className="nav-bread-crumb">
                                <a href="/">Home</a>
                                <i className="fa-solid fa-chevron-right"></i>
                                <a href="#" className="current">
                                    Patients Report
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
                        <tr style={{ textAlign: 'center' }}>
                            <th>Sl No</th>
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Previous Disease</th>
                            <th>Current Disease</th>
                            <th>Allergies</th>
                            <th>Precautions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PatientReportData.length > 0
                            ? PatientReportData.map((item, index) => {
                                return (
                                    <tr key={index} style={{ textAlign: "center" }}>
                                        <td>{index + 1}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.patient_email}</td>
                                        <td>{item.patient_phone}</td>
                                        <td>{item.previous_disease}</td>
                                        <td>{item.current_disease}</td>
                                        <td>{item.allergies}</td>
                                        <td>{item.precautions}</td>
                                        <td><button className="btn btn-primary"><a href={ViewImg + item.report} target="_blank">View</a></button></td>
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

export default ViewPatientReport;
