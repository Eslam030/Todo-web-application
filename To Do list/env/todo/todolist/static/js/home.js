
if (localStorage.getItem('logged') == '1') {
    // show hiw name instead of login and register
    $('#data').detach()
    $('.menu').append(`
    <ul>
    <li id = "12">Hello Mr. ${localStorage.getItem('name')}</li>
    </ul>
    `)
    $('#12').click(function(){
        let go = user_page.slice(0 , user_page.length - 2) + localStorage.getItem('id')
        location.href = go
    })
}