const btnEnviar = document.getElementById("btnEnviar");

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

const eliminarProfesional = async () => {
  try {
    const consulta = await axios.delete(
      `http://localhost:3000/Profesionales${id}`,
    );
  } catch (error) {
    console.log("ocurio un error " + error.message);
  }
};
