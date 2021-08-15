//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function (e) {

});*/
var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
        //list-group-item list-group-item-action: el 1ero crea un item dentro de la lista seria como bloque, el 2do hace que al pasar el cursor cambie el background.
        //con row se crea una fila que contiene dos div uno abarca 3 columnas es pecificado en col-3 y el otro el resto de columnas con col.
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.cost + ` U$S</small>
                    </div>
                    <p>${category.description}</p>

                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

fetch(PRODUCTS_URL)
.then(response => response.json())
.then(datos => showCategoriesList(datos))


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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