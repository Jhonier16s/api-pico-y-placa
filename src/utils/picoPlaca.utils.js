const reglas = {
  Pasto: [
    [0, 1], // Lunes
    [2, 3], // Martes
    [4, 5], // Miércoles
    [6, 7], // Jueves
    [8, 9], // Viernes
  ],
  Popayan: {
    Lunes: [1, 2],
    Martes: [3, 4],
    Miércoles: [5, 6],
    Jueves: [7, 8],
    Viernes: [9, 0],
  },
};

const obtenerRestriccion = (ciudad, fecha, explicacion) => {
  const partes = fecha.split("-");
  const fechaConsulta = new Date(partes[0], partes[1] - 1, partes[2]);



  const diaSemana = fechaConsulta.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

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

  let digitos;
  if (ciudad === "Popayan") {
    digitos = reglas.Popayan[diasSemana[diaSemana]];
  } else if (ciudad === "Pasto") {
    // Calcular semanas desde el inicio sin contar fines de semana
    const semanasDesdeInicio = calcularSemanas(fechaConsulta);
   

    // **Corrección**: Mover en orden inverso el ciclo
    const avanceSemanal = (semanasDesdeInicio * 2) % 5;
    
    // Índice del día en la semana (Lunes = 0, ..., Viernes = 4)
    const indiceDia = diaSemana - 1;


    // **Corrección**: Restamos el avance en vez de sumarlo
    const indiceFinal = (indiceDia - avanceSemanal + 5) % 5;
    

    digitos = reglas.Pasto[indiceFinal];
  }

 

  const mensajeBase = `📢 Pico y placa para ${!explicacion ? "hoy" : fecha} en ${ciudad}: ${digitos.join(" y ")}`;

  return {
    mensaje: mensajeBase,
    fecha,
    ciudad,
    diaSemana: diasSemana[diaSemana],
    digitosRestringidos: digitos.join(" y "),
    ...(explicacion && { explicacion: `Los vehículos con placas terminadas en ${digitos.join(" y ")} no pueden circular.` }),
  };
};

// Nueva función para contar SEMANAS sin incluir fines de semana
function calcularSemanas(fecha) {
  const fechaInicio = new Date("2024-12-30"); // Lunes inicial
  let diferenciaDias = Math.floor((fecha - fechaInicio) / (1000 * 60 * 60 * 24));


  // Contar solo días hábiles (Lunes a Viernes)
  let semanasHabiles = Math.floor(diferenciaDias / 7) * 5 + Math.min(diferenciaDias % 7, 5);
 

  return Math.floor(semanasHabiles / 5);
}

module.exports = { obtenerRestriccion };