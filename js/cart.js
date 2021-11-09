const URL_CART_INFO_TWO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cart = {};
var envio = 0.15;

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
