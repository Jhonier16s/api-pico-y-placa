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

  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexed
  const dd = String(hoy.getDate()).padStart(2, "0");

  const fechaHoy = `${yyyy}-${mm}-${dd}`;


  console.log(fechaHoy)
  const resultado = obtenerRestriccion(ciudad, fechaHoy, false);

  res.json(resultado);
};

module.exports = { consultaPicoPlaca, hoyPicoPlaca };
