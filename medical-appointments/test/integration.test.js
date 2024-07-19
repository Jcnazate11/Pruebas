const request = require('supertest');
const app = require('../app'); // Asegúrate de que el camino es correcto a tu archivo app.js
const { Paciente, Medico, Cita, sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Resetea la base de datos antes de las pruebas
});

describe('Pruebas de Integración para el Sistema de Citas Médicas', () => {
  
  // Prueba para la creación de un paciente
  it('Debe crear un paciente correctamente', async () => {
    const pacienteData = {
      nombre: 'Jeanhela',
      apellido: 'Nazate',
      fecha_nacimiento: '2024-01-06',
      email: 'jcnazate@espe.edu.ec'
    };
    const response = await request(app)
      .post('/pacientes')
      .send(pacienteData)
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.nombre).toBe(pacienteData.nombre);
    expect(response.body.apellido).toBe(pacienteData.apellido);
    expect(response.body.fecha_nacimiento).toBe(pacienteData.fecha_nacimiento);
    expect(response.body.email).toBe(pacienteData.email);
  });

  // Prueba para la creación de un médico
  it('Debe crear un médico correctamente', async () => {
    const medicoData = {
      nombre: 'Johan',
      apellido: 'Romo',
      especialidad: 'Cardiología'
    };
    const response = await request(app)
      .post('/medicos')
      .send(medicoData)
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.nombre).toBe(medicoData.nombre);
    expect(response.body.apellido).toBe(medicoData.apellido);
    expect(response.body.especialidad).toBe(medicoData.especialidad);
  });

  // Prueba para la creación de una cita
  it('Debe crear una cita correctamente', async () => {
    // Crear un paciente y un médico primero
    const paciente = await Paciente.create({
      nombre: 'Jeanhela',
      apellido: 'Nazate',
      fecha_nacimiento: '2024-01-06',
      email: 'jcnazate@espe.edu.ec'
    });
    const medico = await Medico.create({
      nombre: 'Johan',
      apellido: 'Romo',
      especialidad: 'Cardiología'
    });
    
    const citaData = {
      paciente_id: paciente.id,
      medico_id: medico.id,
      fecha: '2024-07-19',
      hora: '10:00:00',
      consultorio: '101'
    };
    const response = await request(app)
      .post('/citas')
      .send(citaData)
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.paciente_id).toBe(citaData.paciente_id);
    expect(response.body.medico_id).toBe(citaData.medico_id);
    expect(response.body.fecha).toBe(citaData.fecha);
    expect(response.body.hora).toBe(citaData.hora);
    expect(response.body.consultorio).toBe(citaData.consultorio);
  });

  // Prueba para la modificación de una cita
  it('Debe modificar una cita correctamente', async () => {
    // Crear un paciente y un médico primero
    const paciente = await Paciente.create({
      nombre: 'Jeanhela',
      apellido: 'Nazate',
      fecha_nacimiento: '2024-01-06',
      email: 'jcnazate@espe.edu.ec'
    });
    const medico = await Medico.create({
      nombre: 'Johan',
      apellido: 'Romo',
      especialidad: 'Cardiología'
    });
    const cita = await Cita.create({
      paciente_id: paciente.id,
      medico_id: medico.id,
      fecha: '2024-07-19',
      hora: '10:00:00',
      consultorio: '101'
    });

    const citaModificadaData = {
      paciente_id: paciente.id,
      medico_id: medico.id,
      fecha: '2024-07-20',
      hora: '11:00:00',
      consultorio: '102'
    };
    const response = await request(app)
      .put(`/citas/${cita.id}`)
      .send(citaModificadaData)
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.fecha).toBe(citaModificadaData.fecha);
    expect(response.body.hora).toBe(citaModificadaData.hora);
    expect(response.body.consultorio).toBe(citaModificadaData.consultorio);
  });

  // Prueba para la eliminación de una cita
  it('Debe eliminar una cita correctamente', async () => {
    // Crear un paciente y un médico primero
    const paciente = await Paciente.create({
      nombre: 'Jeanhela',
      apellido: 'Nazate',
      fecha_nacimiento: '2024-01-06',
      email: 'jcnazate@espe.edu.ec'
    });
    const medico = await Medico.create({
      nombre: 'Johan',
      apellido: 'Romo',
      especialidad: 'Cardiología'
    });
    const cita = await Cita.create({
      paciente_id: paciente.id,
      medico_id: medico.id,
      fecha: '2024-07-19',
      hora: '10:00:00',
      consultorio: '101'
    });

    await request(app)
      .delete(`/citas/${cita.id}`)
      .expect(204);

    // Verificar que la cita ha sido eliminada
    const response = await request(app)
      .get(`/citas/${cita.id}`)
      .expect(404);
  });
});
