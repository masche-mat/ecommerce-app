var formulario = document.getElementById('formIngreso');
var user = document.getElementById('usuario');
var contra = document.getElementById('contraseña');

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    document.location.replace('https://masche-mat.github.io/workspace-inicial/home.html')
});


/*//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){}
*/
