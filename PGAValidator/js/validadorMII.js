var MIIAnoSafra = ''; 

function validateMII(){
	console.log("validating using the MII layout");
	$('.layoutType').html("<h3>Using MII Layout</h3>");
	
	var lines = content.split("\n");
	//main loop
	createTable();
	for(k=0; k < lines.length; k++){
		openLine(k);
		currentLine = lines[k];
		var  lineType = currentLine.substr(18,2);
		switch(lineType){
			case "00":
				MIIHeader(currentLine);
				break;
			case "01":
				MIIBody01(currentLine);
				break;
			case "02":
				MIIBody02(currentLine);
				break;
			case "03":
				MIIBody03(currentLine);
				break;
			case "99":
				MIITrailer(currentLine, lines.length);
				break
			default:
				errorMessage("Tipo de Registro "+ lineType +" Inválido na linha "+ k);
				break;
		}
		closeLine();
	}
	closeTable();
}

function MIIHeader(line){
	console.log("MIIHeader");

	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Identificação do Programa 
	stringValidator(line,4, 3, false, 'Identificação do Programa ', 'MII');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', '');
	MIIAnoSafra = line.substr(7,6);
	//Identificação do Movimento 1
	numberValidator(line,13, 5, false, 'Identificação do Movimento 1', '');
	//Tipo do registro 
	stringValidator(line,18, 2, false, 'Tipo do registro ', '00');
	//Vago
	stringValidator(line,20, 480, true, 'Vago', '');
}

function MIIBody01(line){
	console.log("MIIBody01");

	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', MIIAnoSafra);
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
	stringValidator(line,192, 1, false, 'Sistemática Convencional', 'S');
	//Cor / etnia do beneficiário
	validatePCABody01Etnia(line, line.substr(191,1));
	//Vago
	stringValidator(line,194, 306, true, 'Vago', '');
}


function MIIBody02(line){
	console.log("MIIBody02");
	
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', MIIAnoSafra);
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
	numberValidator(line,58, 2, false, 'Periodicidade', '09,11');
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


function MIIBody03(line){
	console.log("MIIBody03");
	
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Tipo de Solicitação
	stringValidator(line,4, 3, false, 'Tipo de Solicitação', 'MII');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', MIIAnoSafra);
	//Identificação do Movimento
	numberValidator(line,13, 5, false, 'Identificação do Movimento', '');
	//Tipo do Registro
	stringValidator(line,18, 2, false, 'Tipo do Registro', '03');
	//Número da Solicitação de Financiamento
	numberValidator(line,20, 9, false, 'Número da Solicitação de Financiamento', '');
	//Código do tipo da informação complementar
	stringValidator(line,29, 3, false, 'Código do tipo da informação complementar', '001,002,003,004,014,027,028');
	//Valor da informação complementar
	validarMIIBody03ValorInformacaoComplementar(line, line.substr(29,3), 'Valor da informação Complementar');	
}

function validarMIIBody03ValorInformacaoComplementar(line, value, field){
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
		case '014':
			numberValidator(line,32, 10, false, 'Área irrigada a ser implementada (em ha)', '');
			break;
		case '027':
			stringValidator(line,32, 3, false, 'Objetivo da Operação', '110,120,130,131,140,150,151,311,320,331');
			break;
		case '028':
			stringValidator(line,32, 1, false, 'Solicitação de financiamento é para aquisição isolada de máquinas e equipamentos?', 'S,N');
			break;
	}
}

function MIITrailer(line, linesLength){
	console.log("MIITrailer");
	//Credencial
	numberValidator(line,0, 4, false, 'Credencial', '');
	//Identificador do Programa
	stringValidator(line,4, 3, false, 'Identificador do Programa', 'MII');
	//Ano Safra
	numberValidator(line,7, 6, false, 'Ano Safra', MIIAnoSafra);
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

