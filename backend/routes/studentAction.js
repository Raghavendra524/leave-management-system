const express = require("express");
const {
  getHistory,
  getSingleApplicationForm,
  createApplicationForm,
  updateApplicationForm,
  tempDeleteApplicationForm,
} = require("../controller/studentActionController");
const requireAuth = require("../middleware/StudentrequireAuth");
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// GET all req for student history
router.get("/applicationhistory", getHistory);

// GET a single form
router.get("/applicationform/:id", getSingleApplicationForm);

// POST new application
router.post("/newapplication", createApplicationForm);

// DELETE a application
router.post("/deleteapplication", updateApplicationForm);

// update a application
router.post("/updateapplication", tempDeleteApplicationForm);

module.exports = router;
