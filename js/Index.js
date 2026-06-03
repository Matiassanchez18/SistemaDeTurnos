const btn = document.getElementById("btnEnviar");

const verificarUsuario = () => {
  const inputUsuario = document.getElementById("usuario").value;
  const inputContraseña = document.getElementById("contraseña").value;

  const admin = "admin1234";
  const contraseña = "12345";

  const lista = document.getElementById("ulnav");

  if (
    admin.toLocaleLowerCase() === inputUsuario.toLocaleLowerCase() &&
    contraseña === inputContraseña
  ) {
    const li = document.createElement("li");

    lista.innerHTML = `
    <li class="nav-item">
                <a class="nav-link" href="./pages/Pacientes.html">Pacientes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Turnos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./pages/Profesionales.html">Profesionales</a>
              </li>
             
    `;

    const modalElement = document.getElementById("Modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    lista.appendChild(li);

    alert("Bienvenido!!");
  } else {
    alert("Contrasña o usuario incorrecto");
  }
};
btn.addEventListener("click", verificarUsuario);
