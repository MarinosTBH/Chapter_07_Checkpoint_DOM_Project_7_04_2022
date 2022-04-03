//Since we sued 'async' we need to check if the DOMContentLoaded perfectly 
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//Ready :: contains our main JS content
function ready() {
    //BUTTON REMOVE
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')

    for (var i=0;i<removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)   
    }
    //Quantity input update
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    
    for (i=0;i<quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //BUTTON ADD
    var addCartButtons = document.getElementsByClassName('shop-item-button')

    for (i=0; i<addCartButtons.length;i++){
        var button = addCartButtons[i] 
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// #########################################################
//PurchaseClicked
function purchaseClicked() {
    updateCartTotal()
    var total=document.getElementsByClassName('cart-total-price')[0].innerText
    if ( total == '$0'){
        alert('Choose a product !')
    }else {

    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }}
    updateCartTotal()
}
//Remove cart item after button remove
function removeCartItem(event) {
     var buttonClicked = event.target //Target the element that we want to do something with it
            buttonClicked.parentElement.parentElement.remove() //2 times parent element to reach cart item
            updateCartTotal() //we put updateCartTotal here to function whenever we use a remove button
}
//QuantityChanged (update)
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || (input.value <= 0)){
        input.value = 1
    }
    updateCartTotal()
}
//addToCart button
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
//addItemToCart
function addItemToCart(title, price, imageSrc) {

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
        alert('This item is already added to the cart.')
        return 
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// #########################################################
//UPDATE TOTAL
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0 //total need to be globally declared
    for (var i = 0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
                var price = parseFloat(priceElement.innerText.replace('$', ''))
                var quantity = quantityElement.value //Since this is an input element we need to get the value of it not the innerText
                total+=(price * quantity) //Quick maths
    }
    total = Math.round(total *100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+ total //append total value to price innerText
}




