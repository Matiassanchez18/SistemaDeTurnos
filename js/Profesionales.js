const btnEnviar = document.getElementById("btnEnviar");

let IdEditar = null;

const actualizarProfesional = async () => {
  try {
    const consulta = await axios.get("http://localhost:3000/Profesionales");
    const datos = consulta.data;
    const tabla = document.getElementById("tabla");

    // Limpiar tabla antes de volver a cargar
    tabla.innerHTML = "";

    datos.forEach((profesionales) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <th>${profesionales.id}</th>
      <th>${profesionales.nombreCompleto}</th>
      <th>${profesionales.Matricula}</th>
      <th>${profesionales.Especialidad}</th>
      <th>${profesionales.Dias}</th>
      <th>
        <button class="btn btn-danger" onclick="eliminarProfesional('${profesionales.id}')">
          <i class="bi bi-trash"></i>
        </button>

        <button
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
          onclick="inputEditar(
            '${profesionales.nombreCompleto}',
            '${profesionales.Matricula}',
            '${profesionales.Especialidad}',
            '${profesionales.Dias}',
            '${profesionales.id}'
          )"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </th>
      `;

      tabla.appendChild(tr);
    });
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

actualizarProfesional();

const agregarProfesional = async () => {
  const inputNombre = document.getElementById("Nombre").value;
  const inputMatricula = document.getElementById("Matricula").value;
  const inputEspecialidad = document.getElementById("Especialidad").value;
  const inputDias = document.getElementById("diasatencion").value;

  try {
    const datos = {
      nombreCompleto: inputNombre,
      Matricula: inputMatricula,
      Especialidad: inputEspecialidad,
      Dias: inputDias,
    };

    await axios.post("http://localhost:3000/Profesionales", datos);

    actualizarProfesional();
    limpiarFormulario();

    alert("Profesional agregado correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const eliminarProfesional = async (id) => {
  try {
    const eliminar = await VerificarEliminar(id);

    if (!eliminar) return;

    await axios.delete(`http://localhost:3000/Profesionales/${id}`);

    actualizarProfesional();
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const inputEditar = (
  nombreCompleto,
  Matricula,
  Especialidad,
  Dias,
  id
) => {
  document.getElementById("Nombre").value = nombreCompleto;
  document.getElementById("Matricula").value = Matricula;
  document.getElementById("Especialidad").value = Especialidad;
  document.getElementById("diasatencion").value = Dias;

  btnEnviar.textContent = "Editar profesional";
  btnEnviar.onclick = editarProfesional;

  IdEditar = id;
};

const editarProfesional = async () => {
  const inputNombre = document.getElementById("Nombre").value;
  const inputMatricula = document.getElementById("Matricula").value;
  const inputEspecialidad = document.getElementById("Especialidad").value;
  const inputDias = document.getElementById("diasatencion").value;

  try {
    const datosModificados = {
      nombreCompleto: inputNombre,
      Matricula: inputMatricula,
      Especialidad: inputEspecialidad,
      Dias: inputDias,
    };

    await axios.put(
      `http://localhost:3000/Profesionales/${IdEditar}`,
      datosModificados
    );

    actualizarProfesional();
    limpiarFormulario();

    alert("Se editaron los datos correctamente.");
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
  }
};

const VerificarEliminar = async (id) => {
  try {
    const consulta = await axios.get(
      `http://localhost:3000/turnos?profesionalId=${id}`
    );

    const turnos = consulta.data;

    if (turnos.length > 0) {
      return confirm(
        `El profesional tiene ${turnos.length} turno(s) asignado(s). ¿Desea eliminarlo igualmente?`
      );
    }

    return true;
  } catch (error) {
    console.log("Ocurrió un error: " + error.message);
    return false;
  }
};

const limpiarFormulario = () => {
  document.getElementById("Nombre").value = "";
  document.getElementById("Matricula").value = "";
  document.getElementById("Especialidad").value = "";
  document.getElementById("diasatencion").value = "";

  IdEditar = null;

  btnEnviar.textContent = "Enviar";
  btnEnviar.onclick = agregarProfesional;
};

// Estado inicial del botón
btnEnviar.onclick = agregarProfesional;