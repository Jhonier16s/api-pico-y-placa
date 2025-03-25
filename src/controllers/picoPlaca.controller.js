const { obtenerRestriccion } = require("../utils/picoPlaca.utils");

const consultaPicoPlaca = (req, res) => {
  const { ciudad, fecha } = req.body;

  if (!ciudad || !fecha) {
    return res.status(400).json({ error: "Se requieren ciudad y fecha" });
  }
  if (ciudad !== "Pasto" && ciudad !== "Popayan") {
    return res.status(400).json({ error: "Ciudad no válida" });
  }

  const resultado = obtenerRestriccion(ciudad, fecha, true);
  res.json(resultado);
};

const hoyPicoPlaca = (req, res) => {
  const { ciudad } = req.body;

  if (!ciudad) {
    return res.status(400).json({ error: "Se requiere la ciudad" });
  }

  const fechaHoy = new Date().toISOString().split("T")[0];
  const resultado = obtenerRestriccion(ciudad, fechaHoy, false);

  res.json(resultado);
};

module.exports = { consultaPicoPlaca, hoyPicoPlaca };
