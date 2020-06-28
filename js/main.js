/*class Frutas {

    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }

    getPrecio(cantidad){
        return this.precio * cantidad;
    }
}*/

const frutas = [
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
var totalCarrito = 0;

function allowDrop(ev) {
    ev.preventDefault();

}


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    /*
        let productoSeleccionado = ev.target.id;
         console.log("Producto seleccionado -> "+productoSeleccionado);
     
         console.log("recorremos el array de frutas");
         for (fruta of frutas){
             if(fruta.nombre === productoSeleccionado){
                 carrito.push(fruta);
                 totalCarrito += fruta.precio;
             }
         };
     
         console.log(totalCarrito);
    */

    var data = ev.dataTransfer.getData("text");
    // console.log(data);
    ev.target.appendChild(document.getElementById(data));
    testing();
}

function testing() {
    var correcto = 1;
    var frutasSeleccionadas = document.getElementsByClassName("imagen_fruta");
    for (var i = 0; i < frutasSeleccionadas.length; i++) {
        if (frutasSeleccionadas[i].parentNode.getAttribute("id") == "carrito") {
            // cogemos el id para identificar el producto
            // console.log(frutasSeleccionadas[i].getAttribute("id"));
            añadirCarrito(frutasSeleccionadas[i].getAttribute("id"))
        }
    }
}

function pintarCarrito(idFruta) {
    let frutaSeleccionada;

    for (fruta of frutas) {
        if (fruta.nombre === idFruta) {
            frutaSeleccionada = fruta;
        }
    }

    let table = document.getElementById("tabla_carrito")
    let tr = document.createElement("tr");
    let columna1 = document.createElement("td");
    let columna2 = document.createElement("td");
    let columna3 = document.createElement("td");
    let columna4 = document.createElement("td");

    columna1.innerHTML = frutaSeleccionada.nombre;
    tr.appendChild(columna1);

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "1 Ud");

    columna2.appendChild(input);
    tr.appendChild(columna2);

    columna3.innerHTML = frutaSeleccionada.precio + " €";
    tr.appendChild(columna3);

    let img = document.createElement("img");
    img.setAttribute("id", "trash");
    img.setAttribute("src", "./img/compartimiento.png")

    columna4.appendChild(img);
    tr.appendChild(columna4);

    table.appendChild(tr);
}

function añadirCarrito(id) {
    for (let i = 0; i < frutas.length; i++) {
        let nombreFruta = frutas[i].nombre;
        if (frutas[i].nombre === id && !carrito.includes(frutas[i])) {
            carrito.push(frutas[i]);
            pintarCarrito(frutas[i].nombre);
            totalCarrito += frutas[i].precio;
        }
    };
    calculaTotal(totalCarrito);
}

function calculaTotal(totalCarrito) {
    document.getElementById("total_carrito_precio").innerHTML = totalCarrito;
}

function estaContenido(idNombre) {
    for (fruta of carrito) {
        if (fruta.nombre === idNombre) {
            return true;
        }
    }
    return false;
}