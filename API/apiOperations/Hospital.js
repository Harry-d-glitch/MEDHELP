var pool = require("../dbconfig");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "medhelpassist@gmail.com",
      pass: "pmjeqdiespttawtb",
    },
  })
);

async function GetAllHospitalDoctors(HospitalID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `doctors` where doctor_hospital_id = '" + HospitalID + "'"
    );
    return rows;
  } catch (error) {
    console.log("GetAllDoctors-->", error);
    //
  }
}

async function AddDoctor(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into doctors(doctor_name, doctor_email, doctor_contact, doctor_designation, doctor_experience, doctor_speciality, doctor_address, doctor_password, doctor_hospital_id) values(?,?,?,?,?,?,?,?,?)",
      [
        obj.DoctorName,
        obj.DoctorEmail,
        obj.ContactNumber,
        obj.Designation,
        obj.Experience,
        obj.Speciality,
        obj.Address,
        obj.Password,
        obj.HospitalID,
      ]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddDoctor-->", error);
    //
  }
}

async function UpdateDoctor(id, obj) {
  try {
    const [rows] = await pool.execute(
      "update doctors SET doctor_name = ?, doctor_email = ?, doctor_contact = ?, doctor_designation = ?, doctor_experience = ?, doctor_speciality = ?, doctor_address = ?, doctor_password = ? WHERE doctor_pkid = ?",
      [obj.DoctorName, obj.DoctorEmail, obj.ContactNumber, obj.Designation, obj.Experience, obj.Speciality, obj.Address, obj.Password, id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdateDoctor-->", error);
    //
  }
}

async function DeleteDoctor(id) {
  try {
    const [rows] = await pool.execute(
      "DELETE FROM doctors WHERE doctor_pkid = ?",
      [id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("DeleteDoctor -->", error);
    throw error;
  }
}

async function GetAllHospitalPatients(HospitalID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `patient` where patient_hospital_fkid = '" + HospitalID + "'"
    );
    return rows;
  } catch (error) {
    console.log("GetAllHospitalPatients-->", error);
    //
  }
}

async function AddPatient(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into patient(patient_name, patient_email, patient_phone, patient_address, patient_blood_group, patient_age, patient_gender, patient_password, patient_hospital_fkid) values(?,?,?,?,?,?,?,?,?)",
      [
        obj.Name,
        obj.Email,
        obj.Phone,
        obj.Address,
        obj.BloodGroup,
        obj.Age,
        obj.Gender,
        obj.Password,
        obj.HospitalID,
      ]
    );
    var mailOptions = {
      from: "taabedar.apikit@gmail.com",
      to: obj.Email,
      subject: "Appointments",
      html: `
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a href="#" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">MedHelp</a>
        </div> 
        <p style="font-size: 1.1em">Dear ${obj.Name}, Please find the below login credentials for your account.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
          <thead>
            <tr style="background-color: #00466a; color: #ffffff; text-align: left;">
              <th colSpan="2" style="padding: 12px; border: 1px solid #ddd;text-align: center">Account Login Credentials</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Email</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.Email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Password</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.Password}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.9em;">Regards,<br />MedHelp</p>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("mail error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddPatient-->", error);
    //
  }
}

async function UpdatePatient(id, obj) {
  try {
    const [rows] = await pool.execute(
      "update patient SET patient_name = ?, patient_email = ?, patient_phone = ?, patient_address = ?, patient_blood_group = ?, patient_age = ?, patient_gender = ?, patient_password = ? WHERE patient_pkid = ?",
      [obj.Name, obj.Email, obj.Phone, obj.Address, obj.BloodGroup, obj.Age, obj.Gender, obj.Password, id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdatePatient -->", error);
  }
}

async function DeletePatient(id) {
  try {
    const [rows] = await pool.execute(
      "DELETE FROM patient WHERE patient_pkid = ?",
      [id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("DeletePatient -->", error);
    throw error;
  }
}

async function GetAllPatientReport(HospitalID) {
  try {
    let arr = [];
    const [rows] = await pool.execute(
      "SELECT * FROM `patientreport` join patient on patient_pkid = patient_id where patientreport_hospital_fkid = '" + HospitalID + "' "
    );
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        const [rows1] = await pool.execute(
          `Select * from prescription Where patientreport_fkid = '${rows[i].patientreport_pkid}'`
        )
        var obj = {
          patientreport_pkid: rows[i].patientreport_pkid,
          previous_disease: rows[i].previous_disease,
          current_disease: rows[i].current_disease,
          allergies: rows[i].allergies,
          precautions: rows[i].precautions,
          report: rows[i].report,
          patientreport_hospital_fkid: rows[i].patientreport_hospital_fkid,
          patient_id: rows[i].patient_id,
          patient_name: rows[i].patient_name,
          patient_email: rows[i].patient_email,
          patient_phone: rows[i].patient_phone,
          prescriptions: rows1
        }
        arr.push(obj);
      }
    }

    return arr;
  } catch (error) {
    console.log("GetPatientReport-->", error);
  }
}

async function AddPatientReport(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into patientreport(previous_disease, current_disease, allergies, precautions, report, patientreport_hospital_fkid, patient_id) values(?,?,?,?,?,?,?)",
      [
        obj.PreviousDisease,
        obj.CurrentDisease,
        obj.Allergies,
        obj.Precautions,
        obj.File,
        obj.HospitalID,
        obj.PatientID,
      ]
    );
    if (rows.affectedRows > 0) {
      const [rows1] = await pool.execute(
        "select max(patientreport_pkid) as pkid from patientreport"
      );
      let arr = obj.prescription;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].MedicineName === "" || arr[i].MedicineName == null) { } else {
          const [rows2] = await pool.execute(
            "insert into prescription(medicine_name, medicine_takenby, patientreport_fkid) values(?,?,?)",
            [
              arr[i].MedicineName,
              arr[i].TakenBy,
              rows1[0].pkid,
            ]
          );
        }
      }
    }
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddPatientReport-->", error);
  };
};

async function SendEmail(obj) {
  try {
    let parr = obj.prescriptions;

    let prescriptionData = '';

    for (let i = 0; i < parr.length; i++) {
      prescriptionData += `<tr>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${parr[i].medicine_name}</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${parr[i].medicine_takenby}</td>
            </tr>`;
    }

    var mailOptions = {
      from: "taabedar.apikit@gmail.com",
      to: obj.patient_email,
      subject: "Report and Prescription Details",
      html: `
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a href="#" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">MedHelp</a>
        </div> 
        <p style="font-size: 1.1em">Dear Patient, Please find the below your Report and Prescription details</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
          <thead>
            <tr style="background-color: #00466a; color: #ffffff; text-align: left;">
              <th colSpan="2" style="padding: 12px; border: 1px solid #ddd;text-align: center">Report and Prescription details.,</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Previous Disease</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.previous_disease}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Current Disease</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.current_disease}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Allergies</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.allergies}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Precautions</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.precautions}</td>
            </tr>
          </tbody>
        </table>
        <h3>Prescription Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
          <thead>
            <tr style="background-color: #00466a; color: #ffffff; text-align: left;">
              <th style="padding: 12px; border: 1px solid #ddd;text-align: center">Medicine Name</th>
              <th style="padding: 12px; border: 1px solid #ddd;text-align: center">Taken By</th>
            </tr>
          </thead>
          <tbody>
            ${prescriptionData}
          </tbody>
        </table>
        <p style="font-size: 0.9em;">Regards,<br />MedHelp</p>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("mail error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("SendEmail-->", error);
  }
}

