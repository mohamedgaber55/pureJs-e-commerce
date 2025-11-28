// header-small media 
let barsIcon = document.querySelector('.fa-bars-staggered');
let registeredUl = document.querySelector('.registered ul');
let searcContainer = document.querySelector('.search-container');

barsIcon.onclick = () => { 
    registeredUl.classList.toggle('ul-opacity');
}

// get elements from html page
let unregistered = document.querySelector('.unregistered')
let registered = document.querySelector('.registered');
let username = document.querySelector('.username');
let logout = document.querySelector('.logout');
let uesrImg = document.querySelector('.user-info img');
let userLocalImg = localStorage.getItem('userPhoto');

// main products 
const theProducts = JSON.parse(localStorage.getItem('products')) || products;

function updateUI(){
    if(localStorage.getItem('userName')){
        // user exists
        unregistered.style.display =  'none';
        registered.style.display =  'block';
        searcContainer.style.display =  'block';

        username.innerHTML = localStorage.getItem('userName');
        uesrImg.src = userLocalImg ? userLocalImg : 'imgs/user.png';
    }
    else{
        // no user
        registered.style.display =  'none';
        searcContainer.style.display =  'none';
        unregistered.style.display =  'block';

        barsIcon.classList.remove('fa-bars-staggered');
    }
}
updateUI();


// handle user profile path
let uesrInfo = document.querySelector('.user-info');
uesrInfo.onclick = () => window.location.href = 'profile.html'


// handle logout
logout.addEventListener('click', function() {

    localStorage.clear();
    unregistered.style.display = 'block';
    registered.style.display = 'none';
    updateUI();

});

// map on main products to render it in html page  
const mainProducts = document.querySelector('.products');
function productsMap(data){

    const productsMap = data.map((product) => {
        return `
            <div class="product p-3 pb-0">
                <div class="image position-relative" onclick='singleProductDetails(${product.id})'>
                    <div class='text-center'>
                        <span class='position-absolute'>${product.category}</span>
                    </div>
                    <img src="${product.image}" alt="product-image"/>
                    </div>
                    <div class='product-actions text-center d-flex justify-content-center align-items-center'>
                        <div class='text-center d-flex justify-content-center align-items-center'>
                            <i class="preview fa-solid fa-eye" onclick='singleProductDetails(${product.id})'></i>
                            <i class="add-fav ${product.favourite === true ? 'fa-solid' : 'fa-regular'} fa-heart" onclick='addToFav(${product.id})'></i>
                        </div>
                    </div>
                <div class="text mt-3">
                    <h6>${product.name}</h6>
                    <p>${product.description}</p>
                </div>
                <div class="shopping d-flex justify-content-between">
                    <div class='d-flex justify-content-between'>
                        <p class='price me-2'>${product.price}<span>$</span></p>
                        <p class='old-price'>${product.oldPrice}<span>$</span></p>
                    </div>
                    <i onclick='addToCart(${product.id})' class="add-cart fa-solid fa-cart-shopping"></i>
                </div>
            </div>
            `
    });

    // set products in page
    mainProducts.innerHTML = productsMap.join('');

}
// call the function
productsMap(theProducts);

// function for single product details
function singleProductDetails(id){
    localStorage.setItem('productId', id)
    window.location.href = 'productDetails.html'
}

// get the div that contain cart products & badge & cart icon
const mainCart = document.querySelector('.cart-items');
const badge = document.querySelector('.head-cart span');
const cartIcon = document.querySelector('.head-cart .fa-cart-shopping');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartDropClose = document.querySelector('.cart-dropdown .close');

// handle cart display 
cartIcon.onclick = () => {
    const cartInner = localStorage.getItem('cart');

    if (cartInner && JSON.parse(cartInner).length > 0) {
        cartDropdown.classList.toggle('show');
    } else {
        cartDropdown.classList.remove('show');
    }
};
cartDropClose.onclick = () => {
    cartDropdown.classList.remove('show');
}


// check if cart in localStorage contain products or not & declare cartArray to locate products on.
const getLocalCartProducts = localStorage.getItem('cart');
let cartArray = JSON.parse(getLocalCartProducts) || [];

// render function that renders cart elements to render cart elements without needing to reload page.
function renderCart(){

    const cartItems = cartArray.map((cartItem) => {
        return`
            <div class="cart-item text-center my-2">
                <img src="${cartItem.image}" alt="cart-image">
                <div>
                    <p>${cartItem.name}</p>
                    <p class='count'>Count: <span>${cartItem.count}</span> Piece</p>
                </div>
                <span class='cart-delete' onclick='handleDelete(${cartItem.id})'>Remove</span>
            </div>
            
        `
    });

    // using join to transform data from array to string to render it in html  
    mainCart.innerHTML = cartItems.join('');

    // set cart length in cart badge
    badge.innerHTML = cartItems.length;

}
// to apply any changes in page directly
renderCart();

// function that filter products to get target product to add it to cart using product id.
function filterProducts(id){

    const targetProduct = cartArray.find((product) => product.id === id);

    // check if target product is already been in or no to add new or add count 
    if(targetProduct){

        targetProduct.count +=1;
        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderCart();

    }
    else{

        const filteredProduct = theProducts.find((product) => product.id === id);
        cartArray.push({...filteredProduct, count: 1});
        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderCart();

    }
};

