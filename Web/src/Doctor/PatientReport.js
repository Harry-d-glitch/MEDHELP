import React, { useState, } from "react";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";

const PatientReport = () => {

    let HospitalID = localStorage.getItem("DoctorHospitalID");

    const fileInputRef = React.useRef(null);

    const [PatientOption, setPatientOption] = useState([]);
    const [PatientOption2, setPatientOption2] = useState([]);
    const [PatientID, setPatientID] = useState("-");
    const [PatientName, setPatientName] = useState("");
    const [PatientEmail, setPatientEmail] = useState("");
    const [PatientPhone, setPatientPhone] = useState("");
    const [PreviousDisease, setPreviousDisease] = useState("");
    const [CurrentDisease, setCurrentDisease] = useState("");
    const [Allergies, setAllergies] = useState("");
    const [Precautions, setPrecautions] = useState("");
    const [File, setFile] = useState("");
    const [PatientReportData, setPatientReportData] = useState("")
    const [DynamicRowCount, setDynamicRowCount] = useState([{ MedicineName: "", TakenBy: "" }]);

    const [ViewPrescriptionTable, setViewPrescriptionTable] = useState(false);
    const [ViewPrescriptionData, setViewPrescriptionData] = useState([]);

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

    const AddReport = () => {
        console.log(DynamicRowCount)
        if (PatientID === "-") {
            alert("Please select Patient");
        } else if (PreviousDisease === "" || PreviousDisease === null) {
            alert("Please enter Previous Disease");
        } else if (CurrentDisease === "" || CurrentDisease === null) {
            alert("Please enter Current Disease");
        } else if (Allergies === "" || Allergies === null) {
            alert("Please enter allergies");
        } else if (Precautions === "" || Precautions === null) {
            alert("Please enter Precautions")
        } else if (File === "" || File === null) {
            alert("Please select the file")
        } else {
            let obj = {
                PatientID: PatientID,
                PreviousDisease: PreviousDisease,
                CurrentDisease: CurrentDisease,
                Allergies: Allergies,
                Precautions: Precautions,
                File: File,
                HospitalID: HospitalID,
                prescription: DynamicRowCount,
            };
            axios.post(MyApiUrl + "Report", obj).then((response) => {
                if (response.data === false) {
                    alert(
                        "Failed to Add, Please try again....!"
                    );
                } else {
                    alert("Patient Report added Successfully.");
                    setPatientID("-");
                    setPatientName("");
                    setPatientEmail("");
                    setPatientPhone("");
                    setPreviousDisease("");
                    setCurrentDisease("");
                    setAllergies("");
                    setPrecautions("");
                    setFile("");
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    setDynamicRowCount([{ MedicineName: "", TakenBy: "" }]);
                    GetAllPatients();
                    GetAllPatientReport();
                }
            });
        }
    };

    const GetAllPatientReport = () => {
        axios.get(MyApiUrl + "Report/" + HospitalID + "").then((response) => {
            console.log(response.data);
            setPatientReportData(response.data);
        });
    };

    const AddMedicine = () => {
        const newRow = { MedicineName: "", TakenBy: "" };
        setDynamicRowCount([...DynamicRowCount, newRow]);
    }

    const handleInputChange = (index, field, value) => {
        const updatedRows = DynamicRowCount.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setDynamicRowCount(updatedRows);
    };

    const DeleteMedicine = (index) => {
        const updatedRows = DynamicRowCount.filter((_, idx) => idx !== index);
        setDynamicRowCount(updatedRows);
    };

    const ViewPrescriptions = (arr) => {
        setViewPrescriptionTable(true);
        setViewPrescriptionData(arr);
    };

    const SendEmail = (obj) => {
        axios.post(MyApiUrl + "SendMail", obj).then((response) => {
            alert("Patient report and prescription details are send to patient email address");
        });
    }

    React.useEffect(() => {
        GetAllPatients();
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
            <div className="book-your-consulting rts-section-gap">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-12">
                            <div className="appoinment-area-main appoinment-page bg_image">
                                <h2 className="title mb--40">Report Details</h2>
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
                                                    placeholder="Previous disease"
                                                    value={PreviousDisease}
                                                    onChange={(event) => {
                                                        setPreviousDisease(event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <textarea
                                                    rows="5" cols="10"
                                                    placeholder="Current diseases"
                                                    value={CurrentDisease}
                                                    onChange={(event) => {
                                                        setCurrentDisease(event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ marginTop: "20px" }}>
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <textarea
                                                    rows="5" cols="10"
                                                    placeholder="Allergies"
                                                    value={Allergies}
                                                    onChange={(event) => {
                                                        setAllergies(event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ marginTop: "20px" }}>
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <textarea cols="5" rows="10" placeholder="Precautions"
                                                    value={Precautions}
                                                    onChange={(event) => {
                                                        setPrecautions(event.target.value)
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="col-md-3" style={{ marginTop: "20px" }}>
                                            <div className="input-half-wrapper datepicker-wrapper">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ padding: "12px 0px 0px 12px" }}
                                                    onChange={(event) => {
                                                        var formData = new FormData();
                                                        formData.append(
                                                            "file",
                                                            event.target.files[0]
                                                        );
                                                        axios.post(MyApiUrl + "upload", formData).then((response) => {
                                                            setFile(response.data);
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <h5 className="title mb--40" style={{ marginTop: "2%" }}>Prescriptions</h5>
                                        {DynamicRowCount.map((item, index) => (
                                            <div className="row" style={{ marginBottom: "2%" }} key={index}>
                                                <div className="col-md-3" style={{ marginTop: "-2%" }}>
                                                    <div className="input-half-wrapper datepicker-wrapper">
                                                        <input
                                                            type="text"
                                                            id={`MedicineName-${index}`}
                                                            placeholder="Medicine Name"
                                                            value={item.MedicineName}
                                                            onChange={(event) => handleInputChange(index, "MedicineName", event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3" style={{ marginTop: "-2%" }}>
                                                    <div className="input-half-wrapper datepicker-wrapper">
                                                        <input
                                                            type="text"
                                                            id={`TakenBy-${index}`}
                                                            placeholder="0, 0, 0"
                                                            value={item.TakenBy}
                                                            onChange={(event) => handleInputChange(index, "TakenBy", event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3" style={{ marginTop: "-2%" }}>
                                                    <div className="input-half-wrapper datepicker-wrapper">
                                                        {index === DynamicRowCount.length - 1 ? (
                                                            <a
                                                                className="rts-btn btn-primary"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={AddMedicine}
                                                            >
                                                                Add
                                                            </a>
                                                        ) : (
                                                            <a
                                                                className="rts-btn btn-primary"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => DeleteMedicine(index)}
                                                            >
                                                                Delete
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <a class="rts-btn btn-primary" style={{ float: "right", cursor: "pointer" }} onClick={AddReport}>
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
                                        <th>Previous Disease</th>
                                        <th>Current Disease</th>
                                        <th>Allergies</th>
                                        <th>Precautions</th>
                                        <th>Action</th>
                                        <th>Prescription</th>
                                        <th>Mail</th>
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
                                                    <td><button className="btn btn-primary" ><a href={ViewImg + item.report} target="_blank">View</a></button></td>
                                                    <td><button className="btn btn-primary" onClick={() => { ViewPrescriptions(item.prescriptions) }}>View</button></td>
                                                    <td><button className="btn btn-primary" onClick={() => { SendEmail(item) }}>Send Mail</button></td>
                                                </tr>
                                            );
                                        })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                        {
                            ViewPrescriptionTable ? <div
                                className="col-lg-12"
                                style={{
                                    borderRadius: "5px",
                                    alignContent: "center",
                                    marginTop: "5%",
                                }}
                            >
                                <h3>View Prescriptions</h3>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead className="thead-dark">
                                        <tr style={{ textAlign: "center" }}>
                                            <th>Sl No</th>
                                            <th>Medicine Name</th>
                                            <th>taken By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ViewPrescriptionData.length > 0
                                            ? ViewPrescriptionData.map((item, index) => {
                                                return (
                                                    <tr key={index} style={{ textAlign: "center" }}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.medicine_name}</td>
                                                        <td>{item.medicine_takenby}</td>
                                                    </tr>
                                                );
                                            })
                                            : <td colSpan="3" style={{ textAlign: "center" }}><p>Prescriptions Not Available</p></td>}
                                    </tbody>
                                </table>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </react-fragment>
    );
};

export default PatientReport;
