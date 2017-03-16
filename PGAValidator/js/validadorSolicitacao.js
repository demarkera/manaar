function validateSolicitacao(){
	anoSafra = "";
	var layoutName = "";
	
	console.log(content.substr(4,3));
	switch(content.substr(4,3)){
	case 'PCA':
		layoutName = "PCA";
	break;
	case 'MII':
		layoutName = "MODERINFRA";
	break;
	case 'PNP':
		layoutName = "PRONAMP";
	break;
	default:
		console.log("tipo de Layout Inválido");
		$('.layoutType').html("<h3 class='red'>Layout "+content.substr(4,3)+" inválido</h3>");
		contentResult = content;
		return;
		break;
	}

	console.log("validating using the Solicitacao "+layoutName+" layout");
	$('.layoutType').html("<h3>Solicitação "+layoutName+"</h3>");
	
	var lines = content.split("\n");
	//main loop
	createTable();
	for(k=0; k < lines.length; k++){
		openLine(k);
		currentLine = lines[k];
		var  lineType = currentLine.substr(18,2);
		switch(lineType){
			case "00":
				solicitacaoHeader(currentLine);
				break;
			case "01":
				solicitacaoBody01(currentLine);
				break;
			case "02":
				solicitacaoBody02(currentLine);
				break;
			case "03":
				solicitacaoBody03(currentLine);
				break;
			case "99":
				solicitacaoTrailer(currentLine, lines.length);
				break
			default:
				errorMessage("Tipo de Registro "+ lineType +" Inválido na linha "+ k);
				break;
		}
		closeLine();
	}
	closeTable();
}

function solicitacaoHeader(line){
	console.log("Solicitação Header");
	
	codigoAgente = line.substring(0,4);
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', codigoAgente);
	//Identificação do Programa 
	stringValidator(line,4, 3, false, 'Identificação do Programa ', 'PCA,MII,PNP');
	subProgram = content.substr(4,3);
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', '');
	anoSafra = line.substr(7,6);
	//Identificação do Movimento 1
	numberValidator(line,13, 5, false, 'Identificação do Movimento 1', '');
	//Tipo do registro 
	stringValidator(line,18, 2, false, 'Tipo do registro ', '00');
	//Vago
	stringValidator(line,20, 480, true, 'Vago', '');
}

function solicitacaoBody01(line){
	console.log("Solicitação Body01");

	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', codigoAgente);
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII,PNP,PGA');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', anoSafra);
	//Identificação do Movimento
	numberValidator(line,13, 5, false, 'Identificação do Movimento', '');
	//Tipo do registro
	stringValidator(line,18, 2, false, 'Tipo do registro', '01');
	//Número da Solicitação de Financiamento
	numberValidator(line,20, 9, false, 'Número da Solicitação de Financiamento', '');
	//Nome
	stringValidator(line,29, 35, false, 'Nome', '');
	//CPF/CNPJ
	numberValidator(line,64, 14, false, 'CPF/CNPJ', '');
	//VALOR
	stringValidator(line,78, 10, false, 'VALOR', '');
	//Município do Investimento
	numberValidator(line,88, 7, false, 'Município do Investimento', '');
	//Porte do beneficiário
	stringValidator(line,95, 2, false, 'Porte do beneficiário', porteBeneficiario);
	//Endereço do Beneficiário
	stringValidator(line,97, 55, false, 'Endereço do Beneficiário', '');
	//Bairro
	stringValidator(line,152, 16, false, 'Bairro', '');
	//CEP
	numberValidator(line,168, 5, false, 'CEP', '');
	//Complemento do CEP
	numberValidator(line,173, 3, false, 'Complemento do CEP', '');
	//Município do Beneficiário
	numberValidator(line,176, 7, false, 'Município do Beneficiário', '');
	//Setor de atividade do investimento
	stringValidator(line,183, 8, false, 'Setor de atividade do investimento', '');
	//Tipo de beneficiário
	stringValidator(line,191, 1, false, 'Tipo de beneficiário', 'F,J');
	//Sistemática Convencional
	stringValidator(line,192, 1, false, 'Sistemática Convencional', 'S,N');
	//Cor / etnia do beneficiário
	validateEtnia(line, line.substr(191,1), 193);
	//Vago
	stringValidator(line,194, 306, true, 'Vago', '');
}


