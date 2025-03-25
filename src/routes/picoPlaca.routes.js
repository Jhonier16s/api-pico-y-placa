const express = require("express");
const router = express.Router();
const { consultaPicoPlaca, hoyPicoPlaca } = require("../controllers/picoPlaca.controller");

router.post("/consulta", consultaPicoPlaca);
router.post("/hoy", hoyPicoPlaca);

module.exports = router;
