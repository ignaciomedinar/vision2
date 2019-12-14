$( document ).ready(function() {
    $("#registro").hide();
});
$("#registrar").click(function(){
    $("#registro").show();
    $("#login").hide();
})
$("#entrar").click(function(){
    $("#login").show();
    $("#registro").hide();
})