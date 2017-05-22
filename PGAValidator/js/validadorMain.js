$('.validateButton').click(function(){
	callValidation();
});  

$(".content").focusout(function(){
	callValidation();
})

function callValidation(){
	console.clear();
	
	var divContent = $('.content').html();
	divContent = divContent.replace("nbsp;"," ");
	content = "";
	var divAux = "";
	if(divContent != divContent.replace(/<(?:.|\n)*?>/gm, '')){
		var divText = "";
		console.log("has htm tags");
		$("#layoutType").html(divContent);
		console.log(divContent);
		var containerDiv = document.getElementById("layoutType");
		var containerDivLine = containerDiv.innerHTML.split("><br><");
		if(containerDivLine.length == 0){
			var containerDivLine = containerDiv.innerHTML.split("<br>");
		}
		console.log("containerDivLine.length :"+containerDivLine.length);
		for(var j = 0; j < containerDivLine.length; j++){
			contentLine = "";
			console.log("line: "+j +" -> " + containerDivLine[j]);
			$("#divAux").html("<" + containerDivLine[j] + ">");
			divAux = document.getElementById("divAux");
			console.log("length : " + divAux.getElementsByClassName("sourceData").length);
			for(var i = 0; i < divAux.getElementsByClassName("sourceData").length; i++){
				console.log("data: "+ divAux.getElementsByClassName("sourceData")[i].innerHTML);
				contentLine = contentLine + divAux.getElementsByClassName("sourceData")[i].innerHTML;
			}
			console.log("contentLine[" + j + "] :" +contentLine);
			content = content + contentLine + "\n";
		}
		content = content.replace("&nbsp;"," ");
		$(".content").html(content);
	}
	else{
		console.log("dont have html tags");
		content = divContent;
		$(".content").html(divContent);
	}
	
//	console.log("content: " + content);
	
	contentResult = '';
    var contentAttr = $('.content').attr('name');
    
    //calling validators
    chosenType = $('#layoutTypeRadio:checked').val();
    debug('chosen type: ' + chosenType);
    error = false;
    validateLayout();

    content = content.replace(/\r?\n/g,'<br/>');
    contentResult = contentResult.replace(/\r?\n/g,'<br/>');
    
    //displaying text
    $('.'+contentAttr+'').html(content);
    $('.content').html(contentResult);
    
    if(error){
    	$("#layoutType").addClass("red").removeClass("green");
    }
    else{
    	$("#layoutType").removeClass("red").addClass("green");
    }
    	
	
}
function validateLayout(){
	//content is where the input data is;
	
	//debug (validateBlank('aa ', false));
	var tpArq = $("input[name=tpArq]:checked").val();
//	console.log("tpArq: " + tpArq);
	
	if(tpArq == "sol"){
		validateSolicitacao();
	}
	else{
		if(tpArq == "lib"){
			validateLiberacao();
		}
	}
	
}
