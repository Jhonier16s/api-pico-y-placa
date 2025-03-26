const request = require("supertest");
const app = require("../src/app"); // Ajusta la ruta según la estructura de tu proyecto

describe("Pico y Placa API", () => {
  test("✔️ Dígitos retornados para una fecha en Pasto sean correctos", async () => {
    const response = await request(app).post("/pico-placa/consulta").send({
      ciudad: "Pasto",
      fecha: "2025-03-25",
    });
    expect(response.status).toBe(200);
    expect(response.body.digitosRestringidos).toBe('4 y 5');
  });

   test("✔️ Dígitos retornados para una fecha en Popayán sean correctos", async () => {
    const response = await request(app).post("/pico-placa/consulta").send({
      ciudad: "Popayan",
      fecha: "2025-03-25",
    });
    expect(response.status).toBe(200);
    expect(response.body.digitosRestringidos).toBe('3 y 4');
  });

  test("✔️ El servicio /pico-placa/hoy funciona correctamente con la fecha actual", async () => {
    const response = await request(app).post("/pico-placa/hoy").send({ ciudad: "Pasto" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fecha");
    expect(response.body).toHaveProperty("digitosRestringidos");
  });

  test("✔️ Retorna un error si la ciudad no es válida o está mal escrita", async () => {
    const response = await request(app).post("/pico-placa/consulta").send({
      ciudad: "CiudadInventada",
      fecha: "2025-03-29",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("✔️ La lógica de rotación es cíclica", async () => {
    const response1 = await request(app).post("/pico-placa/consulta").send({
      ciudad: "Pasto",
      fecha: "2025-03-29", // Última fecha del ciclo
    });
    const response2 = await request(app).post("/pico-placa/consulta").send({
      ciudad: "Pasto",
      fecha: "2025-03-31", // Inicio del nuevo ciclo
    });
    expect(response1.body.digitosRestringidos).not.toEqual(response2.body.digitosRestringidos);
  });
});
