const frutas   = [
    {
        nombre: "Banana",
        precio: 1.5
    },
    {
        nombre: "Cereza",
        precio: 2.5
    },
    {
        nombre: "Arandano",
        precio: 2.0
    },
    {
        nombre: "Frambuesa",
        precio: 3.5
    }, {
        nombre: "Fresa",
        precio: 3
    }, {
        nombre: "Granada",
        precio: 2.2
    }, {
        nombre: "Kiwi",
        precio: 1.2
    }, {
        nombre: "Mango",
        precio: 3.5
    }, {
        nombre: "Manzana",
        precio: 1.9
    }, {
        nombre: "Melocoton",
        precio: 1.5
    }, {
        nombre: "Mora",
        precio: 4.5
    }, {
        nombre: "Naranja",
        precio: 1.1
    }, {
        nombre: "Pera",
        precio: 3
    }, {
        nombre: "Piña",
        precio: 2.7
    }, {
        nombre: "Sandia",
        precio: 0.5
    }, {
        nombre: "Uva",
        precio: 2.5
    },
]

var carrito = [];
var totalCarrito = 0.0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var fruta = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(fruta));
    actualizaEstado(fruta);
}

function actualizaEstado(fruta) {
    var correcto = 1;
    var frutasSeleccionadas = document.getElementsByClassName("imagen_fruta");
    for (var i = 0; i < frutasSeleccionadas.length; i++) {
        if (frutasSeleccionadas[i].parentNode.getAttribute("id") === "carrito"
            && fruta === frutasSeleccionadas[i].getAttribute("id")
        ) {
            // cogemos el id para identificar el producto
            console.log("añadirlo");
            // console.log(frutasSeleccionadas[i].getAttribute("id"));
            añadirCarrito(frutasSeleccionadas[i].getAttribute("id"))
        }
        if (frutasSeleccionadas[i].parentNode.getAttribute("id") === "mostrador"
            && fruta === frutasSeleccionadas[i].getAttribute("id")
        ) {
            console.log("quitarlo");
            // cogemos el id para identificar el producto
            let idFruta = frutasSeleccionadas[i].getAttribute("id");
            quitarloCarrito(idFruta)
        }
    }
}

function pintarCarrito() {
    limpiarCarrito();
    let table = document.getElementById("tabla_body")

    for (fruta of carrito) {
        let tr = document.createElement("tr");
        let columna1 = document.createElement("td");
        let columna2 = document.createElement("td");
        let columna3 = document.createElement("td");
        let columna4 = document.createElement("td");

        columna1.innerHTML = fruta.nombre;
        tr.appendChild(columna1);

        //let input = document.createElement("input");
        //input.setAttribute("type", "number");
        //input.setAttribute("placeholder", "1 Ud");

        //columna2.appendChild(input);
        columna2.innerHTML = "1 Ud";
        tr.appendChild(columna2);

        columna3.innerHTML = fruta.precio + " €";
        tr.appendChild(columna3);

        let img = document.createElement("img");
        img.setAttribute("id", "trash");
        let funcion = "quitarFruta( " + fruta.nombre + ")";
        img.setAttribute("onClick", funcion);
        img.setAttribute("src", "./img/compartimiento.png")

        columna4.appendChild(img);
        tr.appendChild(columna4);

        table.appendChild(tr);
    }
}

function quitarFruta(nombreFruta){
    console.log(  nombreFruta.id  );
    quitarloCarrito(nombreFruta.id)
}

function añadirCarrito(id) {
    for (let i = 0; i < frutas.length; i++) {
        let nombreFruta = frutas[i].nombre;
        if (nombreFruta === id && !carrito.includes(frutas[i])) {
            carrito.push(frutas[i]);
            pintarCarrito();
            totalCarrito += parseFloat(frutas[i].precio);
        }
    };
    pintartTotal(totalCarrito);
}


function limpiarCarrito() {
    let table = document.getElementById("tabla_body")
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }
}


function quitarloCarrito(id) {
    let idFruta = id;
    for (let i = 0; i < carrito.length; i++) {
        let nombreFruta = carrito[i].nombre;
        let precioFruta = carrito[i].precio;

        if (nombreFruta === idFruta && carrito.includes(carrito[i])) {
            carrito = filtrarCarrito(carrito[i]);
            pintarCarrito();
            totalCarrito -= parseFloat(precioFruta);
        }
    };
    pintartTotal(totalCarrito);
}


function filtrarCarrito(fruta) {
    let carritoAux = [];
    for (frutaCarrito of carrito) {
        if (fruta.nombre !== frutaCarrito.nombre) {
            if (!carritoAux.includes(fruta)) {
                carritoAux.push(frutaCarrito);
            }
        }
    }
    return carritoAux;
}

function pintartTotal(totalCarrito) {
    document.getElementById("total_carrito_precio").innerHTML = totalCarrito.toString();
}

function estaContenido(idNombre) {
    for (fruta of carrito) {
        if (fruta.nombre === idNombre) {
            return true;
        }
    }
    return false;
}