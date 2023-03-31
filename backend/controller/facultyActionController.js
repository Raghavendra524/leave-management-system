var connection = require("../connection").databaseConnection;

// get all pending application
const getPendingApplication = async (req, res) => {
  let sql = `select * from Leave_Application where status="pending" and f_id = ?;`;
  try {
    let ans = await connection.query(sql, req.Facultyuser);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get all previously handled applications deleted and non deleted
const getAllApplications = async (req, res) => {
  let sql = `select * from Leave_Application where f_id = ?;`;
  try {
    let ans = await connection.query(sql, req.Facultyuser);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get a single application form
const getSingleApplicationForm = async (req, res) => {
  const { id } = req.params;
  try {
    let sql = `select * from Leave_Application where id = ?`;
    let ans = await connection.query(sql, id);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// update status of application and write comment
const updateStatusOfLeaveApplication = async (req, res) => {
  res.json({ data: "status is updated." });
};

// get a student info

const getStudentInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let sql = `select roll_no,name,mobile_no,email_id,department,degree,specialization,entrance,remaining_casual_leave,remaining_medical_leave from Student where id = ? and faculty_id = ?`;
    let ans = await connection.query(sql, [id,req.Facultyuser]);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// delete all the leave application permenetally belonging to faculty
const deleteAllApplicationForm = async (req, res) => {
  res.json({ data: "data is deleted." });
};

module.exports = {
  getPendingApplication,
  getAllApplications,
  getSingleApplicationForm,
  updateStatusOfLeaveApplication,
  getStudentInfo,
  deleteAllApplicationForm,
};
