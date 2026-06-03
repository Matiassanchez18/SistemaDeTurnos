
const actualizarProfesional=async()=>{
const inputNombre=document.getElementById("Nombre").value
const inputMatricula=document.getElementById("Matricula").value
const inputEspecialidad=document.getElementById("Especialidad").value
const inputDias =document.getElementById("diasatencion").value

try{
const consulta = await axion.get()

}catch(error){
    console.log("ocurrio un error "+ error.message)
}

}