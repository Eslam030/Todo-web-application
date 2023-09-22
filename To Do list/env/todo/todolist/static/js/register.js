
if (localStorage.getItem('logged') == '1') {
    console.log('test')
    let go = user_page.slice(0 , user_page.length - 2) + localStorage.getItem('id')
    location.href = go
}
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function checkPasswordStrength(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    let strength = 0;

    if (password.length >= minLength) {
        strength++;
    }
    if (hasUppercase) {
        strength++;
    }
    if (hasLowercase) {
        strength++;
    }
    if (hasDigits) {
        strength++;
    }
    if (hasSpecialChars) {
        strength++;
    }
    return strength;
}


$('#register').click(function(){
    let pass = $('#pass').val() 
    let rpass = $('#rpass').val() 
    let user = $('#user').val() 
    let email = $('#email').val() 
    let id = $('#id').val()
    data_ = {
        'user-name' : user ,
        'email' : email ,
        'password' : pass ,
        'id' : id
    }
    if (pass == rpass && isValidEmail(email) && checkPasswordStrength(pass) >= 3){
        $.ajax({
            url : add ,
            method : 'POST' ,
            data : JSON.stringify(data_) ,
            success : function (res) {
                alert('done')
                let go = user_page.slice(0 , user_page.length - 2) + id
                location.href = go
                localStorage.setItem('logged' , '1')
                localStorage.setItem('name' , user)
                localStorage.setItem('id' , id)
            } ,
            error : function (res) {
                console.log('bad request')
            }
        })
    }else {
        if (pass != rpass) {
            alert('password do not match')
        }
        if (!isValidEmail(email) ) {
            alert("isn't email")
        }
        if (checkPasswordStrength(pass) < 3) {
            alert('week password')
        }
    }
})