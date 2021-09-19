var product = {};
var comments = {};
var prodRel = {};
var stars = "";
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
// funcion mostar prod, relacionados
//a = product.relatedProducts, b = prodRel 
function rel(a, b) {
    content = "";

    for (let i = 0; i < a.length; i++) {
        let inf = a[i];

        content += `
        <img class="img-fluid img-thumbnail ml-3" id="sub" src="` + b[inf].imgSrc + `" alt="" width="200px">
        
        `
        document.getElementById("relacionados").innerHTML = content;
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
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
});

