// Array de objeto: Producto
// productos cargados en archivo products.json


let products = [];

// Vinculos con HTML
const prodGalery = document.querySelector("#prod-galery");
const shopNum = document.querySelector("#shopNum");

const categoryButtons = document.querySelectorAll(".but-category");
let addButtons = document.querySelectorAll(".product__add");


// Acceso a base de datos propia con productos 

setTimeout(() => {  // asincronía para simular tiempo de carga de una base de datos externa
    fetch("../products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            loadProducts(products);
        })
}, 2000);


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


