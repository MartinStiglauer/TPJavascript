var productos = [
    {   id: 1,
        nombre: "harina",
        precioUnitario: 35,
        cantidad: 9
        
    },
    {   id: 2,
        nombre: "pan",
        precioUnitario: 25,
        cantidad: 120
        
    },
    {   id: 3,
        nombre: "papa",
        precioUnitario: 52,
        cantidad: 10
        
    },
    {   id: 4,
        nombre: "palta",
        precioUnitario: 55,
        cantidad: 23
        
    },
    {   id: 5,
        nombre: "fideos",
        precioUnitario: 85,
        cantidad: 58
        
    },
    {   id: 6,
        nombre: "aceite",
        precioUnitario: 350,
        cantidad: 85
        
    },
    {   id: 7,
        nombre: "sopa",
        precioUnitario: 86,
        cantidad: 12
        
    },
    {   id: 8,
        nombre: "mermelada",
        precioUnitario: 108,
        cantidad: 58
        
    },
    {   id: 9,
        nombre: "porotos",
        precioUnitario: 69,
        cantidad: 74
        
    },
    {   id: 10,
        nombre: "lentejas",
        precioUnitario: 85,
        cantidad: 14
        
    },
    {   id: 11,
        nombre: "mandarina",
        precioUnitario: 43,
        cantidad: 86
        
    },
    {   id: 12,
        nombre: "banana",
        precioUnitario: 79,
        cantidad: 111
        
    },
    {   id: 13,
        nombre: "leche de almendras",
        precioUnitario: 145,
        cantidad: 54
        
    },
    {   id: 14,
        nombre: "papel higienico",
        precioUnitario: 147,
        cantidad: 1025
        
    },
    {   id: 15,
        nombre: "lavandina",
        precioUnitario: 55,
        cantidad: 95
        
    },
    {   id: 16,
        nombre: "alcohol en gel",
        precioUnitario: 123,
        cantidad: 62
        
    },
    {   id: 17,
        nombre: "shampoo",
        precioUnitario: 400,
        cantidad: 41
        
    },
    {   id: 18,
        nombre: "arroz",
        precioUnitario: 66,
        cantidad: 100
        
    },
    {   id: 19,
        nombre: "harina",
        precioUnitario: 35,
        cantidad: 46
        
    },
    {   id: 20,
        nombre: "salsa de tomate",
        precioUnitario: 35,
        cantidad: 35
        
    },
];

var carrito = [

];

var contadorarray = -1;
var TotalCompra = 0;

function crearElementoTablaProductos(producto){
    //Precio
    var tdPrecio = document.createElement('td');
    var txtPrecio = document.createTextNode("$ " + producto.precioUnitario);
    tdPrecio.setAttribute("Class", "TablaCentro");
    tdPrecio.appendChild(txtPrecio);
    //Cantidad
    var tdCantidad = document.createElement('td');
    var txtCantidad = document.createTextNode(producto.cantidad);
    tdCantidad.setAttribute("id", "$"+producto.id);
    tdCantidad.setAttribute("Class", "TablaCentro");
    tdCantidad.appendChild(txtCantidad);
    //Nombre
    var tdNombre = document.createElement('td');
    var txtNombre = document.createTextNode(producto.nombre);
    tdNombre.appendChild(txtNombre);
    //Input
    var tdInput = document.createElement('td');
    var Input = document.createElement('Input');
    Input.setAttribute("type", "number");
    Input.setAttribute("placeholder", "Cantidad a Comprar");
    tdInput.setAttribute("Class", "TablaCentro");
    tdInput.appendChild(Input);
    //Boton
    var tdBoton = document.createElement('td');
    var btnCompra = document.createElement('button');
    var txtBoton = document.createTextNode("Comprar");
    btnCompra.appendChild(txtBoton);
    btnCompra.addEventListener("click", agregarCarrito);
    btnCompra.setAttribute("class", "btn btn-info");
    btnCompra.setAttribute("id", producto.id);
    tdBoton.appendChild(btnCompra);
    //Creo el tr
    var tr = document.createElement('tr');
    //tr.appendChild(tdImg); el de la imagen no aplicado
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdInput);
    tr.appendChild(tdBoton);
    var tbody = document.querySelector('.tbodyProductos');
    tbody.appendChild(tr);
}



productos.forEach(item => {
    crearElementoTablaProductos(item);
});

