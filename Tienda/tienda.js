
/* AGREGAR AL CARRITO */

const addToShoppCartButtons = document.querySelectorAll(".addToCart");
addToShoppCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

    const shoppingCartItemsContainer = document.querySelector
    ('.shoppingCartItemsContainer');

    function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');
    

    const itemTitle = item.querySelector('.itemTitle').textContent;
    const itemPrice = item.querySelector('.itemPrice').textContent;
    const itemImage = item.querySelector('.itemImage').src;
    
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
  }

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){
 
    /* LLAMAR AL TITULO DEL PRODUCTO */

 const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
 for(let i = 0; i < elementsTitle.length; i++){
     if (elementsTitle[i].innerText === itemTitle){
         
         let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
        elementQuantity.value++;
        updateShoppingCartTotal();
        $('.toast').toast('show');
        return;
     }
 }
    
    /* ELEMENTOS QUE MODIFICAN EL HTML */    

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
   <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src='${itemImage}' class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem); 

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged); 

    updateShoppingCartTotal()
} 

/* PRECIO Y CANTIDAD */ 

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    
    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
            
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$','')); /* "REPLACE" REEMPLAZA FACTORES EN EL text.Content */ 

       
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;

        
    });

    /* TOTAL DE LAS CANTIDADES */

    shoppingCartTotal.innerHTML =  `-$${total.toFixed(2)}`;

}
    /* REMOCION DE PRODUCTOS */

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
   
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

/* NO AGREGAR 0 ELEMENTOS */ 

function quantityChanged(event) {
    const input = event.target;
    if(input.value <= 0){
        input.value = 1;
    
    }
    updateShoppingCartTotal();
}

/* VACIAR EL TOTAL AL COMPRAR */

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
/*VALIDACION DE EMAIL/DESAFIO JQUERY*/

$(document).ready(function() {
    $('#send').click(function(){
        if($("#email").val().indexOf('@', 0) == -1 || $("#email").val().indexOf('.', 0) == -1) {
            alert('El correo electrónico introducido no es correcto.');
            return false;
        }

        alert('El email introducido es correcto.');
    });
});

