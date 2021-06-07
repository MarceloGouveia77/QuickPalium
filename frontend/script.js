var origem = '';

var nome = '';
var idade = '';
var sexo = '';
var resultado = '';

function dataFormatada() {
    const data = new Date(); 
  
    var day = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][data.getDay()];
    var date = data.getDate();
    var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
    var year = data.getFullYear();
  
    console.log(data);
  
    $('.data-termo').text(`${day}, ${date} de ${month} de ${year}`);
}

$('input[type=checkbox]').unbind('click.checks').bind('click.checks', function(e){
    $(this).val($(this).is(':checked'));
});

function enviarTeste(event) {
    event.preventDefault();
    var endpoint = 'http://127.0.0.1:3333/pacientes'; // PEGA A URL DO DJANGO TEMPLATE
    var data = {
        'nome': nome,
        'idade': idade,
        'sexo': sexo,
        'resultado': resultado
    }

    $.ajax({
        url: endpoint,
        type: "POST",
        data: JSON.stringify(data),
        cache: false,
        processData: false,
        contentType: 'application/json',
        success: function (data) {
            window.alert("TESTE FINALIZADO, CLIQUE EM OK PARA REINICIAR");
        }
    });
    return false;
}

function mudarTitulo(titulo) {
    $(".card-title").text(titulo);
}

function termo() {
    nome = $("#nome").val();
    idade = $("#idade").val();
    sexo = $("#sexo").val();

    $(".card-body").removeClass("bg-form text-white")
    $(".card-title").text("Termo");
    $(".cadastro").addClass("d-none");
    $(".termo").removeClass("d-none");
    
    dataFormatada();
    $('.participante-termo').text(nome);
}

function start(){
    $(".card-body").addClass("bg-form text-white")

    $(".card-title").text("Você se surpreenderia se este paciente falecesse nos próximos 12 meses?");
    $(".termo").addClass("d-none");
    $(".p1").removeClass("d-none");

}

function exibeResultado(res){
    $(".card-body").empty();
    mudarTitulo("RESULTADO");

    $(".card-body").removeClass("bg-info");
    $(".card-body").addClass("bg-success"); 
    $(".card-header").addClass("text-center");   

    $(".card-body").append(
        `<h3 class="text-center">${res}</h3>`
    );

    resultado = res;
    enviarTeste(event);

}

function p1r1(val) {
    if (origem == "p2") {
        if(!val) {
            mudarTitulo("Paciente apresenta ≥ 2 indicadores gerais de declínio?");
            $(".p1").addClass("d-none");
            $(".p1r1").removeClass("d-none");
        }
 } else {

        if(val) {
            mudarTitulo("Paciente apresenta ≥ 2 indicadores gerais de declínio?");
            $(".p1").addClass("d-none");
            $(".p1r1").removeClass("d-none");
        }else {
            origem = "p2";
            $(".p1").addClass("d-none");
            p1r2();
        }
    }
    
}

function p1r3Submit(val) {
    if(origem == "p2"){
        if (val) {
            exibeResultado("CONSIDERAR ABORDAGEM PALIATIVA");
        }else {
            $(".p1r3").addClass("d-none");
            p1r1(false);
        }
    }else {
        val ? exibeResultado("CONSIDERAR ABORDAGEM PALIATIVA") : exibeResultado("CONSIDERAR TRATAMENTO INTENSIVO");
    }
}

function p1r2 (){
    $(".p1r1").addClass("d-none");
    $(".p1r2").removeClass("d-none");
    mudarTitulo("Charlson de 85%?");
}

function p1r2Submit() {
    s1 = $(".s1").val() == "true" ? 1 : 0;
    s2 = $(".s2").val() == "true" ? 1 : 0;
    s3 = $(".s3").val() == "true" ? 1 : 0;
    s4 = $(".s4").val() == "true" ? 1 : 0;
    s5 = $(".s5").val() == "true" ? 1 : 0;
    s6 = $(".s6").val() == "true" ? 1 : 0;
    s7 = $(".s7").val() == "true" ? 1 : 0;
    s8 = $(".s8").val() == "true" ? 1 : 0;
    s9 = $(".s9").val() == "true" ? 1 : 0;
    s10 = $(".s10").val() == "true" ? 1 : 0;
    s11 = $(".s11").val() == "true" ? 2 : 0;
    s12 = $(".s12").val() == "true" ? 2 : 0;
    s13 = $(".s13").val() == "true" ? 2 : 0;
    s14 = $(".s14").val() == "true" ? 2 : 0;
    s15 = $(".s15").val() == "true" ? 2 : 0;
    s16 = $(".s16").val() == "true" ? 2 : 0;
    s17 = $(".s17").val() == "true" ? 3 : 0;
    s18 = $(".s18").val() == "true" ? 6 : 0;
    s19 = $(".s19").val() == "true" ? 6 : 0;
    
    let total = s1+s2+s3+s4+s5+s6+s7+s8+s9+s10+s11+s12+s13+s14+s15+s16+s17+s18+s19;
    
    if (total >= 5){
        exibeResultado("CONSIDERAR ABORDAGEM PALIATIVA");
    } else {
        $(".p1r2").addClass("d-none");
        $(".p1r3").removeClass("d-none");
        mudarTitulo("Paciente restrito ao leito mais de  50% do tempo?");

    }
}

function p1r1Submit (){
    q1 = $(".q1").val() == "true" ? 1 : 0;
    q2 = $(".q2").val() == "true" ? 1 : 0;
    q3 = $(".q3").val() == "true" ? 1 : 0;
    q4 = $(".q4").val() == "true" ? 1 : 0;

    let total = q1 + q2 + q3 + q4;

    if(total < 2) {
        exibeResultado("CONSIDERAR TRATAMENTO INTENSIVO");
    }else {
        if(origem === "p2") {
            exibeResultado("CONSIDERAR ABORDAGEM PALIATIVA");
        }else {
            p1r2();
        }
    }

}

