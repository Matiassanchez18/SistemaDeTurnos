const btnEnviar = document.getElementById("btnEnviar");

let IdEditar = null;

const actualizarProfesional = async () => {
  try {
    const consulta = await axios.get("http://localhost:3000/Profesionales");
    const datos = await consulta.data;
    const tabla = document.getElementById("tabla");

    datos.forEach((profesionales) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <th>${profesionales.id}</th>
      <th>${profesionales.nombreCompleto}</th>
      <th>${profesionales.Matricula}</th>
      <th>${profesionales.Especialidad}</th>
      <th>${profesionales.Dias}</th>
      <th>
      <button class="btn btn-danger" onclick="eliminarProfesional('${profesionales.id}')"><i class="bi bi-trash "></i></button>
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#Modal" onclick="inputEditar('${profesionales.nombreCompleto}','${profesionales.Matricula}','${profesionales.Especialidad}','${profesionales.Dias}','${profesionales.id}')"><i class="bi bi-pencil"></i></button>
      </th>
`;
      tabla.appendChild(tr);
    });
  } catch (error) {
    console.log("ocurrio un error " + error.message);
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

    const consulta = await axios.post(
      "http://localhost:3000/Profesionales",
      datos,
    );
    actualizarProfesional();
    alert("Se actualizo correctamente.");
  } catch (error) {
    console.log("ocurrio un error " + error.message);
  }
};

const eliminarProfesional = async (id) => {
  try {
    const consulta = await axios.delete(
      `http://localhost:3000/Profesionales/${id}`,
    );
    actualizarProfesional();
  } catch (error) {
    console.log("ocurio un error " + error.message);
  }
};

const inputEditar = async (
  nombreCompleto,
  Matricula,
  Especialidad,
  Dias,
  id,
) => {
  try {
    const inputNombre = (document.getElementById("Nombre").value =
      nombreCompleto);
    const inputMatricula = (document.getElementById("Matricula").value =
      Matricula);
    const inputEspecialidad = (document.getElementById("Especialidad").value =
      Especialidad);
    const inputDias = (document.getElementById("diasatencion").value = Dias);

    btnEnviar.textContent = "Editar Profesional";
    btnEnviar.onclick = editarProfesional;
    IdEditar = id;
  } catch (error) {
    console.log("Ocurrio un error " + error.message);
  }
};

const editarProfesional = async () => {
  const inputNombre = document.getElementById("Nombre").value;
  const inputMatricula = document.getElementById("Matricula").value;
  const inputEspecialidad = document.getElementById("Especialidad").value;
  const inputDias = document.getElementById("diasatencion").value;

  
  try {
    btnEnviar.onclick = agregarProfesional;

  const datosModificados = {
    nombreCompleto: inputNombre,
    Matricula: inputMatricula,
    Especialidad: inputEspecialidad,
    Dias: inputDias,
  };

  const consulta = await axios.put(
    `http://localhost:3000/Profesionales/${IdEditar}`,
    datosModificados,
  );
  actualizarProfesional;
  alert("Se edito los datos correctamente")
  } catch (error) {
    console.log("ocurrio un error " + error.message);
  }
};
