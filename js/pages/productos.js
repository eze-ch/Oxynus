// Array de objeto: Producto

const products = [

    // Electronica
    {
        id: "prodElec-001",
        imagen: ".././assets/productos/nudemcu-esp8266.jfif",
        titulo: "Nudemcu Wifi ESP8266",
        descripcion: "Placa de desarrollo basada en el popular chip ESP8266. Con este sencillo modulo se puede realizar el prototipo de cualquier sistema para el loT. 10 GPIO, cada GPIO puede ser PWM, I2C, 1-Wire.",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 1000,
        cantidad:0
    },
    {
        id: "prodElec-002",
        imagen: ".././assets/productos/arduino-uno.jfif",
        titulo: "Arduino Uno Ch340",
        descripcion: "Placa de desarrollo basada en el microcontrolador Atmega328 + Ch340g. Digital I/O Pins 14. Analog Input Pins 6",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 5000,
        cantidad:0
    },
    {
        id: "prodElec-003",
        imagen: ".././assets/productos/raspberrypi-4.jfif",
        titulo: "Raspberry Pi4 Model B 4gb",
        descripcion: "Procesador 64-bit quad-core Cortex-A72. 4GB LPDDR4 RAM.2 puertos HDMI. 2 puertos USB 3.0",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 65000,
        cantidad:0
    },
    {
        id: "prodElec-004",
        imagen: ".././assets/productos/raspberry-display7.jfif",
        titulo: "RDispaly 7 tactil Raspberry",
        descripcion: "Pantalla 7 pulgadas touchscreen original raspberry Element14. Unico con interfaz DSI.",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 50000,
        cantidad:0
    },
    {
        id: "prodElec-005",
        imagen: ".././assets/productos/modulo-relex2.jfif",
        titulo: "Modulo Relay de 2 canales",
        descripcion: "Módulo de reles para conmutación de cargas de potencia. Los contactos de los relevadores están diseñados para conmutar cargas de hasta 10 A y 250VAC",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 50000,
        cantidad:0
    },
    {
        id: "prodElec-006",
        imagen: ".././assets/productos/sensor-nivel_ultrasonico.jfif",
        titulo: "Sensor ultrasonico para nivel",
        descripcion: "Sensor ultrasonico para medir nivel de liquidos. 4-20mA",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 3000,
        cantidad:0
    },
    {
        id: "prodElec-007",
        imagen: ".././assets/productos/tecla_Wifi.png",
        titulo: "Tecla táctil Wifi",
        descripcion: "Tecla de encendido para luz, tactil con Wifi. Color negra o blanca.",
        categoria: {
            nombre: "Electronica",
            id_html: "prod-electronic"
        },
        precio: 7000,
        cantidad:0
    },

    
    // Iluminacion
    {
        id: "prodIlum-001",
        imagen: ".././assets/productos/ledRGB.png",
        titulo: "Tira led RGB",
        descripcion: "Tira de 20mts de leds RGB programables y configurables por wifi",
        categoria: {
            nombre: "Iluminacion",
            id_html: "prod-ilumination"
        },
        precio: 2000,
        cantidad:0
    },


    // Riego
    {
        id: "prodRiego-001",
        imagen: ".././assets/productos/electrovalvula.png",
        titulo: "Electroválvula de riego",
        descripcion: "Electrovalvula para agua de riego de marca Hunter. Con sistema de autolimpieza. 24Vca.",
        categoria: {
            nombre: "Riego",
            id_html: "prod-irrigation"
        },
        precio: 8000,
        cantidad:0
    },

];

// Vinculos con HTML
const prodGalery = document.querySelector("#prod-galery");
const shopNum = document.querySelector("#shopNum");

const categoryButtons = document.querySelectorAll(".but-category");
let addButtons = document.querySelectorAll(".product__add");


loadProducts (products);

categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {

        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "prod-all") {
            const productsFilter = products.filter(product => product.categoria.id_html === e.currentTarget.id);
            loadProducts(productsFilter);
        } else {
            loadProducts(products);
        }

    })
});


let productsIn_shopCart;
let productsIn_shopCartLS = localStorage.getItem("storage_shopcart");


if (productsIn_shopCartLS) {
    productsIn_shopCart = JSON.parse(productsIn_shopCartLS);
    updateShopNum();
} else {
    productsIn_shopCart = [];
}



// FUNCIONES

function loadProducts(chosenProduct) {

    prodGalery.innerHTML = "";

    chosenProduct.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <div class="product__img">
                <img src="${product.imagen}" alt="${product.titulo}">
            </div>
            <div class="product__text">
                <h4 class="product__title">${product.titulo}</h4>
                <p class="product__descrip">${product.descripcion}</p>
                <p class="product__cost">$${product.precio}</p>
            </div>
            <div class="product__button">
                <button class="product__add" id="${product.id}">Agregar</button>
            </div>
        `;

        prodGalery.append(div);
    })

    updateAddButtons();
}


function updateAddButtons() {
    addButtons = document.querySelectorAll(".product__add");

    addButtons.forEach(button => {
        button.addEventListener("click", addTo_shopCart);
        button.addEventListener("click", () => {
            Toastify({
                text: "PRODUCTO AGREGADO",
                destination: ".././paginas/carrito.html",
                //node: e.target.innerText,
                avatar: ".././assets/iconos/icons8-de-acuerdo-100.svg",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "white",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        });
    });
}

function addTo_shopCart(e) {
    const idCurrent = e.currentTarget.id;
    const addedProduct = products.find(product => product.id === idCurrent);

    if(productsIn_shopCart.some(product => product.id === idCurrent)) {
        const index = productsIn_shopCart.findIndex(product => product.id === idCurrent);
        productsIn_shopCart[index].cantidad++;
    } else {
        addedProduct.cantidad = 1;
        productsIn_shopCart.push(addedProduct);
    }

    updateShopNum();
    localStorage.setItem("storage_shopcart", JSON.stringify(productsIn_shopCart));
}


function updateShopNum() {
    let newShopNum = productsIn_shopCart.reduce((acc, product) => acc + product.cantidad, 0);
    shopNum.innerText = newShopNum;
}


