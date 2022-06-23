let pessoa = [];
let login;

entrarNaPagina()
function entrarNaPagina (){
    login = prompt ("Qual seu nome para login?");
    pessoa = {
        name:login
    }
    enviaNome()
}

function enviaNome(){
let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', pessoa);
promise.then(tratarSucesso);
promise.catch(tratarErro);
}

function tratarSucesso(sucesso){
let qlsucesso = sucesso.status;
    console.log( 'sucesin');
}

function tratarErro(erro){
   let qlerro = erro.response.status;
   console.log(qlerro);
   if(qlerro === 400){
    login = prompt ("Põe outro ai, esse ja foi usado");
    pessoa = {
        name:login
    }
    enviaNome();
}
}