// handle add to cart function.
function addToCart(id){

    // check if there is user or not 
    const getUserEmail = localStorage.getItem('userEmail');
    if(getUserEmail){
        filterProducts(id);
    }
    else{
        window.location.href = 'login.html'
    }

} 

// function that handle delete item from cart.
function handleDelete(id){

    // filter target product to remove it from cart in one step using update on cartArray cause using let in declaration not const.
    cartArray = cartArray.filter((product) => product.id !== id);

    // set new cartArray in localStorage directly.
    localStorage.setItem('cart', JSON.stringify(cartArray));

    // re-render app to apply changes.
    renderCart();
}

// search items
const searchItem = document.querySelector('.search-item');
const produtsId = document.querySelector('#products');

// scroll to products when click on searchItem
searchItem.onclick = () => {
    produtsId.scrollIntoView({ behavior: 'smooth' });
}

// handle search 
searchItem.oninput = () => {

    // filter products after type in search input 
    const filterProuctAfterSearch = theProducts.filter(
        (products) => products.name.toLowerCase().includes(searchItem.value.toLowerCase())
    );

    // check if founded products or no to render products 
    if((searchItem.value).length > 0){
        productsMap(filterProuctAfterSearch);
    }
    else{
        productsMap(theProducts);
    }

}

// handle add to favourite 
// get items
const favIcon = document.querySelector('.fa-heart');
const favSideBar = document.querySelector('.fav-sidebar');
const closeIcon = document.querySelector('.fav-sidebar .close-icon');
const favDomProducts = document.querySelector('.fav-products');
const headFavSpan = document.querySelector('.head-fav span');

// handle animation of sidebar that will contain fav items 
favIcon.addEventListener('click', () => {
    favSideBar.classList.add('open');
});
closeIcon.addEventListener('click', () => {
    favSideBar.classList.remove('open');
});

// function that check fav item is in localStorage or not (different way to declare but best practise)
function getFavArray(){
    const localFavItem = localStorage.getItem('fav');
    return localFavArray = localFavItem ? JSON.parse(localFavItem) : [];
}

// render array of favItems in page 
function renderFavItems(){

    const favArray = getFavArray();

    const favItems = favArray.map((product) => {
        return`
            <div class='single-fav-product mb-2'>
                <img src="${product.image}" alt="img"/>
                <div>
                    <h6>${product.name}</h6>
                </div>
                <span class='fav-delete' onclick='handleFavDelete(${product.id})'>Delete</span>
            </div>
        `
    });

    favDomProducts.innerHTML = favItems.join('');

    favItems.length > 0 ? headFavSpan.style.display = 'block' : headFavSpan.style.display = 'none'
}
// call the renderFavItems function 
renderFavItems();

// function that add to fav 
function addToFavFilteration(id){

    // get localstorage item array that we will work on from function that return it.
    const favArray = getFavArray();

    // get the targetItem that we click on 
    const targetItem = theProducts.find((product) => product.id === id);
    // filter var that get product from fav list that in page 
    const filter = favArray.find((pro) => pro.id === id)

    // check if the filter is not founded to add if founded remove it when click
    if(!filter){

        targetItem.favourite = true
        favArray.push(targetItem);
        localStorage.setItem('fav', JSON.stringify(favArray));

        localStorage.setItem('products', JSON.stringify(theProducts));

        productsMap(theProducts)

        renderFavItems();
    }
    else{

        const unFav = favArray.filter((pro) => pro.id !== id);
        localStorage.setItem('fav', JSON.stringify(unFav));
        renderFavItems();

        // to change color of fav icon 
        theProducts.forEach(item => {
            if (item.id === id) item.favourite = false;
        });
        localStorage.setItem('products', JSON.stringify(theProducts));

        productsMap(theProducts);
        renderFavItems();
    }
}

// function that check if the user logged in or not to call addToFavFilteration
function addToFav(id){

    // check if there is registered user or not 
    const getUserEmail = localStorage.getItem('userEmail');

    if(getUserEmail){
        addToFavFilteration(id);
    }
    else{
        window.location.pathname = './login.html';
    }

}

// function that handle delete item from fav.
function handleFavDelete(id){

    let favArray = getFavArray();

    // filter target product to remove it from fav.
    favArray = favArray.filter((product) => product.id !== id);

    // // set new cartArray in localStorage directly.
    localStorage.setItem('fav', JSON.stringify(favArray));

    // // re-render app to apply changes.
    renderFavItems();
}

// filter products function
const filterProductsUl = document.querySelectorAll('.filter-products li');

filterProductsUl.forEach((li) => {

    li.addEventListener('click', () => {

        // remove active class from all categories 
        filterProductsUl.forEach(li => {
            li.classList.remove('filter-active');
        });;

        // add active class to clicked caregory 
        li.classList.add('filter-active');

        // check for category value
        if(li.innerHTML === 'All'){
            productsMap(theProducts)
        }
        else{
            const filteredProducts = theProducts.filter((product) => product.category === li.innerHTML);
            productsMap(filteredProducts);
        }
    });

});

