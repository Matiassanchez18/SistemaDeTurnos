const btnEnviar = document.getElementById("btnEnviar");
let IdEditar = null;

const actualizarTurno = async () => {
  try {
    const consulta = await axios.get("http://localhost:3000/turnos");
    const datos = consulta.data;
    const tabla = document.getElementById("tablaTurnos");

    tabla.innerHTML = "";

    datos.forEach((turno) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${turno.id}</td>
        <td>${turno.fecha}</td>
        <td>${turno.hora}</td>
        <td>${turno.pacienteId}</td>
        <td>${turno.profesionalId}</td>
        <td>${turno.estado}</td>
        <td>
          <button class="btn btn-danger" onclick="eliminarTurno('${turno.id}')">
            <i class="bi bi-trash"></i>
          </button>
          <button
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#ModalTurno"
            onclick="inputEditar('${turno.id}','${turno.fecha}','${turno.hora}','${turno.pacienteId}','${turno.profesionalId}','${turno.estado}')"
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

const actualizarContadores = async () => {
  try {
    const resPacientes = await axios.get("http://localhost:3000/pacientes");
    const resProfesionales = await axios.get(
      "http://localhost:3000/Profesionales",
    );
    const resTurnos = await axios.get("http://localhost:3000/turnos");

    document.getElementById("PacientesRegistrados").textContent =
      resPacientes.data.length;
    document.getElementById("MedicosProfesionales").textContent =
      resProfesionales.data.length;
    document.getElementById("Turnos").textContent = resTurnos.data.length;

    const terminados = resTurnos.data.filter(
      (t) => t.estado === "Confirmado" || t.estado === "Cancelado",
    );
    document.getElementById("TurnosTerminados").textContent = terminados.length;
  } catch (error) {
    console.log("Error al actualizar contadores: " + error.message);
  }
};

const cargarPacientes = async () => {
  try {
    const res = await axios.get("http://localhost:3000/pacientes");
    const select = document.getElementById("PacienteId");
    select.innerHTML = '<option value="">Seleccionar paciente</option>';
    res.data.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.id;
      option.textContent = `${paciente.nombre} — ${paciente.id}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.log("Error al cargar pacientes: " + error.message);
  }
};

const cargarProfesionales = async () => {
  try {
    const res = await axios.get("http://localhost:3000/Profesionales");
    const select = document.getElementById("ProfesionalId");
    select.innerHTML = '<option value="">Seleccionar profesional</option>';
    res.data.forEach((profesional) => {
      const option = document.createElement("option");
      option.value = profesional.id;
      option.textContent = `${profesional.nombreCompleto} — ${profesional.Especialidad}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.log("Error al cargar profesionales: " + error.message);
  }
};

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
    actualizarTurno();
    actualizarContadores();
    btnEnviar.textContent = "Enviar";
    btnEnviar.onclick = agregarTurno;
    alert("Turno agregado correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const inputEditar = (id, fecha, hora, pacienteId, profesionalId, estado) => {
  IdEditar = id;
  document.getElementById("Fecha").value = fecha;
  document.getElementById("Hora").value = hora;
  document.getElementById("PacienteId").value = pacienteId;
  document.getElementById("ProfesionalId").value = profesionalId;
  document.getElementById("Estado").value = estado;
  btnEnviar.textContent = "Editar";
  btnEnviar.onclick = editarTurno;
};

const editarTurno = async () => {
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
    await axios.patch(`http://localhost:3000/turnos/${IdEditar}`, datos);
    actualizarTurno();
    actualizarContadores();
    btnEnviar.textContent = "Enviar";
    btnEnviar.onclick = agregarTurno;
    alert("Turno editado correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const eliminarTurno = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/turnos/${id}`);
    actualizarTurno();
    actualizarContadores();
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

btnEnviar.onclick = agregarTurno;

cargarPacientes();
cargarProfesionales();
actualizarContadores();
actualizarTurno();
