function switcher(divId) {
    $("div#" + divId).toggle();
}

$(".marker").click(function() {
    switcher(this.id);
});
$("m.").click(function() {
    switcherAux(this.id, $(this).text());
});


$('#tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$("#button_houses").click(function (e) {
  $("#div_houses").toggle();
})

$(document).ready(function(){
   $("#div_houses").hide(); 
})
