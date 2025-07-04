var pool = require("../dbconfig");

async function getAdminLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `admin` WHERE admin_name = ? AND admin_password = ?",
      [obj.UserName, obj.Password]
    );
    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("getAdminLogin-->", error);
    //
  }
}

async function HospitalLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `hospital` WHERE hospital_email = ? AND hospital_password = ?",
      [obj.Email, obj.Password]
    );

    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("HospitalLogin-->", error);
    //
  }
}

async function DoctorLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `doctors` WHERE doctor_email = ? AND doctor_password = ?",
      [obj.Email, obj.Password]
    );

    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("DoctorLogin-->", error);
    //
  }
}

async function PatientLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `patient` WHERE patient_email = ? AND patient_password = ?",
      [obj.Email, obj.Password]
    );

    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("PatientLogin-->", error);
    //
  }
}

module.exports = {
  getAdminLogin: getAdminLogin,
  HospitalLogin: HospitalLogin,
  DoctorLogin: DoctorLogin,
  PatientLogin: PatientLogin,
};
