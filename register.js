const userName = document.querySelector('.username');
const userEmail = document.querySelector('.email');
const userPassword = document.querySelector('.password');
const userPhoto = document.querySelector('.photo');
const submit = document.querySelector('.submit');


submit.onclick = function(e) {
    e.preventDefault();

    if(userEmail.value === '' || userEmail.value === '' || userPassword.value === ''){
        Swal.fire("empty inputs!!");
    }
    else{
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('userEmail', userEmail.value);
        localStorage.setItem('userPassword', userPassword.value);

        if(userPhoto.files.length > 0){
            // check for img size 
            const file = userPhoto.files[0];
            const maxSize = 3 * 1024 * 1024; // 3 mb

            // Check type
            if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
                Swal.fire("File type is not valid!");
                localStorage.setItem('userPhoto', '');
            }
            // Check size
            else if(file.size > maxSize){
                Swal.fire("Image size is bigger than 3MB!");
                localStorage.setItem('userPhoto', '');
            }
            // Everything OK
            else{
                const reader = new FileReader();
                reader.onload = () => localStorage.setItem('userPhoto', reader.result);
                reader.readAsDataURL(file);
            }
        }
        setTimeout(() =>{
            window.location.pathname='./login.html';
        } ,1500);
    }
}