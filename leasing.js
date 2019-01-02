var valorFinanciado = 0;
var prazoOperacao = 0;
var carencia = 0;
var PMT = 0;
var residual = 0;
var contraPrestacao = 0;
var nAcumulado = 0;
var fatorJuros = 0;
var fatorAcumulado = 0;
var fatorAcumuladoTotal = 0;
var amortizacao = 0;
var diasCarencia = 0;
var jurosMensal = 0;
var tac = 0;
var vrgDiluido = 0;
var valorFinanciadoVRG = 0;
var iss = 0;
var pmtiss = 0;
var contraPrestacaoIss = 0;
var productType = "";
var VRGResidual = 0;


function resetVals(){
    valorFinanciado = 0;
    prazoOperacao = 0;
    carencia = 0;
    PMT = 0;
    residual = 0;
    contraPrestacao = 0;
    nAcumulado = 0;
    fatorJuros = 0;
    fatorAcumulado = 0;
    fatorAcumuladoTotal = 0;
    jurosMensal = 0;
    tac = 0;
    vrgDiluido = 0;
    valorFinanciadoVRG = 0;
    iss=0;
    pmtiss = 0;
    contraPrestacaoIss = 0;
}

function getParams(){
    valorFinanciado = $("#valorFinanciado").val();
    prazoOperacao = $("#prazoOperacao").val();
    carencia = $("#carencia").val();
    diasCarencia = parseInt(carencia) * 30;
    amortizacao = $("#amortizacao").val();
    jurosMensal = $("#jurosMensal").val();
    jurosMensal = jurosMensal/100
    tac = $("#tac").val();
    vrgDiluido = $("#vrgDiluido").val();
    iss = $("#iss").val();

    console.log("valorFinanciado: " + valorFinanciado + " - prazoOperacao: "+ prazoOperacao + " - carencia: "+ carencia);
    console.log("jurosMensal: " + jurosMensal + " - diasCarencia: "+diasCarencia+" - amortizacao: "+amortizacao + " - TAC: "+ tac);
}

function calculate(){
    resetVals();
    getParams();
    if($("#productType").val() == "leasing"){
        calculateLeasing();
    }
    else {
        calculateCDC();
    }
    $("#productTypeSpan").text(($("#productType").val()));
}

function calculateLeasing(){
    for(var i = 1; i <= (prazoOperacao - carencia)/amortizacao; i++){
        nAcumulado = diasCarencia + (i * amortizacao * 30);
        fatorJuros = Math.pow((1 + jurosMensal),(nAcumulado / 30));
        fatorAcumulado = 1 / fatorJuros;
        fatorAcumuladoTotal = fatorAcumuladoTotal + fatorAcumulado;
        console.log("i: "+i);
        console.log("nAcumulado: " + nAcumulado + " - fatorJuros: "+ fatorJuros + " - fatorAcumulado: "+ fatorAcumulado + " - fatorAcumuladoTotal: "+ fatorAcumuladoTotal);
    }
    console.log("valorFinanciado + tac: " + parseFloat((parseFloat(valorFinanciado) + parseFloat(tac))) );
    PMT = parseFloat((parseFloat(valorFinanciado) + parseFloat(tac))) / fatorAcumuladoTotal;
    console.log("PMT: " + PMT);
    $("#PMT").text(PMT);
    
    valorFinanciadoVRG = (parseFloat(valorFinanciado - VRGResidual) * (parseFloat(vrgDiluido / 100)));
    console.log("valorFInanciadoVRG :"+valorFinanciadoVRG);
    residual = parseFloat(valorFinanciadoVRG) / (parseFloat(parseFloat(prazoOperacao) - parseFloat(carencia))/amortizacao);
    console.log("residual: " + residual);
    $("#residual").text(residual);
    
    contraPrestacao = PMT - residual;
    console.log("contraPrestacao: " + contraPrestacao);
    $("#contraPrestacao").text(contraPrestacao);

    contraPrestacaoIss = parseFloat(parseFloat(contraPrestacao) / (parseFloat(1) - 1 * (parseFloat(iss/100))));
    console.log("contra / 1- iss/100: " + parseFloat(parseFloat(contraPrestacao) / (parseFloat(1) - 1 * (parseFloat(iss/100)))));
    $("#contraPrestacaoIss").text(contraPrestacaoIss);

    pmtiss = parseFloat(parseFloat(residual) + parseFloat(contraPrestacaoIss));
    console.log("residual  + contra c/ iss: " + parseFloat(parseFloat(residual) + parseFloat(contraPrestacaoIss)));
    $("#pmtiss").text(pmtiss);

}

function calculateCDC(){


}

