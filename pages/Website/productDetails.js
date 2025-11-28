// get elements from html page
let unregistered = document.querySelector('.unregistered')
let registered = document.querySelector('.registered');

const username = document.querySelector('.username');

// main products 
const theProducts = JSON.parse(localStorage.getItem('products')) || products;

// check if localStorage contain a user or no 
    if(localStorage.getItem('userName')){
        unregistered.style.display =  'none';
        username.innerHTML = localStorage.getItem('userName');
    }
    else{
        registered.style.display =  'none';
    }

// get clicked product by id after stored it in localStorage
const productId = localStorage.getItem('productId');

// get product details element 
const productDetails = document.querySelector('.product-details');

// function that map on target product
function drawProduct(data){

    let productMap = data.map((product) => {
        return `
            <div class="product-details mt-5 d-flex flex-wrap justify-content-center justify-content-sm-start">
                <div class="image mt-5">
                    <img src="${product.image}" alt="bag-image"/>
                </div>
                <div class="text mt-3 mx-2 mx-sm-3 mx-lg-5 my-2 my-sm-3 my-lg-5">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p class='about'>${product.about}</p>
                    <div class='d-flex'>
                        <p class='price me-2'>${product.price}<span>$</span></p>
                        <p class='old-price'>${product.oldPrice}<span>$</span></p>
                    </div>
                </div>
            </div>
        `
    });

    // set product details into page 
    productDetails.innerHTML = productMap.join('');

}

// filter products to get the details of target product 
const filteredProduct = theProducts.filter((product) => product.id == productId)

// render product using filterproduct
drawProduct(filteredProduct);