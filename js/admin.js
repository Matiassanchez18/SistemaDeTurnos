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
    actualizarTurno(); // ← sin S
    alert("Turno editado correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const eliminarTurno = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/turnos/${id}`);
    actualizarTurno(); // ← sin S
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

btnEnviar.addEventListener("click", agregarTurno);

actualizarTurno();