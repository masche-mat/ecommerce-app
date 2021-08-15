function listProducts(array){

    let contenido = "";
    for(let i = 0; i < array.length; i++){
        let info = array[i];
        //list-group-item list-group-item-action: el 1ero crea un item dentro de la lista seria como bloque, el 2do hace que al pasar el cursor cambie el background.
        //con row se crea una fila que contiene dos div uno abarca 3 columnas es pecificado en col-3 y el otro el resto de columnas con col.
        contenido += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ info.name +`</h4>
                        <small class="text-muted">` + info.cost + ` U$S</small>
                    </div>
                    <p>${info.description}</p>

                </div>
            </div>
        </div>
        `

        document.getElementById("listaProductos").innerHTML = contenido;
    }
}

fetch(PRODUCTS_URL)
.then(respuesta => respuesta.json())
.then(datos => listProducts(datos))


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//var categoriesArray = [];
/*document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});*/