//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  if (localStorage.getItem("nombre")) {
    var nombre = localStorage.getItem("nombre");
    document.getElementById("nomUser").innerHTML = nombre;
  } else { document.location.href = "index.html"; }

});

//cuando cerras sesion se borra localStorage
/*document.getElementById('closeSesion').addEventListener('click', function () {
  localStorage.removeItem("nombre");
  document.location.href = "index.html";
})*/