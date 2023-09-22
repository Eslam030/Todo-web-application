let id = window.location.href [window.location.href.length - 2]
let tt = 0 ;
let ascii = 65 
$.ajax({
    url : data_of_user ,
    method : 'GET' ,
    data : {
        'id' : id 
    } , 
    success : function (res){
        let _data = ""
        // i used ascii to encode the check points to make the animation of the done and not done
    
        for (let i = 0 ; i < res['data'].length ; i ++){
            tt = i ;
            let check ;
            console.log(res['data'][i][2])
            if (res['data'][i][2] == true){
                check = 'checked'
            }else {
                check = '' ;
            }
            console.log(check)
            _data += `<div class = 'row'>
            <input type = "checkbox" class = "checkbox" id = ${String.fromCharCode(ascii + i)}   ${check}>
            <input type = "text" class = "input" value ="${res['data'][i][1]}" id = "${res['data'][i][0]}name">
            <input type = "button" value = "delete" class = "deleteButton" id = "${res['data'][i][0]}" >
            </div>
            `
        }
        $('.content-card').append(`
        <div class = "container">
        <P class = "owner">${res['Owner']}</p>
        <input type = "button" value = "Add" class = "addButton" id = "add">
        <input type = "button" value = "share" class = "shareButton" id = "share">
        </div>
        <P class = "title">${res['Name']}</p>
        ${_data}
        <hr></hr>
        `)
        for (let i = 0 ; i < res['data'].length ; i ++){
            if ($('#' + String.fromCharCode(i + ascii)).prop('checked')) {
                const test = $('#' + String.fromCharCode(i + ascii)).parent().detach()
                $('.content-card').append(test)
            }else {
                const test = $('#' + String.fromCharCode(i + ascii)).parent().detach()
                $('.content-card').children().eq(1).after(test)
            }
            $('#' + String.fromCharCode(i + ascii)).click(function(){
                if ($(this).prop('checked')) {
                    $.ajax({
                        url : toggle,
                        method : 'GET' , 
                        data : {
                            'id' : res['data'][i][0] ,
                            '0-1' : 1
                        } , 
                        success : function(res){
                            console.log(res['message'])
                        },
                        error : function (res){
                            console.log('fail')
                        }
                    })
                    const test = $(this).parent().detach()
                    $('.content-card').append(test)
                }else {
                    $.ajax({
                        url : toggle,
                        method : 'GET' , 
                        data : {
                            'id' : res['data'][i][0] ,
                            '0-1' : 0
                        }, 
                        success : function(res){
                            console.log(res['message'])
                        },
                        error : function (res){
                            console.log('fail')
                        }
                    })
                    const test = $(this).parent().detach()
                    $('.content-card').children().eq(1).after(test)
                    
                }
            })
        }
        for (let i = 0 ; i < res['data'].length ; i ++){
            $('#' + `${res['data'][i][0]}`).click(function(){
                console.log('test')
                $('#' + `${res['data'][i][0]}`).parent().detach()
                $.ajax ({
                    url : delete_content ,
                    method : 'GET' ,
                    data : {
                        'id' : res['data'][i][0] 
                    } , success : function (res){
                        console.log(res['message'])
                    } , error : function (){
                        console.log('fail')
                    }
                })
            })
        $('#' + `${res['data'][i][0]}name`).on( 'keydown' ,function(event){
            
            if (event.which === 13 || event.key === "Enter") {
                $.ajax({
                    url : update_content ,
                    method : 'GET' , 
                    data : {
                        'new content' : $(this).val() ,
                        'id' : res['data'][i][0]
                    } , 
                    success : function(res){
                        console.log(res['message'])
                    },
                    error : function (res){
                        console.log('fail')
                    }
                })
            }
        })
        }
        $('#add').click(function(){
            $('.back').toggleClass('animate')
            $('.take').toggleClass('animate')
        })
        $('#share').click(function(){
            $('.text').html('Enter The mail or id you want to share with')
            $('.back').toggleClass('animate')
            $('.take').toggleClass('animate')
        })
        
        
    } , 
    error : function (res){
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
    let content = $('#todo_name').val() 
    $('#todo_name').val('') 
    $('.back').toggleClass('animate')
    $('.take').toggleClass('animate')
    if ($('.text').html() == 'Enter The mail or id you want to share with') {
        $.ajax ({
            url : share_todo , 
            method : 'POST' ,
            data : {
                'todo_id' : id ,
                'to_id' : content
            } , success : function (res) {
                console.log(res['message']) 
            } , error : function (){
                console.log('fail')
            }
        })
    }else {
        $.ajax({
            url : add_content ,
            method : 'POST' , // because i will create a new record
            data : {
                'id' : id , 
                'content' : content
            } , 
            success :function(res) {
                if (res['message'] == 'success') {
                    let test = ""
                    test += `<div class = 'row' >
                    <input type = "checkbox" class = "checkbox" id = "${String.fromCharCode(ascii + ++tt)}">
                    <input type = "text" class = "input" value ="${content}">
                    <input type = "button" value = "delete" class = "deleteButton" id = "del">
                    </div>
                    `
    
                    console.log(test)
                    $('.content-card').children().eq(1).after(test)
                    $('#' + String.fromCharCode(tt + ascii)).click(function(){
                        if ($(this).prop('checked')) {
                            const test = $(this).parent().detach()
                            $('.content-card').append(test)
                        }else {
                            const test = $(this).parent().detach()
                            $('.content-card').children().eq(1).after(test)
                            
                        }
                    })
                }
            } , 
            error : function () {
                console.log('fail')
            }
        })
    }

})

$('#lists').click(function(){
    history.back()
})

