let productsIn_shopCart = localStorage.getItem("storage_shopcart");
productsIn_shopCart = JSON.parse(productsIn_shopCart);

const shopCart_empty = document.querySelector("#shopCart_empty");
const shopCart_buyed = document.querySelector("#shopCart_buyed");

const shopCart_products = document.querySelector("#shopcart__products");
const shopCart_interaction = document.querySelector("#shopcart__interaction");
let buttons_delete = document.querySelectorAll(".shopcart__products__delete");
const button_clear = document.querySelector("#shopcart__interaction__delete");
const button_buy = document.querySelector("#shopcart__interaction__buy");
const show_total = document.querySelector("#total");


load_shopCart();

button_clear.addEventListener("click", delete_shopCart);
button_buy.addEventListener("click", buy_shopCart);



// FUNCIONES

function load_shopCart() {
    if (productsIn_shopCart && productsIn_shopCart.length > 0) {

        shopCart_empty.classList.add("disabled");
        shopCart_products.classList.remove("disabled");
        shopCart_interaction.classList.remove("disabled");
        shopCart_buyed.classList.add("disabled");
    
        shopCart_products.innerHTML = "";
    
        productsIn_shopCart.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("shopcart__product");
            div.innerHTML = `
                <img class="shopcart__product__image" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="shopcart__product__title">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="shopcart__product__quantity">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="shopcart__product__price">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="shopcart__product__subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="shopcart__product__delete" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            shopCart_products.append(div);
        })
    
    } else {
        shopCart_empty.classList.remove("disabled");
        shopCart_products.classList.add("disabled");
        shopCart_interaction.classList.add("disabled");
        shopCart_buyed.classList.add("disabled");
    }

    update_deleteButtons();
    update_total();
}

function update_deleteButtons() {
    buttons_delete = document.querySelectorAll(".shopcart__products__delete");//SE PODRIA BORRAR

    buttons_delete.forEach(boton => {
        boton.addEventListener("click", delete_from_shopCart);
    });
}


function delete_from_shopCart(e) {
    const idBoton = e.currentTarget.id;
    const index = productsIn_shopCart.findIndex(product => product.id === idBoton);
    
    productsIn_shopCart.slice(index, 1);
    load_shopCart();

    localStorage.setItem("storage_shopcart", JSON.stringify(productsIn_shopCart));

}

function update_total() {
    const totalCalculated = productsIn_shopCart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    show_total.innerText = `$${totalCalculated}`;
}

function delete_shopCart() {
    productsIn_shopCart.length = 0;
    localStorage.setItem("storage_shopcart", JSON.stringify(productsIn_shopCart));
    load_shopCart();
}

function buy_shopCart() {

    productsIn_shopCart.length = 0;
    localStorage.setItem("storage_shopcart", JSON.stringify(productsIn_shopCart));
    
    shopCart_empty.classList.add("disabled");
    shopCart_products.classList.add("disabled");
    shopCart_interaction.classList.add("disabled");
    shopCart_buyed.classList.remove("disabled");

}