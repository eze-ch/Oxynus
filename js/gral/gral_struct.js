//UPDATE CARTSHOP NUMBER

let productsIn_shopCart = localStorage.getItem("storage_shopcart");
productsIn_shopCart = JSON.parse(productsIn_shopCart);

const shopNum = document.querySelector("#shopNum");

let newShopNum = productsIn_shopCart.reduce((acc, product) => acc + product.cantidad, 0);
shopNum.innerText = newShopNum;
