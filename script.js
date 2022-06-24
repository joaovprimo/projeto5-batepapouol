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
const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', pessoa);
promise.then(tratarSucesso);
promise.catch(tratarErro);
}

function tratarSucesso(sucesso){
console.log(`${login}`);
    setInterval(recebeMsg,3000);
    setInterval(confirmaConexao,5000);
}

function tratarErro(erro){
   const qlerro = erro.response.status;
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
 const listaDeMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
 listaDeMensagem.then(processaMensagem);
}

function processaMensagem(mensagem){
    const mensg = document.querySelector('.caixamensagens');
    let data = mensagem.data;
    mensg.innerHTML ="";
    for(let i=0; i<data.length;i++){
    if(data[i].type==='status'){
    mensg.innerHTML+= `<li class="status"> 
        <div class="texto">
        <div class="hora">${data[i].time}</div>
        <div class="login"> ${data[i].from} </div> 
        ${data[i].text}</div>
    </li>`;
    }
    if(data[i].type ==="message"){
       mensg.innerHTML +=
    `<li class="normais">
        <div class="texto">
        <div class="hora">${data[i].time}</div>
        <div class="nome"> ${data[i].from} </div> 
        para  
        <div class="nome"> ${data[i].to}</div>
        : ${data[i].text}</div>
    </li>`;
    }
    if(data[i].type ==="private_message"){
        mensg.innerHTML += 
    `<li class="reservado">
        <div class="texto">
        <div class="hora">${data[i].time}</div>
        <div class="nome"> ${data[i].from} </div> 
        reservadamente para  
        <div class="nome"> ${data[i].to}</div>:
        ${data[i].text}</div>
     </li>`;
     }
    }
}

function confirmaConexao(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', pessoa);
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
