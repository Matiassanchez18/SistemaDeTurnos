const btnEnviar = document.getElementById("btnEnviar");

//empieza vacia
let IdEditar = null;

const actualizarPaciente = async () => {
  try {
    const consulta = await axios.get("http://localhost:3000/pacientes");
    const datos = consulta.data;
    const tabla = document.getElementById("tabla");

    //empieza sin nada
    tabla.innerHTML = "";

    datos.forEach((pacientes) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <th>${pacientes.id}</th>
        <th>${pacientes.nombre}</th>
        <th>${pacientes.dni}</th>
        <th>${pacientes.fechaNacimiento}</th>
        <th>${pacientes.telefono}</th>
        <th>${pacientes.obraSocial}</th>
        <th>
          <button class="btn btn-danger" onclick="eliminarPaciente('${pacientes.id}')">
            <i class="bi bi-trash"></i>
          </button>

          <button
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#ModalPacientes"
            onclick="inputEditar(
              '${pacientes.nombre}',
              '${pacientes.dni}',
              '${pacientes.fechaNacimiento}',
              '${pacientes.obraSocial}',
              '${pacientes.telefono}',
              '${pacientes.id}'
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

actualizarPaciente();

const agregarPaciente = async () => {
  const inputNombre = document.getElementById("Nombre").value;
  const inputDni = document.getElementById("DNI").value;
  const inputFechaNacimiento = document.getElementById("FechaNacimiento").value;
  const inputObraSocial = document.getElementById("ObraSocial").value;
  const inputTelefono = document.getElementById("Telefono").value;

  try {
    const datos = {
      nombre: inputNombre,
      dni: inputDni,
      fechaNacimiento: inputFechaNacimiento,
      obraSocial: inputObraSocial,
      telefono: inputTelefono,
    };

    await axios.post("http://localhost:3000/pacientes", datos)
    actualizarPacientes();
    limpiarFormulario();

    alert("Paciente agregado correctamente.")
  } 
  
  catch (error) 
  {
    console.log("Ocurrió un error: " + error.message);
  }
}

//eliminar
const eliminarPaciente = async (id) =>{
     const confirmar = confirm("¿Está seguro de que desea eliminar este paciente? También se eliminarán todos sus turnos.")

  if (!confirmar) return;
  try {
    const consultaTurnos = await axios.get(`http://localhost:3000/turnos?pacienteId=${id}`) 
    const turnos = consultaTurnos.data //manda a data

    for (const turno of turnos) {
      await axios.delete(`http://localhost:3000/turnos/${turno.id}`)
    }

   

    await axios.delete(`http://localhost:3000/pacientes/${id}`)

    actualizarPacientes();
  } catch (error) {
    console.log("Ocurrió un error: " + error.message)
  }


}


const inputEditar = (nombre, dni, fechaNacimiento, obraSocial, telefono, id) => {
  document.getElementById("Nombre").value = nombre
  document.getElementById("DNI").value = dni
  document.getElementById("FechaNacimiento").value = fechaNacimiento
  document.getElementById("ObraSocial").value = obraSocial
  document.getElementById("Telefono").value = telefono

  btnEnviar.textContent = "Editar paciente";
  btnEnviar.onclick = editarPaciente;

  IdEditar = id;
}

const editarPaciente = async () => {
    const inputNombre = document.getElementById("Nombre").value
    const inputDni = document.getElementById("DNI").value
    const inputFechaNacimiento = document.getElementById("FechaNacimiento").value
    const inputObraSocial = document.getElementById("ObraSocial").value
    const inputTelefono = document.getElementById("Telefono").value

    try{
        const datosModificados = {
            nombre: inputNombre,
            dni: inputDni,
            fechaNacimiento: inputFechaNacimiento,
            obraSocial: inputObraSocial,
            telefono: inputTelefono,
        }
        
         await axios.patch(`http://localhost:3000/pacientes/${IdEditar}`, datosModificados)

         actualizarPaciente()
         limpiarFormulario()

        alert("Se editaron los datos correctamente.");
    }
    catch (error){
        console.log("Ocurrió un error: " + error.message)
    }
}


const limpiarFormulario = () => {
  document.getElementById("Nombre").value = ""
  document.getElementById("DNI").value = ""
  document.getElementById("FechaNacimiento").value = ""
  document.getElementById("ObraSocial").value = ""
  document.getElementById("Telefono").value = ""

  IdEditar = null

  btnEnviar.textContent = "Enviar"
  btnEnviar.onclick = agregarPaciente
}

btnEnviar.onclick = agregarPaciente

