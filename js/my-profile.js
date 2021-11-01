function cargarFoto() {
    let contenedorImg = document.getElementById('foto');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onload = function () {
        contenedorImg.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        contenedorImg.src = "img/user.png";
    }
}

function myPerfil() {
    var foto = document.getElementById('foto')
    var perfilUser = {};

    perfilUser.imagen = foto.src;
    perfilUser.nombre = document.getElementById('usr').value.trim();
    perfilUser.apellido = document.getElementById('ape').value.trim();
    perfilUser.edad = document.getElementById('age').value.trim();
    perfilUser.email = document.getElementById('email').value.trim();
    perfilUser.telefono = document.getElementById('tel').value.trim();

    if (perfilUser.nombre === "" || perfilUser.apellido === "" || perfilUser.edad === "" || perfilUser.email === "" || perfilUser.telefono === "") {
        alert("Hay campos sin completar, recuerda que no pueden quedar espacios vacios.")
    } else {
        localStorage.setItem('usuario', JSON.stringify(perfilUser));
        alert("El perfil se ha guardado correctamente")
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    var perfil = JSON.parse(localStorage.getItem('usuario'));

    document.getElementById('foto').src = perfil.imagen;
    document.getElementById('usr').value = perfil.nombre;
    document.getElementById('ape').value = perfil.apellido;
    document.getElementById('age').value = perfil.edad;
    document.getElementById('email').value = perfil.email;
    document.getElementById('tel').value = perfil.telefono;
})