function crearElementoTablaCarrito(carritocompra){
    //Precio
    var tdPrecio = document.createElement('td');
    var txtPrecio = document.createTextNode("$ " + carritocompra.precioUnitario * carritocompra.cantidad);
    tdPrecio.setAttribute("Class", "TablaCentro");
    tdPrecio.appendChild(txtPrecio);
    //Cantidad
    var tdCantidad = document.createElement('td');
    var txtCantidad = document.createTextNode(carritocompra.cantidad);
    tdCantidad.setAttribute("Class", "TablaCentro");
    tdCantidad.appendChild(txtCantidad);
    //Nombre
    var tdNombre = document.createElement('td');
    var txtNombre = document.createTextNode(carritocompra.nombre);
    tdNombre.appendChild(txtNombre);
    //Boton
    var tdBoton = document.createElement('td');
    var btnBorrar = document.createElement('button');
    var txtBoton = document.createTextNode("Borrar");
    btnBorrar.appendChild(txtBoton);
    btnBorrar.addEventListener("click", borrarCarrito);
    btnBorrar.setAttribute("class", "btn btn-danger");
    btnBorrar.setAttribute("id", "Delete" + carritocompra.id);
    tdBoton.appendChild(btnBorrar);
    //Creo el tr
    var tr = document.createElement('tr');
    //Le agrego al tr cada columna
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdBoton);
    var tbody = document.querySelector('.tbodyCarrito');
    tbody.appendChild(tr);
}

function agregarCarrito(e){
    var input = e.target.parentNode.previousSibling.firstChild;
    var cantidadcomprada = input.value;

    if (cantidadcomprada == '') {
        alert('Cantidad de productos erronea');
        return;
    } 

    var idbutton = e.target.id;

    //Se verifica si el producto fue comprado o no.
    var indexcomprados = carrito.findIndex(p => p.id == idbutton);
    if (indexcomprados != -1) {
        alert('Este producto ya fue comprado');
        return;
    }

    var index = productos.findIndex(p => p.id == idbutton);
    var producto = productos[index];

    var id = producto.id;
    var nombre = producto.nombre;
    var cantidad = producto.cantidad;
    var precio = producto.precioUnitario;

    if (cantidadcomprada > cantidad) {
        alert('No hay suficiente Stock!');
        return;
    }

    var stockhtml = e.target.parentNode.previousSibling.previousSibling.previousSibling.firstChild;
    var stock = cantidad - cantidadcomprada;
    stockhtml.textContent = stock;
    producto.cantidad = stock;

    var productocomprado = {
        id: id,
        nombre: nombre,
        precioUnitario: precio,
        cantidad: cantidadcomprada,
    };

    carrito.push(productocomprado);

    contadorarray = contadorarray + 1; //Genero el contador para saber la posicion del ultimo producto que ingreso a la array, y asi tambien lo envio a imprimirse

    crearElementoTablaCarrito(carrito[contadorarray]);

    input.value = '';

    var totalcompraactualA = parseInt(document.getElementById("TotalCompra").textContent, 10);

    document.getElementById("TotalCompra").textContent = totalcompraactualA + (cantidadcomprada * productocomprado.precioUnitario);
}

function borrarCarrito(e) {
    var idbutton = e.target.id;

    var idbuttonnumber = idbutton.replace('Delete', '');

    var index = carrito.findIndex(p => p.id == idbuttonnumber); //busco el producto en el carrito

    var cantidadborrada = carrito[index].cantidad
    var preciocarrito = carrito[index].precioUnitario

    carrito.splice(index, 1);


    var button = document.getElementById(idbutton); 
    var nodotr = button.parentNode.parentNode; //encuentro el tr

    contadorarray = contadorarray - 1; //le saco 1 a la array para saber la ultima posicion del array

    var num1 = parseInt(cantidadborrada, 10)  //convierto la cantidad de productos que habia en el carrito a numero
    var num2 = parseInt(productos[index].cantidad, 10); //convierto la cantidad de productos en stock sin la suma de lo borrado a numero

    nodotr.childNodes.forEach(nodotd => {
        // se obtienen todos los nodos del <td> y se borra
        nodotd.childNodes.forEach(n =>{
                nodotd.removeChild(n);
        });
    });

    productos[index].cantidad = num1 + num2; //sumo las variables de productos

    document.getElementById("$"+idbuttonnumber).textContent = productos[index].cantidad //le igualo la cantidad ya sumada de productos al html en stock

    var totalcompraactualB = parseInt(document.getElementById("TotalCompra").textContent, 10);

    document.getElementById("TotalCompra").textContent = totalcompraactualB   - (num1 * preciocarrito); //actualizo el total de la compra
}


function FinalizarCompra() {
    alert('El total de su compra es: $' + parseInt(document.getElementById("TotalCompra").textContent, 10));
}