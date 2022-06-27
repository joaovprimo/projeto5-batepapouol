let pessoa = [];
let login;
let msg;

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
    recebeMsg();
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
    mensg.innerHTML+= 
    `<li class="caixatexto ${data[i].type}">
        <p class="texto">
        <span class="hora">${data[i].time}</span>
        <span class="nome">${data[i].from}</span> 
        <span class="txt">${data[i].text}</span>
         </p>
    </li>`;
    }
    if(data[i].type ==="message"){
       mensg.innerHTML +=
       `<li class="caixatexto ${data[i].type}">
        <p class="texto">
        <span class="hora">${data[i].time}</span>
        <span class="nome"> ${data[i].from}</span> 
        para<span class="nome">${data[i].to}</span>: 
        <span class="txt">${data[i].text}</span>
        </p>
    </li>`;
    }
    if(data[i].type ==="private_message"){
        mensg.innerHTML += 
        `<li class="caixatexto ${data[i].type}">
        <p class="texto">
        <span class="hora">${data[i].time}</span>
        <span class="nome">${data[i].from}</span> 
        reservadamente para<span class="nome">${data[i].to}</span>:
        <span class="txt">${data[i].text}</span>
        </p>
     </li>`;
     }
} const ultimamsg = mensg.lastChild;
ultimamsg.scrollIntoView();
}

function atualizaPagina (){
    setInterval(recebeMsg,3000);
}
atualizaPagina()

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

function apareceBarraInferior(){
    const barrinf = document.querySelector(".barrainferior");
}

function enviaMensagem(){
 msg = document.querySelector(".mensagem").value;
    const novamensagem = {
        from: login,
        to: "Todos",
        text: msg,
        type: "message"};
    
const postamensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novamensagem);
postamensagem.then(pegaMensagens);
postamensagem.catch(recarregaPagina);
const ms = document.querySelector(".mensagem");
ms.value = "";
}

function pegaMensagens (mens){
recebeMsg();
msg.innerHTML="";
}

function recarregaPagina(deslog){
    console.log("O usuário não está mais na sala")
    window.location.reload();
}

const keyBoard = document.querySelector('.mensagem');
keyBoard.addEventListener('keypress', e =>{
    console.log(e);
    if(e.keyCode === 13){
        enviaMensagem();
    }
})