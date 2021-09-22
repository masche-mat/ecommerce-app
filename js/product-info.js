var product = {};
var comments = {};
var prodRel = {};

//funcion para mostrar imgenes
function showImagesGallery(array) {

    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++) {
        var imageSrc = array[i];

        htmlContentToAppend += `
            <img class="img-fluid img-thumbnail ml-3 mt-2" id="sub" src="` + imageSrc + `" alt="" width="200px">
        `

        document.getElementById("imgPrincipal").innerHTML = htmlContentToAppend;
    }
}


//funcion para mostar comentarios
function comentarios(array) {
    var contenido = "";

    for (let i = 0; i < array.length; i++) {
        var info = array[i];
        var calif = parseInt(info.score);
        var star = "";

        if (calif === 1) {
            star = `<span class="fa fa-star checked"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>`
        } else if (info.score === 2) {
            star = `<span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>`
        } else if (info.score === 3) {
            star = `<span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star"></span>
           <span class="fa fa-star"></span>`
        } else if (info.score === 4) {
            star = `<span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star"></span>`
        } else {
            star = `<span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>
           <span class="fa fa-star checked"></span>`
        }

        contenido += `
        <div class="col-8 shadow p-4 mb-4 bg-white">
            <div class="row">
                <div class="col d-inline-flex">
                    <i class="fas fa-user-alt"></i>
                    <p class="ml-2" style="color: #118ab2">${info.user}</p>
                </div>
                <div class="col d-flex justify-content-end">
                <span class ="small d-flex justify-content-end mt-1">${info.dateTime}</span>      
                </div >
            </div >
            <div class="row">
                <div class="col">
                    <span class="">${info.description}</span>
                </div>
            </div>      
            <div class="row"> 
                <div class="col d-flex mt-3">
                    <p class="mr-5">Calificación: `+ star + `</p >       
                </div >
                    
            </div>
        </div >
            `
    }


    document.getElementById("comentarios").innerHTML = contenido;

}

// funcion mostar prod. relacionados
//a = product.relatedProducts, b = prodRel
function rel(a, b) {
    content = "";

    for (let i = 0; i < a.length; i++) {
        let inf = a[i];

        content += `
        <img class="img-fluid img-thumbnail ml-3" id="sub" src="` + b[inf].imgSrc + `" alt="prodRel.jpg" width="200px">
        
        `
        document.getElementById("relacionados").innerHTML = content;
    }
}

//funcion que simplifica la calificacion por estrellas
function califico(num) {
    let estrellas = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= num) {
            estrellas += `<span class="fa fa-star checked"></span>`
        } else {
            estrellas += `<span class="fa fa-star"></span>`
        }
    }
    return estrellas;
}

//funciones para fecha y hora formato digital
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function formatFecha(date) {
    var anno = date.getFullYear();
    var mes = checkTime((date.getMonth() + 1));
    var dia = checkTime(date.getDate());
    var hora = checkTime(date.getHours());
    var min = checkTime(date.getMinutes());
    var sec = checkTime(date.getSeconds());

    return anno + '-' + mes + '-' + dia + ' ' + hora + ':' + min + ':' + sec;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var form = document.getElementById('formComentar');
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            document.getElementById('nameProd').innerHTML = product.name;
            document.getElementById('precio').innerHTML = product.cost;
            document.getElementById('categoria').innerHTML = `Categoria: ` + product.category;
            document.getElementById('vendidos').innerHTML = product.soldCount + ` vendidos`;
            document.getElementById('descrip').innerHTML = product.description;
        }
        showImagesGallery(product.images);

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;


        };
        comentarios(comments);
    });

    //Esta parte de abajo corresponde a la entrega 4
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodRel = resultObj.data;
        }
        rel(product.relatedProducts, prodRel);
    })

    //funcion para nuevos comentarios
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var contenido = "";
        var calificacion = document.getElementById("selcali").value;
        var texto = document.getElementById("comment").value;
        var nombre = sessionStorage.getItem("nombre")
        var dataTime = new Date();//obtengo un objeto con la informacion 
        var fecha = formatFecha(dataTime);
        var star = califico(calificacion);

        if (texto.trim() === "") {
            alert("Por favor, haga un comentario sobre el producto")
        } else {

            contenido = `
        <div class="col-8 shadow p-4 mb-4 bg-white">
            <div class="row">
                <div class="col d-inline-flex">
                    <i class="fas fa-user-alt"></i>
                    <p class="ml-2" style="color: #118ab2">${nombre}</p>
                </div>
                <div class="col d-flex justify-content-end">
                <span class ="small d-flex justify-content-end mt-1">${fecha}</span>      
                </div >
            </div >
            <div class="row">
                <div class="col">
                    <span class="">${texto}</span>
                </div>
            </div>      
            <div class="row"> 
                <div class="col d-flex mt-3">
                    <p class="mr-5">Calificación: `+ star + `  </p >       
                </div >
                    
            </div>
        </div >
            `
        }
        document.getElementById("comentarios").innerHTML += contenido;

        form.reset();
    })
});
