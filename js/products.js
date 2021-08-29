var minCount = undefined;
var maxCount = undefined;
var arrPrincipal = undefined;

function listProducts(array) {
    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let info = array[i];

        contenido +=
            `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + info.name + ` - U$D ` + info.cost + `</h4>
                        <small class="text-muted">` + info.soldCount + ` Vendidos</small>
                    </div>
                    <p>${info.description}</p>

                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("listaProductos").innerHTML = contenido;
}


/*fetch(PRODUCTS_URL)
    .then((respuesta) => respuesta.json())
    .then((datos) => listProducts(datos));*/

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//var categoriesArray = [];
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            //Muestro las categorías ordenadas
            listProducts(productArray);
            arrPrincipal = productArray;
        }
    });
    //lista productos precio ascendente
    document.getElementById('sortAsc').addEventListener('click', function () {
        var arrayAsc = [];

        arrayAsc = arrPrincipal.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount < bCount) { return -1; }
            if (aCount > bCount) { return 1; }
            return 0;
        });
        listProducts(arrayAsc);
    });
    //lista prod. precio descendente
    document.getElementById('sortDes').addEventListener('click', function () {
        var arrayDesc = [];

        arrayDesc = arrPrincipal.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
        listProducts(arrayDesc);
    });
    //lista prod. segun relevancia
    document.getElementById('sortRel').addEventListener('click', function () {
        var arrayRel = [];

        arrayRel = arrPrincipal.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
        listProducts(arrayRel);
    });
    //limpiar rangos en filtros max-min
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        listProducts(productArray);
        arrPrincipal = productArray;
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        var minCount = document.getElementById("rangeFilterCountMin").value;
        var maxCount = document.getElementById("rangeFilterCountMax").value;
        var arrayFilter = [];
        //solo para rango min
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            var arrayFilter = productArray.filter(call => call.cost >= minCount);
            listProducts(arrayFilter);
            arrPrincipal = arrayFilter;
        }
        //solo para rango max
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            var arrayFilter = productArray.filter(call => call.cost <= maxCount);
            listProducts(arrayFilter);
            arrPrincipal = arrayFilter;
        }
        //para ambos rangos
        if (((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) && ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0)) {
            var arrayFilter = productArray.filter(call => call.cost >= minCount && call.cost <= maxCount);
            listProducts(arrayFilter);
            arrPrincipal = arrayFilter;
        }

    });
});
//list-group-item list-group-item-action: el 1ero crea un item dentro de la lista seria como bloque, el 2do hace que al pasar el cursor cambie el background.
        //con row se crea una fila que contiene dos div uno abarca 3 columnas es pecificado en col-3 y el otro el resto de columnas con col.