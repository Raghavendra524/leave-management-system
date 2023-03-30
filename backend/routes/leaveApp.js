const express = require("express");
var connection = require("../connection").databaseConnection;
const { getitem } = require("../controller/studentActionController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// GET all req for student history
router.get("/", async (req, res) => {
  let sql = `select * from Leave_Application where s_id = ${req.Studentuser};`;
  try {
    let ans = await connection.query(sql);
    res.json({ msg: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// GET a single form
router.get("/:id", (req, res) => {
  const { id } = req.params;
  let sql = `select * from Leave_Application where s_id = ${req.Studentuser} and id = ?`;
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.json({ msg: result });
  });
});

// POST new application
router.post("/", (req, res) => {
  res.json({ msg: "post single data" });
});

// DELETE a application
router.delete("/:id", (req, res) => {
  res.json({ msg: "delete single data" });
});

// update a application
router.post("/:id", (req, res) => {
  res.json({ msg: "update single data" });
});

module.exports = router;
