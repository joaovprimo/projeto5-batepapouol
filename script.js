let pessoa = [];
let login;
let data = new Date();
let horas = data.getHours();
let minutos = data.getMinutes();
let segundos = data.getSeconds();
let hhmmss = [horas, minutos, segundos].join(':');

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
    alert (`seja bem-vindo ${login}`);
   let entrou = document.querySelector('.caixamensagens');
   entrou.innerHTML = `<li class="status"> <div class="texto">
   <div class="hora">${(hhmmss)}</div> <div class="login"> ${login} </div> entrou na sala..</div></li>`;
   setInterval(confirmaConexao,5000);
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

function confirmaConexao(){
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', pessoa);
    promise.then(continuaON);
    promise.catch(deslogou);
}

function continuaON (taonline){
console.log('continua Online'); 
}

function deslogou (saiu) {
let statusoff = saiu.response.status;
console.log("saiu da sala");
}
