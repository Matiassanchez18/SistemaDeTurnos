const btnEnviar = document.getElementById("btnEnviar");

let IdEditar = null;

const actualizarTurno = async () => {
  try {
    const consulta = await axios.get("http://localhost:3000/turnos");
    const datos = consulta.data;
    const tabla = document.getElementById("tablaTurnos");

    
    tabla.innerHTML = "";

    datos.forEach((turnos) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${turnos.id}</td>
      <td>${turnos.fecha}</td>
      <td>${turnos.hora}</td>
      <td>${turnos.pacienteId}</td>
      <td>${turnos.profesionalId}</td>
      <td>${turnos.estado}</td>
      <td>
        <button class="btn btn-danger" onclick="eliminarTurno('${turnos.id}')">
          <i class="bi bi-trash"></i>
        </button>

        <button
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
          onclick="inputEditar(
        '${turnos.id}',
        '${turnos.fecha}', 
        '${turnos.hora}', 
        '${turnos.pacienteId}',
        '${turnos.profesional}',
        '${turnos.estado}'
          )"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
      `;

      tabla.appendChild(tr);
    });
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};
actualizarTurno(); 
const agregarTurno = async () => {
  const inputFecha = document.getElementById("Fecha").value;
  const inputHora = document.getElementById("Hora").value;
  const inputPacienteId = document.getElementById("PacienteId").value;
  const inputProfesionalId = document.getElementById("ProfesionalId").value;
  const inputEstado = document.getElementById("Estado").value;

  try {
    const datos = {
      fecha: inputFecha,
      hora: inputHora,
      pacienteId: inputPacienteId,
      profesionalId: inputProfesionalId,
      estado: inputEstado,
    };

    await axios.post("http://localhost:3000/turnos", datos);
    actualizarTurnos();
    limpiarFormulario();

    alert("Turno agregado correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};
