var SLCAnoSafra = ''; 

function validateSLC(){
	console.log("validating using the SLC layout");
	$('.layoutType').html("<h3>Using SLC Layout</h3>");
	var lines = content.split("\n");
	//main loop
	createTable();
	for(k=0; k < lines.length; k++){
		openLine(k);
		currentLine = lines[k];
		var  lineType = currentLine.substr(18,2);
		switch(lineType){
			case "00":
				SLCHeader(currentLine);
				break;
			case "01":
				SLCBody01(currentLine);
				break;
			case "03":
				SLCBody03(currentLine);
				break;
			case "99":
				SLCTrailer(currentLine, lines.length);
				break
			default:
				errorMessage("Tipo de Registro "+ lineType +" Inválido na linha "+ k);
				break;
		}
		closeLine();
	}
	closeTable();
}

function SLCHeader(line){
	console.log("SLCHeader");
	//Credencial
	numberValidator(line,0,4, true, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4,3, false, 'Tipo de Solicitação', 'SLC');
	//AnoSafra
	numberValidator(line,7,6, false, 'Ano Safra', '');
	SLCAnoSafra = content.substr(7, 6);	
	//Identificação do Movimento
	numberValidator(line,13,5, false, 'Identificação do Movimento', '');
	//Tipo do Registro
	stringValidator(line,18,2, false, 'Tipo do Registro', '00');
	//Vago
	stringValidator(line,20,480, true, 'Vago','');
}

function SLCBody01(line){
	console.log("SLCBody01");
	//Credencial
	numberValidator(line,0,4, true, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4,3, false, 'Tipo de Solicitação', 'SLC');
	//AnoSafra
	numberValidator(line,7,6, false, 'Ano Safra', SLCAnoSafra);
	//Identificação do Movimento
	numberValidator(line,13,5, false, 'Identificação do Movimento', '');
	//Tipo do Registro
	stringValidator(line,18,2, false, 'Tipo do Registro', '01');
	//TipoDeAção
	stringValidator(line,20,3, false, 'Tipo de Ação', 'INC,ALT,EXC');
	//Número do Pedido de Liberação
	numberValidator(line,23, 4, false, 'Número do Pedido de Liberação', '');
	//Número do Contrato
	numberValidator(line,27, 11, false, 'Número do Contrato', '');
	//VALOR
	numberValidator(line,38, 17, false, 'VALOR', '');
	//Data da primeira amortização
	dateValidator(line,55, 8, false, 'Data da primeira amortização', '');
	//Data da última amortização
	dateValidator(line,63, 8, false, 'Data da última amortização', '');
	//Data da contratação
	dateValidator(line,71, 8, false, 'Data da contratação', '');
	//Número Ref. BACEN
	numberValidator(line,79, 11, false, 'Número Ref. BACEN', '');
	//Vago
	stringValidator(line,90, 21, true, 'Vago', '');
	//Tipo de licença ambiental
	stringValidator(line,111, 1, false, 'Tipo de licença ambiental', '1,2,3,4');
	//Número da licença ou da dispensa de licença
	stringValidator(line,112, 15, true, 'Número da licença ou da dispensa de licença', '');
	//Tipo de licença concedida
	stringValidator(line,127, 2, true, 'Tipo de licença concedida', 'LI,LO,  ');
	//Data de emissão da licença, do certificado de dispensa de licença ou da dispensa genérica
	dateValidator(line,129, 8, true, 'Data de emissão da licença, do certificado de dispensa de licença ou da dispensa genérica', '');
	//Data do fim de vigência da licença
	stringValidator(line,137, 8, true, 'Data do fim de vigência da licença', '');
	//Órgão concedente
	stringValidator(line,145, 50, true, 'Órgão concedente', '');
	//UF do órgão concedente
	stringValidator(line,195, 2, true, 'UF do órgão concedente', '');
	//Finalidade da concessão da licença ou dispensa de licença
	stringValidator(line,197, 100, false, 'Finalidade da concessão da licença ou dispensa de licença', '');
	//Vago
	stringValidator(line,297, 203, true, 'Vago', '');	
	
}

function SLCBody03(line){
	console.log("SLCBody03");
	
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4, 3, false, 'Tipo de Solicitação', 'SLC');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', SLCAnoSafra);
	//Identificação do Movimento 1
	numberValidator(line,13, 5, false, 'Identificação do Movimento 1', '');
	//Tipo do Registro
	stringValidator(line,18, 2, false, 'Tipo do Registro', '03');
	//Tipo de Ação
	stringValidator(line,20, 3, false, 'Tipo de Ação', 'INC,ALT');
	//Número do Pedido de Liberação
	numberValidator(line,23, 4, false, 'Número do Pedido de Liberação', '');
	//Número do Contrato
	numberValidator(line,27, 11, false, 'Número do Contrato', '');
	//Sigla do programa da operação
	stringValidator(line,38, 3, false, 'Sigla do programa da operação', '');
	//Tipo da informação adicional
	stringValidator(line,41, 3, false, 'Tipo da informação adicional', '001,002,003,004,024,025');
	//Valor da informação adicional
	validarSLCBody03ValorInformacaoAdicional(line, line.substr(41,3), 'Valor da informação adicional');
	
}

function SLCTrailer(line, linesLength){
	console.log("SLCTrailer");
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4, 3, false, 'Tipo de Solicitação', 'SLC');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', '');
	//Identificação do Movimento 1
	numberValidator(line,13, 5, false, 'Identificação do Movimento 1', '');
	//Tipo do registro
	stringValidator(line,18, 2, false, 'Tipo do registro', '99');
	//Quantidade de Registros 
	numberValidator(line,20, 5, false, 'Quantidade de Registros ', linesLength);
	//Vago
	stringValidator(line,25, 475, true, 'Vago', '');
}
function validarSLCBody03ValorInformacaoAdicional(line, value, field){
	switch(value){
		case '001':
			numberValidator(line,44, 17, false, 'Atualização do valor financiado de investimentos fixos', '');
			break;
		case '002':
			numberValidator(line,44, 17, false, 'Atualização do valor financiado de máquinas e equipamentos', '');
			break;
		case '003':
			numberValidator(line,44, 17, false, 'Atualização do valor financiado de custeio associado', '');
			break;
		case '004':
			numberValidator(line,44, 17, false, 'Atualização do valor financiado de outros itens', '');
			break;
		case '024':
			numberValidator(line,44, 17, false, 'Valor de máquinas e equipamentos com CFI referente a este PL', '');
			break;
		case '025':
			numberValidator(line,44, 33, false, 'Informação de equipamento CFI', '');
			break;
	}
}

