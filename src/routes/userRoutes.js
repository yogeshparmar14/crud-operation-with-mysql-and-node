const express = require("express");
const { createApi, deleteApi, searchApi, listApi } = require("../modules/authentication/authController.js");
const {
	registerValidation,
} = require("../modules/authentication/authValidationSchemas.js");

const router = express.Router();

//Public routes
router.post("/createApi", registerValidation, createApi);
router.delete("/deleteApi", deleteApi);
router.post("/searchApi", searchApi);
router.get("/listApi", listApi);

module.exports = router;
