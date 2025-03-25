const express = require("express");
const picoPlacaRoutes = require("./routes/picoPlaca.routes");

const app = express();

app.use(express.json()); // Middleware para JSON
app.use("/pico-placa", picoPlacaRoutes);

module.exports = app;