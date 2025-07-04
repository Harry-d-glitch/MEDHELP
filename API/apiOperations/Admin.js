var pool = require("../dbconfig");

async function GetAllHospital() {
  try {
    const [rows] = await pool.execute("SELECT * FROM `hospital`");
    return rows;
  } catch (error) {
    console.log("GetAllHospital-->", error);
    //
  }
};

async function AddHospital(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into hospital(hospital_name, hospital_email, hospital_phone, hospital_address, hospital_password) values(?,?,?,?,?)",
      [obj.Name, obj.Email, obj.Phone, obj.Address, obj.Password]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddHospital-->", error);
    //
  }
};

async function UpdateHospital(id, obj) {
  try {
    const [rows] = await pool.execute(
      "update hospital SET hospital_name = ?, hospital_email = ?, hospital_phone = ?, hospital_address = ?, hospital_password = ? WHERE hospital_pkid = ?",
      [obj.Name, obj.Email, obj.Phone, obj.Address, obj.Password, id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdateHospital-->", error);
    //
  }
};

async function DeleteHospital(id) {
  try {
    const [rows] = await pool.execute(
      "DELETE FROM hospital WHERE hospital_pkid = ?",
      [id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("DeleteHospital -->", error);
    throw error;
  }
};

async function GetAllDoctors() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `doctors` join hospital on doctor_hospital_id = hospital_pkid"
    );
    return rows;
  } catch (error) {
    console.log("GetAllDoctors-->", error);
    //
  }
};

async function GetAllPatients() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `patient` join hospital on patient_hospital_fkid = hospital_pkid"
    );
    return rows;
  } catch (error) {
    console.log("GetAllPatients-->", error);
    //
  }
}

module.exports = {
  GetAllHospital: GetAllHospital,
  AddHospital: AddHospital,
  UpdateHospital: UpdateHospital,
  DeleteHospital: DeleteHospital,
  GetAllDoctors: GetAllDoctors,
  GetAllPatients: GetAllPatients,
};
