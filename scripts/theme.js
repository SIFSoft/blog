const NOME_ARQUIVO = "theme.json";

// Variável para guardar o valor do tema atual selecionado.
let tema = 0;
let giscusFrame;

// Função para escrever no arquivo do modo salvo.
function salvaModo(objeto) {
  let objJson = JSON.stringify(objeto);
  localStorage.setItem(NOME_ARQUIVO, objJson);
}

// Função para ler o arquivo que guarda o modo salvo.
function lerArquivoRanque() {
  let objSalvo = localStorage.getItem(NOME_ARQUIVO);
  return JSON.parse(objSalvo);
}

// Função para mudar o tema conforme o valor do checkbox ao ser clicado.
function theme(valor) {
  if (!giscusFrame) giscusFrame = document.querySelector('iframe.giscus-frame');
  if (valor == 0) {
    document.getElementById("btnMode").value = 1;
    document.getElementById("btnMode").innerHTML =
      "<i class='bi bi-brightness-high-fill theme' id='modeD' title='Modo Claro.'></i>";
    document.getElementById("conteiner").className = "dark";
    tema = 0;
    if(giscusFrame != null)
      giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: 'transparent_dark' } } }, 'https://giscus.app');
  } else if (valor == 1) {
    document.getElementById("btnMode").value = 0;
    document.getElementById("btnMode").innerHTML =
      "<i class='bi bi-moon-stars-fill theme' id='modeC' title='Modo Escuro.'></i>";
    document.getElementById("conteiner").className = "light";
    tema = 1;
    if(giscusFrame != null)
      giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: 'light_tritanopia' } } }, 'https://giscus.app');
  }
  salvaModo(tema);
}
// Função para iniciar o tema salvo no localstorage, ao abrir a página se houver.
window.onload = function () {
  tema = lerArquivoRanque();
  if (tema == null) {
    tema = 1;
  }
  theme(tema);
  setInterval(function () {
    document.getElementById("navbar").style.transition = "0.5s ease-in-out";
    document.getElementById("conteiner").style.transition = "0.5s ease-in-out";
  }, 700);
  setThemeComentarios();
};

// Função para mudar o tema dos comentários conforme o tema do site ativo.
function setThemeComentarios(){
  if (!giscusFrame) giscusFrame = document.querySelector('iframe.giscus-frame');
  if(giscusFrame != null){
    setTimeout(function () {
    if(tema == 1){
      giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: 'light_tritanopia' } } }, 'https://giscus.app');
    }else{
      giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: 'transparent_dark' } } }, 'https://giscus.app');
    }
    console.clear();
    }, 1000);
  }
}

