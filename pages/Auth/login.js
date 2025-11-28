const userEmail = document.querySelector('.email');
const userPassword = document.querySelector('.password');
const submit = document.querySelector('.submit');

let unregistered = document.querySelector('.unregistered')
let registered = document.querySelector('.registered');

let username = document.querySelector('.username');
let logout = document.querySelector('.logout');

const getLcoalEmail = localStorage.getItem('userEmail');
const getLocalPassword = localStorage.getItem('userPassword');

submit.addEventListener('click', handleLogin);

function handleLogin(e){
    e.preventDefault();

    if(userEmail.value === getLcoalEmail && userPassword.value === getLocalPassword){
        registered.style.display =  'block';
        unregistered.style.display =  'none';
        username.innerHTML = localStorage.getItem('name');
        setTimeout(() =>{
            window.location.pathname='/'
        } ,1500)
    }
    else{
        Swal.fire('Cannot Find the User');
    }
}

logout.addEventListener('click', function() {
    localStorage.clear();
    unregistered.style.display =  'block';
    registered.style.display =  'none';
})