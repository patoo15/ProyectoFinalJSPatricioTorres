// // CART;
// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close");

// cartIcon.onclik = () => {
//   cart.classList.add("active");
// };
// closeCart.onclik = () => {
//   cart.classList.remove("active");
// };
const contentShop = document.getElementById("shop-content");
const iconCart = document.getElementById("cart-icon");

let cartshop = [];
class products {
  constructor(nombre, precio, img, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.id = id;
  }
}
// FUNCTIONS
//FUNCION PARA AGREGAR ITEMS AL CARRITO
function addCart(event) {
  const button = event.target;
  const item = button.closest(".card-product");

  const itemTitle = item.querySelector(".product-title").textContent;

  const itemPrice = item.querySelector(".price").textContent;

  const imgItem = item.querySelector(".card-img").src;

  addItem(itemTitle, itemPrice, imgItem);
}
const itemContainer = document.querySelector(".cart-content");

function addItem(itemTitle, itemPrice, imgItem) {
  // const elementsTitle = itemContainer.getElementsByClassName(".cartItemTitle");
  // for (let i = 0; i < elementsTitle.length; i++) {
  //   if (elementsTitle[i].innerText === itemTitle) {
  //     let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector(".quantity"); //PARA QUE SUBA EL CONTADOR Y NO SE AGREGE OTRO PRODUCTO
  //     elementQuantity.value++;
  //     return;
  //   }
  // }

  const shoppingCart = document.createElement("div");
  const cartContent = `<div class="cart-box shoppingCartItem">
  <img src="${imgItem}" alt="" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title cartItemTitle">${itemTitle}</div>
    <div class="cart-price">${itemPrice}</div>
    <input type="number" value="1" class="quantity" />
  </div>
  <i class="bx bx-undo cart-remove"></i>
</div>`;
  shoppingCart.innerHTML = cartContent;
  itemContainer.append(shoppingCart);

  shoppingCart.querySelector(".cart-remove").addEventListener("click", removeShopItem);

  shoppingCart.querySelector(".quantity"), addEventListener("change", quantityChange);

  updateTotal();
}
//FUNCION PARA SUMAR PRECIOS
function updateTotal() {
  let total = 0;
  const cartTotal = document.querySelector(".total-price");

  const shopCartItems = document.querySelectorAll(".shoppingCartItem");

  shopCartItems.forEach((shoppingCartItem) => {
    const shopPriceItem = shoppingCartItem.querySelector(".cart-price");

    const shopCartItemPrice = Number(shopPriceItem.textContent.replace("$", ""));

    const shopCartQuantityElement = shoppingCartItem.querySelector(".quantity");
    const shopCartQuantity = Number(shopCartQuantityElement.value);

    total = total + shopCartItemPrice * shopCartQuantity;
  });
  cartTotal.innerHTML = `$${total}`;
}
//FUNCION PARA ELIMINAR ITEM DEL CARRITO
function removeShopItem(event) {
  const buttonclick = event.target;
  buttonclick.closest(".shoppingCartItem").remove();
  updateTotal();
}
//FUNCION PARA SUBIR O BAJAR LAS CANTIDADES
function quantityChange(event) {
  const input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function renderizarproductos(productlist) {
  //RECORRER LISTA DE PRODUCTOS
  for (const list of productlist) {
    //DIV DE LOS PRODUCTOS
    const div = document.createElement("div");
    div.className = "card-product";

    //IMAGEN
    const img = document.createElement("img");
    img.innerHTML = `<img src="${list.img}"`;
    img.className = "card-img";

    //NOMBRE DEL PRODUCTO EN EL DIV
    const nombre = document.createElement("h3");
    nombre.innerText = `${list.nombre}`;
    nombre.className = "product-title";

    //PRECIO DEL PRODUCTO EN EL DIV
    const precio = document.createElement("h6");
    precio.innerText = `$${list.precio}`;
    precio.className = "price";

    //BOTON EN EL DIV
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "addtocart";

    //EVENTO BOTON COMPRAR
    comprar.addEventListener("click", addCart);

    //PARA BOTON COMPRAR

    const comprarbutton = document.querySelector(".btn-buy");

    comprarbutton.addEventListener("click", comprarbuttonClick);
    div.append(img, nombre, precio, comprar);

    contentShop.append(div);
  }
}

function comprarbuttonClick() {
  alert("Gracias por su compra");
  itemContainer.innerHTML = "";
  updateTotal();
}

function productJson() {
  fetch("/productos.json")
    .then((Response) => {
      return Response.json();
    })
    .then((productJson) => {
      for (const jasonProduct of productJson) {
        productos.push(new products(jasonProduct.nombre, jasonProduct.precio, jasonProduct.img, jasonProduct.id));
      }
      renderizarproductos(productos);
    });
}
let productos = [];
productJson();
