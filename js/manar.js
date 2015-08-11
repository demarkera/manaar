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

$('#rules_tab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})


$("#button_houses").click(function (e) {
  $("#div_houses").toggle();
})

$("#butTab_rules").click(function(){
	$.ajax({
	  url: "html/rules.htm",
	  cache: false
	})
	  .done(function( html ) {
	    $( "#tab_rules" ).html( html );
	  });
})

$(document).ready(function(){
   $("#div_houses").hide(); 
})
