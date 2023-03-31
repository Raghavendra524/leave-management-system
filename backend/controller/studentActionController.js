var connection = require("../connection").databaseConnection;

// get all previous history
const getHistory = async (req, res) => {
  let sql = `select * from Leave_Application where s_id = ${req.Studentuser};`;
  try {
    let ans = await connection.query(sql);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get single application form
const getSingleApplicationForm = async (req, res) => {
    const { id } = req.params;
    let sql = `select * from Leave_Application where id = ?`;
    try {
      let ans = await connection.query(sql,id);
      res.json({ data: ans[0] });
    } catch (err) {
      res.status(400).json({ error: err });
    }
//   res.json({ data: `post single data ${id}` });
};

// create a new leave application
const createApplicationForm = (req, res) => {
  res.json({ data: "post single data" });
};
// update a leave application
const updateApplicationForm = (req, res) => {
  res.json({ data: "delete single data" });
};

// delete a leave application
const tempDeleteApplicationForm = (req, res) => {
  res.json({ data: "update single data" });
};

module.exports = {
  getHistory,
  getSingleApplicationForm,
  createApplicationForm,
  updateApplicationForm,
  tempDeleteApplicationForm,
};
