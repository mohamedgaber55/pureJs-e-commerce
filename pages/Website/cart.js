// get the div that will contain cart products in the page 
let cartProducts = document.querySelector('.cart-products');

// get cart items from localStorage 
let cartLocalItems = JSON.parse(localStorage.getItem('cart'));

// function that render elements in page 
function drawCartProducts(data){

    let productsMap = data.map((product) => {
        return `
            <div class="cart-product p-3 mb-2 d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <div class="image mb-2">
                    <img src="${product.image}" alt="bag-image"/>
                </div>
                <div class="text d-flex my-1">
                    <span>Title: </span>
                    <h5 class='ms-1'>${product.name}</h5>
                    </div>
                <div class='d-flex my-1'>
                    <span>Count: </span>
                    <p class='piece ms-2'>${product.count} <span>Piece</span></p>
                </div>
                <div class='d-flex my-1'>
                    <span>Price:</span>
                    <p class='price ms-2'>${product.price}<span>$</span></p>
                </div>
                <div class='d-flex my-1'>
                    <span>Total:</span>
                    <p class='price ms-2'>${product.price * product.count}<span>$</span></p>
                </div>
                <p class='cart-delete' onclick='deleteItem(${product.id})'>Remove</p>
            </div>
        `
    });

    // check if localStorage is empty or not 
    if(cartLocalItems.length == 0){
        cartProducts.innerHTML = `Your Cart is Empty`;
    }else{
        cartProducts.innerHTML = productsMap.join('');
    }

}

// call the function of drawCartProducts
drawCartProducts(cartLocalItems);

// handle delete from cart
function deleteItem(id){
    cartLocalItems = cartLocalItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartLocalItems));
    drawCartProducts(cartLocalItems);
}