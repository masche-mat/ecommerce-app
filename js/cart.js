const URL_CART_INFO_TWO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cart = {};
var envio = 0.15;
var button = document.getElementById('buttonmodal');

//funcion para mostrar articulos
function articles(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let info = array[i];

        contenido +=
            `<div class="row shadow p-4 mb-4 bg-white">
            <div class="col d-flex justify-content-around align-items-center">
                <img class="img-fluid img-thumbnail" src="${info.src}" alt="articulo.
                jpg" width="100px">
                <b>${info.name}</b>
                <p style="margin">Precio: $ <span class="unitCost">${info.unitCost}</span></p>
                <label style="margin-top: 0px">Cant. <input type="number" min="0" max="99" value="${info.count}" id="inputCant" 
                onkeyup="calcularTotal()"
                 onclick="calcularTotal()"
               >
                </label>
                <p>Subtotal: $ <span id="subcosto"></span></p>
            </div>
        </div>`
    }

    document.getElementById('articulo').innerHTML = contenido;
}

//funcion para determinar costos
function calcularTotal() {
    let costoProd = document.getElementsByClassName('unitCost');
    let cantProd = document.querySelectorAll("input");
    let subtotal = 0;
    let costoEnvio = 0;


    for (let i = 0; i < costoProd.length; i++) {
        if (isNaN(parseFloat(cantProd[i].value))) {
            subtotal = 0;
        } else {
            subtotal += parseFloat(costoProd[i].innerHTML) * parseFloat(cantProd[i].value);
        }
    }
    document.getElementById('subcosto').innerHTML = subtotal;
    document.getElementById('productCostText').innerHTML = ` $ ${subtotal}`;
    costoEnvio = (Math.round(subtotal * envio * 100) / 100);
    document.getElementById('envioCostText').innerHTML = ` $ ${costoEnvio}`;
    document.getElementById('totalCostText').innerHTML = ` $ ${subtotal + costoEnvio}`;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data;
            articles(cart.articles);
        };
        calcularTotal();
    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        envio = 0.15;
        calcularTotal();
    });

    document.getElementById("expressradio").addEventListener("change", function () {
        envio = 0.07;
        calcularTotal();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        envio = 0.05;
        calcularTotal();
    });

});

//Validar compra
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()




/*button.addEventListener('click', function(){
    let direccion = document.getElementById('direccion').value.trim();
    let numpuerta = document.getElementById('numPuerta').value;
    let esq = document.getElementById('esquina').value.trim();
    let pais = document.getElementById('pais').value.trim();

   if (document.getElementById('transf').checked || document.getElementById('credito').checked && direccion !== "" || numpuerta !== undefined || esq !== "" || pais !== ""){alert("Su compra ha sido enviada")} else {
       alert("Faltan completar algunos capos del formulario");
   }
})*/

/*document.getElementById('botoncito').addEventListener('click', function(event){*/
/*
var forms = document.getElementById('formEnvio');
forms.addEventListener('submit', function(event){
    event.preventDefault();

    var direccion = document.getElementById('direccion');
    var numpuerta = document.getElementById('numPuerta');
    var esq = document.getElementById('esquina');
    var pais = document.getElementById('pais');
    direccion.classList.remove('is-invalid');
    direccion.classList.remove('is-valid');
    numpuerta.classList.remove('is-invalid');
    numpuerta.classList.remove('is-valid');
    esq.classList.remove('is-invalid');
    esq.classList.remove('is-valid');
    pais.classList.remove('is-invalid');
    pais.classList.remove('is-valid');

    if (direccion.value.trim() === "" || numpuerta.value.trim() === "" || esq.value === "" || pais.value.trim() === ""){
        direccion.classList.add('is-invalid');
        numpuerta.classList.add('is-invalid');
        esq.classList.add('is-invalid');
        pais.classList.add('is-invalid');
        
    } else {
        direccion.classList.add('is-valid');
        numpuerta.classList.add('is-valid');
        esq.classList.add('is-valid');
        pais.classList.add('is-valid');
        alert('Compre enviada');
    }
}
)*/