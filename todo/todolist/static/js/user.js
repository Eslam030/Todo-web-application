

let id = window.location.href [window.location.href.length - 2]
console.log(id)
/*<figure id = '1'>
<figcaption>
    <p>
        cs
    </p>
    <div style="display: flex; column-gap: 10%;">
        <input type = "checkbox" >
        <p>
            finish the goal
        </p>
    </div>
    <div style="display: flex; column-gap: 10%;">
        <input type = "checkbox" >
        <p>
            finish the goal
        </p>
    </div>
    <div style="display: flex; column-gap: 10%;">
        <input type = "checkbox" >
        <p>
            finish the goal
        </p>
    </div>
    <div class = "more">
        <p style="font-size: 15px; margin-top: 0; padding-left: 5px;">more ...</p>
    </div>
</figcaption>
</figure>*/
function add_element(name , obj , id) {
    let add = ""
    let more = ""
    if (obj.length >= 3){
        more = `<div class = "more">
        <p style="font-size: 15px; margin-top: 0; padding-left: 5px;">more ...</p>
    </div>`
    }
    for (let i = 1 ; i < obj.length ; i ++){
        if (i > 3)break;
        add += `<div style="display: flex; column-gap: 10%;">
        <input type = "checkbox" disabled >
        <p>
            ${obj[i][0]}
        </p>
    </div>`
    }
    $('.con').append(`<figure id = ${id}>
    <figcaption>
        <p style = "text-align : center ; font-size : 1.4rem">
            ${name}
        </p>
        ${add}
        ${more}
    </figcaption>
    </figure>`)


    $('#' + id).click(function(){
        let go = show.slice(0 , show.length - 2) + id 
        console.log(go)
        location.href = go
    })
}
// send request to get name and all attached to do lists 
$.ajax({
    url : data_of_user ,
    method : 'GET' ,
    data : {
        'id' : id
    } , 
    success : function (res){
        $('#name').html($('#name').html() + " " + res['name'])
        for (const key in res['data']) {
            add_element(res['data'][key][0] , res['data'][key] , key)
        }
    } ,
    error : function(res) {
        console.log('fail')
    }
})
$('.back').click(function(){
    $('.back').toggleClass('animate')
    $('.take').toggleClass('animate')
})
$('.take').click(function(){
    $('.back').toggleClass('animate')
    $('.take').toggleClass('animate')
})


$('#done').click(function(){
    let name = $('#todo_name').val() 
    $('#todo_name').val('') 
    $('.back').toggleClass('animate')
    $('.take').toggleClass('animate')
    $.ajax({
        url : add_todo ,
        method : 'POST' , // because i will create a new record
        data : {
            'name' : name ,
            'id' : id
        } , 
        success :function(res) {
            if (res['message'] == 'success') {
                add_element(name , {} , res['id']) 
            }
        } , 
        error : function () {
            console.log('fail')
        }
    })
})
$('#create').click(function(){
    $('.back').toggleClass('animate')
    $('.take').toggleClass('animate')
})


$('#logout').click(function(){
    localStorage.setItem('logged' , 0) 
    location.href = home
})