async function GetPatientReport(HospitalID) {
  try {
    let arr = [];
    const [rows] = await pool.execute(
      "SELECT * FROM `patientreport` join patient on patient_pkid = patient_id where patient_pkid = '" + HospitalID + "' "
    );
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        const [rows1] = await pool.execute(
          `Select * from prescription Where patientreport_fkid = '${rows[i].patientreport_pkid}'`
        )
        var obj = {
          patientreport_pkid: rows[i].patientreport_pkid,
          previous_disease: rows[i].previous_disease,
          current_disease: rows[i].current_disease,
          allergies: rows[i].allergies,
          precautions: rows[i].precautions,
          report: rows[i].report,
          patientreport_hospital_fkid: rows[i].patientreport_hospital_fkid,
          patient_id: rows[i].patient_id,
          patient_name: rows[i].patient_name,
          patient_email: rows[i].patient_email,
          patient_phone: rows[i].patient_phone,
          prescriptions: rows1
        }
        arr.push(obj);
      }
    }
    return arr;
  } catch (error) {
    console.log("GetPatientReport-->", error);
  }
};

async function AddAppointments(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into appointments(patient_description, patient_title, appointment_date, appointment_time, patient_id, appointments_hospital_fkid) values(?,?,?,?,?,?)",
      [
        obj.Description,
        obj.Title,
        obj.AppointmentDate,
        obj.AppointmentTime,
        obj.PatientID,
        obj.HospitalID
      ]
    );

    const [rows1] = await pool.execute(
      "select * from patient where patient_pkid = '" + obj.PatientID + "'"
    );

    var mailOptions = {
      from: "taabedar.apikit@gmail.com",
      to: rows1[0].patient_email,
      subject: "Appointments",
      html: `
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a href="#" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">MedHelp</a>
        </div> 
        <p style="font-size: 1.1em">Dear Patient, Please find the below appointment details from the doctor.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
          <thead>
            <tr style="background-color: #00466a; color: #ffffff; text-align: left;">
              <th colSpan="2" style="padding: 12px; border: 1px solid #ddd;text-align: center">Appointment Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Appointment Date</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.AppointmentDate}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Appointment Time</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.AppointmentTime}</td>
            </tr>
             <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Title</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.Title}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Description</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${obj.Description}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.9em;">Regards,<br />MedHelp</p>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("mail error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddAppointments-->", error);
    //
  };
};

async function GetAllAppointments(HospitalID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `appointments` join patient on patient_pkid = patient_id where appointments_hospital_fkid = '" + HospitalID + "' "
    );
    return rows;
  } catch (error) {
    console.log("GetAppointments-->", error);
  }
};

async function GetAllAppointmentsByPatient(PatientID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `appointments` join patient on patient_pkid = patient_id where patient_id = '" + PatientID + "'"
    );
    return rows;
  } catch (error) {
    console.log("GetAllAppointmentsByPatient-->", error);
  }
}

async function AppointmentsByPatientEvent(PatientID) {
  try {
    var arr = [];
    const [rows] = await pool.execute(
      "SELECT * FROM `appointments` join patient on patient_pkid = patient_id where patient_id = '" + PatientID + "'"
    );
    for (let i = 0; i < rows.length; i++) {
      var obj = {
        id: rows[i].appointment_pkid,
        summary: rows[i].patient_description + " @ " + rows[i].appointment_time,
        start: {
          dateTime: `${rows[i].appointment_date}T${rows[i].appointment_time}:00`,
          timeZone: "America/New_York"
        },
        end: {
          dateTime: `${rows[i].appointment_date}T${rows[i].appointment_time}:00`,
          timeZone: "America/New_York"
        }
      }
      arr.push(obj);
    }
    return arr;
  } catch (error) {
    console.log("AppointmentsByPatientEvent-->", error);
  }
}

async function GetDoctorProfile(DoctorID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `doctors` where doctor_pkid = '" + DoctorID + "' "
    );
    return rows;
  } catch (error) {
    console.log("GetDoctorProfile-->", error);
  }
}

async function GetPatientProfile(PatientID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `patient` where patient_pkid = '" + PatientID + "' "
    );
    return rows;
  } catch (error) {
    console.log("GetPatientProfile-->", error);
  }
}

module.exports = {
  GetAllHospitalDoctors: GetAllHospitalDoctors,
  AddDoctor: AddDoctor,
  UpdateDoctor: UpdateDoctor,
  DeleteDoctor: DeleteDoctor,
  UpdatePatient: UpdatePatient,
  DeletePatient: DeletePatient,
  GetAllHospitalPatients: GetAllHospitalPatients,
  AddPatient: AddPatient,
  AddPatientReport: AddPatientReport,
  GetAllPatientReport: GetAllPatientReport,
  GetPatientReport: GetPatientReport,
  AddAppointments: AddAppointments,
  GetAllAppointments: GetAllAppointments,
  GetAllAppointmentsByPatient: GetAllAppointmentsByPatient,
  AppointmentsByPatientEvent: AppointmentsByPatientEvent,
  GetDoctorProfile: GetDoctorProfile,
  GetPatientProfile: GetPatientProfile,
  SendEmail: SendEmail
};
