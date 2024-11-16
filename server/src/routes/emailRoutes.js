// server/routes/emailRoutes.js
const express = require("express");
const { scheduleEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/scheduleEmail", scheduleEmail);

module.exports = router;
