var content = "";
var currentLine = "";
var debugMode = false;	
var gray = 1;
var contentResult = "";
var chosenType = 0;

$('.validateButton').click(function(){
	console.clear();
	content = $('.content:not(.focus)').val();
	contentResult = '';
    var contentAttr = $('.content:not(.focus)').attr('name');
    
    //calling validators
    chosenType = $('#layoutTypeRadio:checked').val();
    debug('chosen type: ' + chosenType);
    validateLayout();

    content = content.replace(/\r?\n/g,'<br/>');
    contentResult = contentResult.replace(/\r?\n/g,'<br/>');
    
    //displaying text
    $('.'+contentAttr+'').html(content);
    $('.resultDiv').html(contentResult);
    
});  

function validateLayout(){
	//content is where the input data is;
	
	//debug (validateBlank('aa ', false));
	switch(content.substr(4,3)){
		case 'SLC':
			validateSLC();
		break;
		case 'PCA':
			validatePCA();
		break;
		case 'MII':
			validateMII();
		break;
		case 'PNP':
			validatePNP();
		break;
	}
}

function debug(message){
	if(debugMode){
		console.log(message);
	}
}

function stringValidator(line, iniPos, length, canBeBlank, field, fixedValue){
	var temp = line.substr(iniPos, length);
	var found = false;
		
	//Blank value validation
	if(!canBeBlank){
		if(validateBlank(temp, canBeBlank)){
			printResult(temp, field, true, "Campo não pode estar em branco");
			return;
		}
	}
	
	//fixed value Validation
	if(fixedValue != ''){
		if(fixedValue.indexOf(',') != -1){
			var splitted = fixedValue.split(",");
			for (j=0; j<splitted.length; j++){
				if(temp == splitted[j]){
					found=true;
				}
			}
			printResult(temp, field, !found, "Valor do campo não está dentro dos valores esperados: "+ fixedValue);
			return;

		}
		else{
			if(temp != fixedValue){
				printResult(temp, field, true, "Valor do campo é diferente do valor esperado "+ fixedValue);
				return;
			} 
		}
	}

	printResult(temp, field, false, '');

}

function numberValidator(line, iniPos, length, canBeBlank, field, fixedValue, unique){
	var temp = line.substr(iniPos, length);
	
	debug("numberValidator: " + temp);
	//Blank value validation
	if(!canBeBlank){
		blankError = validateBlank(temp, canBeBlank);
		if(blankError){
			printResult(temp, field, true, "Campo não pode estar em branco");
			return;
		}
	}
	
	//fixed value Validation
	if(fixedValue != '' && temp != fixedValue){
		printResult(temp, field, true, "Valor do campo é diferente do valor esperado "+ fixedValue);
		return;
	} 
	
	//Number only validation
	re = /^[0-9]+$/; 
	if(!re.test(temp)){
		printResult(temp, field, true, "Campo permite somente números");
		debug(field+"["+iniPos+", "+ length+"] :"+temp);
		return;
	}
	printResult(temp, field, false, "Campo permite somente números ");
}

function dateValidator(line, iniPos, length, canBeBlank, field, fixedValue){
	var temp = line.substr(iniPos, length);
	var year = parseInt(temp.substr(0,4));
	var month = parseInt(temp.substr(4,2));
	var day = parseInt(temp.substr(6,2));
	var months30 = [4,6,9,11];
	
	//Blank value validation
	if(!canBeBlank){
		if(validateBlank(temp, canBeBlank)){
			printResult(temp, field, true, "Campo não pode estar em branco");
			return;
		}
	}
	if(month<1 || month > 12 || day < 01 || day > 31 || ( month == 2 && day > 29) || ($.inArray(month, months30) && day > 30)){
		printResult(temp, field, true, 'Data Inválida');
	}
	printResult(temp, field, false, 'Data Inválida ');
}


function validateBlank(data, canBeBlank){
	var blankData = "";
	for(i=0; i< data.length; i++){
		blankData+= " ";
	}
	if(!canBeBlank && blankData == data){
		return true;
	}
	else{
		return false;
	}
}

function printResult(data, field, result, errorMessage){
	var temp = "";
	
	if(!result){
		if(gray == 'correct1'){
			gray = 'correct2';
		}
		else{
			gray = 'correct1';
		}
		temp = "<div class='tooltip "+ gray + "'>" + data.replace(" ", "&nbsp;") +"<span class='tooltipText'>" + field + "</span></div>";
	}
	else{
		temp = "<div class='tooltip error'>" + data.replace(' ', '&nbsp;') + "<span class='tooltipText error'>" + field + " - " + errorMessage + "</span></div>";
	}
	contentResult += temp;
}

function errorMessage(msg){
	contentResult += "<div class='error'>"+msg+"</div>";
}

function createTable(){
//	contentResult += "<table cellpadding='0' cellspacing='0' border='0'>";
	contentResult += "<h3>Validated File:</h3>";
}
function closeTable(){
//	contentResult += "</table>";
}
function openLine(line){
//	contentResult += "<p>Line "+ line +": ";
}
function closeLine(){
	contentResult += "<br/>";
}