let pessoa = [];
let login;
let data = new Date();
let horas = data.getHours();
let minutos = data.getMinutes();
let segundos = data.getSeconds();
let hhmmss = [horas, minutos, segundos].join(':');
let mensagem;

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
console.log(`${login}`)
    setInterval(recebeMsg,3000);
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
function recebeMsg(){
 let listaDeMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
 listaDeMensagem.then(processaMensagem);
}

function processaMensagem(mensagem){
    let mensg = document.querySelector('.caixamensagens').innerHTML;
    mensg="";
    if(mensagem.type === 'status'){
   mensg += `<li class="status"> <div class="texto">
   <div class="hora">${mensagem.time}</div> <div class="login"> ${mensagem.from} </div> ${mensagem.text}</div></li>`;
    }
    if(mensagem.type ==="message"){
       mensg += `<li class="normais"><div class="texto">
       <div class="hora">${mensagem.time}</div>
       <div class="nome"> ${mensagem.from} </div> 
       para  <div class="nome"> ${mensagem.to}</div>: ${mensagem.text}</div></li>`;
    }
    if(mensagem.type ==="private_message"){
        mensg += `<li class="reservado"><div class="texto">
        <div class="hora">${mensagem.time}</div>
        <div class="nome"> ${mensagem.from} </div> 
        reservadamente para  <div class="nome"> ${mensagem.to}</div>: ${mensagem.text}</div></li>`;
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
