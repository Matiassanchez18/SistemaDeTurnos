const btn = document.getElementById("btnEnviar");

const verificarUsuario = () => {
  const inputUsuario = document.getElementById("usuario").value;
  const inputContraseña = document.getElementById("contraseña").value;

  const admin = "admin1234";
  const contraseña = "12345";

 if (
  admin.toLocaleLowerCase() === inputUsuario.toLocaleLowerCase() &&
  contraseña === inputContraseña
) {
  console.log("si");
} else {
  console.log("no");
}
}
btn.addEventListener("click", verificarUsuario);
