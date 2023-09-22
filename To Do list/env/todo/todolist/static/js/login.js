/*document.getElementById('button').addEventListener('click' ,function(){
    let user = document.getElementById('user').value
    let password = document.getElementById('password').value
    console.log(user , password)
})*/

if (localStorage.getItem('logged') == '1') {
    let go = user_page.slice(0 , user_page.length - 2) + localStorage.getItem('id')
    location.href = go
}
$('#button').click(function(){
    let user = $('#user').val() 
    let password = $('#password').val() 
    let data = {
        'user' : user ,
        'password' : password 
    }
    $(document).ready(function(){
        $.ajax({
            url : check ,
            method : 'GET' ,
            data : {
                'user' : user ,
                'password' : password
            } ,
            success : function(res) {
                if (res['message'] == 'success') {
                    console.log(res)
                    localStorage.setItem('logged' , 1) 
                    localStorage.setItem('name' , res['name']) 
                    localStorage.setItem('id' , res['id'] )
                    let go = user_page.slice(0 , user_page.length - 2) + res['id']
                    location.href = go
                }else {
                    console.log('fail')
                }
            } ,
            error : function (res) {
                console.log('not-test')
            } 
        })
    })
})