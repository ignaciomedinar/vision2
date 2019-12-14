$("#toggle").click(function(){
    $("#sidebar-wrapper").toggleClass('hide');
    $(".menu-wrapper").toggleClass('hide');
    setTimeout(function(){
        if (!$("#sidebar-wrapper").hasClass('hide')){
            $("#sidebar-wrapper").addClass('show');
        } else
            $("#sidebar-wrapper").removeClass('show');     
    },500)
})
