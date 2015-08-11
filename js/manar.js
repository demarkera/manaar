function switcher(divId) {
    $("div#" + divId).toggle();
}

$(".marker").click(function() {
    switcher(this.id);
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
   $("#tab_rules").load("html/rules.htm");
})
