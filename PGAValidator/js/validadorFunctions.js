var content = "";
var currentLine = "";
var debugMode = false;	
var gray = 1;
var contentResult = "";
var chosenType = 0;
var contentLine = "";
var brazilFederations = 'AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO';
var porteBeneficiario = '02,03,08,09,10';
var anoSafra = ''; 
var codigoAgente = "";
var subProgram = "";
var valorInvestimentosFixos = 0;
var valorMaquinasEquipamentos = 0;
var valorCusteioAssociado = 0;
var valorDeOutros = 0;
var error = false;;

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
			printResult(temp, field, true, "Campo não pode estar em branco", iniPos, length);
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
			printResult(temp, field, !found, "Valor do campo não está dentro dos valores esperados: "+ fixedValue, iniPos, length);
			return;
		}
		else{
			if(temp != fixedValue){
				printResult(temp, field, true, "Valor do campo é diferente do valor esperado "+ fixedValue, iniPos, length);
				return;
			} 
		}
	}

	printResult(temp, field, false, '', iniPos, length);

}

function numberValidator(line, iniPos, length, canBeBlank, field, fixedValue, unique){
	var temp = line.substr(iniPos, length);
	
	debug("numberValidator: " + temp);
	//Blank value validation
	if(!canBeBlank){
		blankError = validateBlank(temp, canBeBlank);
		if(blankError){
			printResult(temp, field, true, "Campo não pode estar em branco", iniPos, length);
			return;
		}
	}
	
	//fixed value Validation
	if(fixedValue != '' && temp != fixedValue){
		printResult(temp, field, true, "Valor do campo é diferente do valor esperado "+ fixedValue, iniPos, length);
		return;
	} 
	
	//Number only validation
	re = /^[0-9 ]+$/; 
	if(!re.test(temp)){
		printResult(temp, field, true, "Campo permite somente números", iniPos, length);
		debug(field+"["+iniPos+", "+ length+"] :"+temp);
		return;
	}
	printResult(temp, field, false, "Campo permite somente números ", iniPos, length);
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
			printResult(temp, field, true, "Campo não pode estar em branco", iniPos, length);
			return;
		}
	}
	if(month<1 || month > 12 || day < 01 || day > 31 || ( month == 2 && day > 29) || ($.inArray(month, months30) && day > 30)){
		printResult(temp, field, true, 'Data Inválida', iniPos, length);
	}
	printResult(temp, field, false, 'Data Inválida ', iniPos, length);
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

function printResult(data, field, result, errorMessage, iniPos, length){
	var temp = "";
	
	if(!result){
		if(gray == 'correct1'){
			gray = 'correct2';
		}
		else{
			gray = 'correct1';
		}
		temp = "<div class='tooltip "+ gray + "'><span class='sourceData'>" + data +"</span><span class='tooltipText'><u><b>Campo:</b></u> " + field + "<br><b><u>Posição:</b></u> " + parseInt(iniPos+1) + ", <u><b>Tamanho:</b></u> " + length+ "</span></div>";
	}
	else{
		error = true;
		temp = "<div class='tooltip error'><span class='sourceData'>" + data + "</span><span class='tooltipText error'><b><u>Campo:</b></u> " + field + "<br><u><b>Posição:</b></u> " + parseInt(iniPos+1) + ", <b><u>Tamanho: </b></u>" + length + "<br><b><u>Erro:</b></u> " + errorMessage + "</span></div>";
	}
	contentResult += temp;
}

function errorMessage(msg){
//	contentResult += "<div class='error'>"+msg+"</div>";
}

function createTable(){
//	contentResult += "<table cellpadding='0' cellspacing='0' border='0'>";
//	contentResult += "<h3>Validated File:</h3>";
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

function validateEtnia(line, pessoa,position){
	if(pessoa == 'F'){
		stringValidator(line,position, 1, false, 'Cor / etnia do beneficiário', '1,2,4,6,8,9');
	}
	else{
		stringValidator(line,position, 1, true, 'Cor / etnia do beneficiário', '1,2,4,6,8,9, ');
	}
}

function validateCodigoTipoInformacaoComplementar(line, iniPos, length, mandatory, field,subProgram){
	switch(subProgram){
	case "MII":
		stringValidator(line,iniPos, length, false, 'Código do tipo da Informação Complementar','001,002,003,004,027,028,014');
		break;
	case "PCA":
		stringValidator(line,iniPos, length, false, 'Código do tipo da Informação Complementar','001,002,003,004,027,028,013');
		break;
	case "PNP":
		stringValidator(line,iniPos, length, false, 'Código do tipo da Informação Complementar','001,002,003,004,027,028');
		break;
	case "SLC":
		stringValidator(line,iniPos, length, false, 'Código do tipo da Informação Complementar','001,002,003,004,024,025');
		break;
	default:
		printResult(subProgram, 'Código do tipo de Informação Complementar', true, "Combinação Subprograma "+subProgram+" x Código tipo de Informação inválido ", iniPos, length);
		break;
	}
}

function validateValorInformacaoComplementar(line, value, field, subProgram){
	switch(value){
		case '001':
			numberValidator(line,32, 17, false, 'Valor de investimentos Fixos', '');
			break;
		case '002':
			numberValidator(line,32, 17, false, 'Valor de máquinas e equipamentos', '');
			break;
		case '003':
			numberValidator(line,32, 17, false, 'Valor de custeio associado', '');
			break;
		case '004':
			numberValidator(line,32, 17, false, 'Valor de outros', '');
			break;
		case '013':
			numberValidator(line,32, 10, false, 'Aumento da capacidade de armazenagem (em t)', '');
			break;
		case '014':
			numberValidator(line,32, 10, false, 'Área irrigada a ser implementada (em ha)', '');
			break;
		case '024':
			numberValidator(line,32, 17, false, 'Valor de máquinas e equipamentos com CFI referente a este PL', '');
			break;
		case '025':
			numberValidator(line,32, 31, false, 'Informação de equipamento CFI', '');
			break;
		case '027':
			stringValidator(line,32, 3, false, 'Objetivo da Operação', '110,120,130,131,140,150,151,311,320,331');
			break;
		case '028':
			stringValidator(line,32, 1, false, 'Solicitação de financiamento é para aquisição isolada de máquinas e equipamentos?', 'S,N');
			break;
	}
}