function solicitacaoBody02(line){
	console.log("Solicitação Body02");
	
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', codigoAgente);
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII,PNP,PGA');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', anoSafra);
	//Identificação do Movimento
	numberValidator(line,13, 5, false, 'Identificação do Movimento', '');
	//Tipo do registro
	stringValidator(line,18, 2, false, 'Tipo do registro', '02');
	//Número da Solicitação de Financiamento
	numberValidator(line,20, 9, false, 'Número da Solicitação de Financiamento', '');
	//Número de Beneficiários 
	numberValidator(line,29, 5, false, 'Número de Beneficiários ', '');
	//Vago
	stringValidator(line,34, 24, true, 'Vago', '');
	//Periodicidade
	stringValidator(line,58, 2, false, 'Periodicidade', '09,11');
	//Vago
	stringValidator(line,60, 2, true, 'Vago', '');
	//Valor do contrato
	stringValidator(line,62, 17, false, 'Valor do contrato', '');
	//Unidade da Federação
	stringValidator(line,79, 2, false, 'Unidade da Federação', brazilFederations);
	//Vago
	stringValidator(line,81, 186, true, 'Vago', '');
	//Indicador de cobrança de juros na carência
	stringValidator(line,267, 1, false, 'Indicador de cobrança de juros na carência', 'S,N');
	//Quantidade de amortizações
	numberValidator(line,268, 3, false, 'Quantidade de amortizações', '');
	//CNPJ da Cooperativa Singular de Crédito
	numberValidator(line,271, 14, true, 'CNPJ da Cooperativa Singular de Crédito', '');
	//Vago
	numberValidator(line,285, 11, true, 'Vago', '');
	//Data do protocolo da operação no Agente Financeiro
	dateValidator(line,296, 8, false, 'Data do protocolo da operação no Agente Financeiro', '');
	//Nível de Participação do BNDES
	numberValidator(line,304, 5, false, 'Nível de Participação do BNDES', '');
	//Indicador de sistemática
	stringValidator(line,309, 1, false, 'Indicador de sistemática', 'C');
	//Vago
	stringValidator(line,310, 190, true, 'Vago', '');	
}


function solicitacaoBody03(line){
	console.log("Solicitação Body03");
	
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4, 3, false, 'Tipo de Solicitação', 'MII,PNP,PGA');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', anoSafra);
	//Identificação do Movimento
	numberValidator(line,13, 5, false, 'Identificação do Movimento', '');
	//Tipo do Registro
	stringValidator(line,18, 2, false, 'Tipo do Registro', '03');
	//Número da Solicitação de Financiamento
	numberValidator(line,20, 9, false, 'Número da Solicitação de Financiamento', '');
	//Código do tipo da informação complementar
	validateCodigoTipoInformacaoComplementar(line,29, 3, false, 'Código do tipo da informação Complementar', subProgram);
	//Valor da informação complementar
	validateValorInformacaoComplementar(line, line.substr(29,3), 'Valor da informação Complementar', subProgram);	
}

function solicitacaoTrailer(line, linesLength){
	console.log("Solicitação Trailer");
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII,PNP,PGA');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', anoSafra);
	//Identificação do Movimento
	numberValidator(line,13, 5, false, 'Identificação do Movimento', '');
	//Tipo do registro
	stringValidator(line,18, 2, false, 'Tipo do registro', '99');
	//Constante
	numberValidator(line,20, 9, false, 'Constante', '999999999');
	//Quantidade de Registros 
	numberValidator(line,29, 5, false, 'Quantidade de Registros ', linesLength);
	//Vago
	stringValidator(line,34, 466, true, 'Vago', '');

}

