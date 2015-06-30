    function switcher(divId){
       $("div#" + divId).toggle();
    }
    function switcherAux(divId, value){
    	$("#aux").show();
		$("#aux div").hide();
		$("#aux_legend").text(value);  
		$("div#" + divId).toggle();
    }

    $("span").click( function(){
        switcher(this.id);
    });
    $("mark").click( function(){
        switcherAux(this.id, $(this).text());
    });    
