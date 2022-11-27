// Array de objeto: Producto

const productos = [

    // Electronica
    {
        id: "prodElec-001",
        imagen: "../../assets/productos/nudemcu-esp8266.jfif",
        titulo: "Nudemcu Wifi ESP8266",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 1000
    },
    {
        id: "prodElec-002",
        imagen: "../../assets/productos/arduino-uno.jfif",
        titulo: "Arduino Uno Ch340",
        descripcion: "Placa de desarrollo basada en el microcontrolador Atmega328 + Ch340g. Digital I/O Pins 14. Analog Input Pins 6",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 5000
    },
    {
        id: "prodElec-003",
        imagen: "../../assets/productos/raspberrypi-4.jfif",
        titulo: "Raspberry Pi4 Model B 4gb",
        descripcion: "Procesador 64-bit quad-core Cortex-A72. 4GB LPDDR4 RAM.2 puertos HDMI. 2 puertos USB 3.0",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 65000
    },
    {
        id: "prodElec-004",
        imagen: "../../assets/productos/raspberry-display7.jfif",
        titulo: "RDispaly 7 tactil Raspberry",
        descripcion: "Pantalla 7 pulgadas touchscreen original raspberry Element14. Unico con interfaz DSI.",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 50000
    },
    {
        id: "prodElec-005",
        imagen: "../../assets/productos/modulo-relex2.jfif",
        titulo: "Modulo Relay de 2 canales",
        descripcion: "Módulo de reles para conmutación de cargas de potencia. Los contactos de los relevadores están diseñados para conmutar cargas de hasta 10 A y 250VAC",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 50000
    },

    // Iluminacion
    {
        id: "prodIlum-001",
        imagen: "../../assets/productos/nudemcu-esp8266.jfif",
        titulo: "prod3",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Iluminacion",
            id_html: "prod-ilumination"
        },
        precio: 2000
    },
    {
        id: "prodIlum-002",
        imagen: "../../assets/productos/nudemcu-esp8266.jfif",
        titulo: "prod4",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Iluminacion",
            id_html: "prod-ilumination"
        },
        precio: 3000
    },

    // Riego
    {
        id: "prodRiego-001",
        imagen: "../../assets/productos/nudemcu-esp8266.jfif",
        titulo: "prod5",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Riego",
            iid_html: "prod-irrigation"
        },
        precio: 2000
    },
    {
        id: "prodRiego-002",
        imagen: "../../assets/productos/nudemcu-esp8266.jfif",
        titulo: "prod6",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Riego",
            id_html: "prod-irrigation"
        },
        precio: 5000
    },

];

// Vinculos con HTML
const prodGalery = document.querySelector("#prod-galery");
const shopNum = document.querySelector("#shopNum");

const botonesCategorias = document.querySelectorAll(".but-category");
let botonesAgregar = document.querySelectorAll(".product__add");


cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "prod-all") {
            const productoCategoria = productos.find(producto => producto.categoria.id_html === e.currentTarget.id);
            const productosBoton = productos.filter(producto => producto.categoria.id_html === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }

    })
});


let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarshopNum();
} else {
    productosEnCarrito = [];
}



// FUNCIONES

function cargarProductos(productosElegidos) {

    prodGalery.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <div class="product__img">
                <img src="${producto.imagen}" alt="${producto.titulo}">
            </div>
            <div class="product__text">
                <h4 class="product__title">${producto.titulo}</h4>
                <p class="product__descrip">${producto.descripcion}</p>
                <p class="product__cost">$${producto.precio}</p>
            </div>
            <div class="product__button">
                <button class="product__add" id="${producto.id}">Agregar</button>
            </div>
        `;

        prodGalery.append(div);
    })
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".product__add");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idCurrent = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idCurrent);

    if(productosEnCarrito.some(producto => producto.id === idCurrent)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idCurrent);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarshopNum();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarshopNum() {
    let nuevoshopNum = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    shopNum.innerText = nuevoshopNum;
}