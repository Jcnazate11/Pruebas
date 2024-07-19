document.addEventListener('DOMContentLoaded', () => {
    // Manejar el formulario de creación de médico
    const medicoForm = document.getElementById('medico-form');
    if (medicoForm) {
        medicoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre_medico').value;
            const apellido = document.getElementById('apellido_medico').value;
            const especialidad = document.getElementById('especialidad_medico').value;
            
            const medico = {
                nombre: nombre,
                apellido: apellido,
                especialidad: especialidad
            };
            
            fetch('/medicos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medico)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert('Médico creado correctamente');
            })
            .catch((error) => {
                alert('Error al crear médico: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
    
    // Manejar el formulario de creación de paciente
    const pacienteForm = document.getElementById('paciente-form');
    if (pacienteForm) {
        pacienteForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre_paciente').value;
            const apellido = document.getElementById('apellido_paciente').value;
            const fecha_nacimiento = document.getElementById('fecha_nacimiento_paciente').value;
            const email = document.getElementById('email_paciente').value;
            
            const paciente = {
                nombre: nombre,
                apellido: apellido,
                fecha_nacimiento: fecha_nacimiento,
                email: email
            };
            
            fetch('/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paciente)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert('Paciente creado correctamente');
            })
            .catch((error) => {
                alert('Error al crear paciente: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
    
    // Manejar el formulario de creación de cita
    const citaForm = document.getElementById('cita-form');
    if (citaForm) {
        citaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const paciente_id = document.getElementById('paciente_id').value;
            const medico_id = document.getElementById('medico_id').value;
            const fecha = document.getElementById('fecha_cita').value;
            const hora = document.getElementById('hora_cita').value;
            const consultorio = document.getElementById('consultorio').value;
            
            const cita = {
                paciente_id: paciente_id,
                medico_id: medico_id,
                fecha: fecha,
                hora: hora,
                consultorio: consultorio
            };
            
            fetch('/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cita)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert('Cita creada correctamente');
            })
            .catch((error) => {
                alert('Error al crear cita: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
    
    // Manejar el formulario de modificación de cita
    const modificarCitaForm = document.getElementById('modificar-cita-form');
    if (modificarCitaForm) {
        modificarCitaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const cita_id = document.getElementById('cita_id').value;
            const paciente_id = document.getElementById('paciente_id_mod').value;
            const medico_id = document.getElementById('medico_id_mod').value;
            const fecha = document.getElementById('fecha_cita_mod').value;
            const hora = document.getElementById('hora_cita_mod').value;
            const consultorio = document.getElementById('consultorio_mod').value;
            
            const cita = {
                paciente_id: paciente_id,
                medico_id: medico_id,
                fecha: fecha,
                hora: hora,
                consultorio: consultorio
            };
            
            fetch(`/citas/${cita_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cita)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert('Cita modificada correctamente');
            })
            .catch((error) => {
                alert('Error al modificar cita: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
    
    // Manejar el formulario de eliminación de cita
    const eliminarCitaForm = document.getElementById('eliminar-cita-form');
    if (eliminarCitaForm) {
        eliminarCitaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const cita_id = document.getElementById('cita_id_elim').value;
            
            fetch(`/citas/${cita_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 204) {
                    alert('Cita eliminada correctamente');
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Error eliminando la cita');
                    });
                }
            })
            .catch((error) => {
                alert('Error al eliminar cita: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
});
