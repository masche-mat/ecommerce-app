var formulario = document.getElementById("formIngreso");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  var user = document.getElementById("usuario").value;

  if (user.trim() === "") {
    alert("Nombre de usuario vacio");
  } else {
    sessionStorage.setItem("nombre", user.trim());

    document.location.href = "home.html";
  }
});



/*//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){}
*/
