// get elements
let profileImg = document.querySelector('.profile-content img');
let profileInfoName = document.querySelector('.profile-content .name');
let profileEmail = document.querySelector('.profile-content .mail');

// func that check if ther are data in localStorage
function handleUserProfile(){

    // get profile localStorage elements 
    const localUserName = localStorage.getItem('userName');
    const localUserEmail = localStorage.getItem('userEmail');
    const localUserImg = localStorage.getItem('userPhoto');

    if(localUserName){
        profileInfoName.innerHTML = `Your Name: ${localUserName}`;
    }
    if(localUserEmail){
        profileEmail.innerHTML = `Your Email: ${localUserEmail}`;
    }
    if(localUserImg){
        profileImg.src = localUserImg;
    } 
    else {
        profileImg.src = '/imgs/user.png';
    }

}
// call func 
handleUserProfile();

// edit profile

// get main divs of update
let passContainer = document.querySelector('.pass'); 
let updateContainer = document.querySelector('.update'); 

// gte main btns of upadte or delete
let editAccBtn = document.querySelector('.actions .edit');
let deleteAccBtn = document.querySelector('.actions .delete');
// btns of password
let passSubmitBtn = document.querySelector('.pass .submit');
let passCloseBtn = document.querySelector('.pass .close');
// btn of submit edit 
let updateBtn = document.querySelector('.update .submit');

// get inputs 
// password
let oldPass = document.querySelector('.old-pass');
// update
let newName = document.querySelector('.update .name');
let newEmail = document.querySelector('.update .email');
let newPassword = document.querySelector('.update .password');
let newImg = document.querySelector('.update .image');

// handle delete account
deleteAccBtn.addEventListener('click', ()=> {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#2196F3",
        confirmButtonText: "Yes, delete it!"
    })

    .then((result) => {
        if (result.isConfirmed) {

            localStorage.clear()

            setTimeout(() => {
                window.location.pathname = '/';
            }, 1500);
        }
    });

});

// handle click on edit 
editAccBtn.addEventListener('click', () => {
    passContainer.style.display = 'block';
});

// handle click on close 
passCloseBtn.addEventListener('click', () => {
    passContainer.style.display = 'none';
    updateContainer.style.display = 'none';
});

// handle click on password submit 
passSubmitBtn.addEventListener('click', () => {

    let localUserPassword = localStorage.getItem('userPassword');

    oldPass.value === localUserPassword ? 
    updateContainer.style.display = 'block' :
    Swal.fire("password-wrong!");

});

// handle click on update submit 
updateBtn.addEventListener('click', () => {
    newData()
})

// handle new data function 
function newData(){
    
    if(newName.value !== '' && newEmail.value !== '' && newPassword.value !== ''){
        
        // handle new image 
        if(newImg.files.length > 0){
            let file = newImg.files[0];

            // allowed types
            let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

            if(!allowedTypes.includes(file.type)){
                Swal.fire("Image type not allowed. Please upload JPG, PNG, or WEBP image!");
                return;
            }

            // size check (max 3 mb)
            if(file.size > 3 * 1024 * 1024){
                Swal.fire("Image is too large. Max size is 3mb!");
                return;
            }

            // convert to Base64
            let reader = new FileReader();
            reader.onload = function(e){
                localStorage.setItem('userPhoto', e.target.result);
                handleUserProfile();
            }
            reader.readAsDataURL(file);
        }

        // ========= save text data =========
        localStorage.setItem('userName', newName.value);
        localStorage.setItem('userEmail', newEmail.value);
        localStorage.setItem('userPassword', newPassword.value);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your info has been updated",
            showConfirmButton: false,
            timer: 1500
        });

        handleUserProfile();
    }
    else{
        Swal.fire('empry inputs!');
    }

}
