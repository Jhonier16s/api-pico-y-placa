const reglas = {
  Pasto: {
    0: [0, 1],
    1: [2, 3],
    2: [4, 5],
    3: [6, 7],
    4: [8, 9],
  },
  Popayan: {
    0: [0, 1],
    1: [2, 3],
    2: [4, 5],
    3: [6, 7],
    4: [8, 9],
  },
};

const obtenerRestriccion = (ciudad, fecha, explicacion) => {
  const fechaConsulta = new Date(fecha);
  const diaSemana = fechaConsulta.getUTCDay();
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  if (diaSemana === 0 || diaSemana === 6) {
    return {
      mensaje: `No aplica pico y placa los fines de semana en ${ciudad}.`,
      ciudad,
      fecha,
      diaSemana: diasSemana[diaSemana],
      digitosRestringidos: [],
      explicacion: "El pico y placa solo aplica de lunes a viernes.",
    };
  }

  let semanasCount = calcularSemanas(fechaConsulta);

  if (ciudad === "Popayan") {
    const mes = fechaConsulta.getMonth() + 1;
    const semestreOffset = mes >= 7 ? 1 : 0;
    semanasCount += semestreOffset;
  }

  const digitos = reglas[ciudad][semanasCount % 5];

  const mensajeBase = `📢 Pico y placa para ${
    !explicacion ? "hoy" : fecha
  } en ${ciudad}: ${digitos.join(" y ")}`;

  const respuesta = {
    mensaje: mensajeBase,
    fecha,
    ciudad,
    "dia de la semana": diasSemana[diaSemana],
    "digitos Restringidos": digitos.join(" y "),
  };

  if (explicacion) {
    respuesta.explicacion = `Los vehículos con placas terminadas en ${digitos.join(
      " y "
    )} no pueden circular.`;
  }

  return respuesta;
};

function calcularSemanas(desdeFecha) {
  const fechaInicio = new Date("2024-12-31");
  const fechaFin = new Date(desdeFecha);

  const diferenciaMs = fechaFin - fechaInicio;
  const semanas = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24 * 7));

  return semanas;
}

module.exports = { obtenerRestriccion };
