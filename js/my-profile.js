function myPerfil() {

    var perfilUser = {};

    perfilUser.nombre = document.getElementById('usr').value;
    perfilUser.apellido = document.getElementById('ape').value;
    perfilUser.edad = document.getElementById('age').value;
    perfilUser.email = document.getElementById('email').value;
    perfilUser.telefono = document.getElementById('tel').value;

    localStorage.setItem('usuario', JSON.stringify(perfilUser));
    alert("El perfil se ha guardado correctamente")
}

document.addEventListener('DOMContentLoaded', function (e) {
    var perfil = JSON.parse(localStorage.getItem('usuario'));

    document.getElementById('usr').value = perfil.nombre;
    document.getElementById('ape').value = perfil.apellido;
    document.getElementById('age').value = perfil.edad;
    document.getElementById('email').value = perfil.email;
    document.getElementById('tel').value = perfil.telefono;
})