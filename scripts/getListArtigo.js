const url = "https://teste-api-sifsoft.herokuapp.com/artigo/?format=json";

let titulos = [];
let lista = document.getElementById("resultadosID");
var listaPost = [];

document.getElementById("entradaPesquisa").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    buscaArtigoLista();
  }
});

function cardArtigo(artigo){
      document.getElementById("artigosLoadID").style.visibility = "hidden";
      document.getElementById("artigosLoadID").style.position = "absolute";
      let dia = artigo.created.slice(8, 10) 
      let mes = artigo.created.slice(5, 7)
      let ano =artigo.created.slice(0, 4)
      let titulo = artigo.titulo
      let resumo = artigo.resumo
      if(titulo.length > 63){
        titulo = titulo.slice(0, 59) + '...'
      }
      if(resumo.length > 150){
        resumo = resumo.slice(0, 147) + '...'
      }

      document.getElementById(
        "artigoGrid"
      ).innerHTML += `<a class="cardArtigo" href="post/?${artigo.slug}"> 
            <div class="card">
              <div class="imgCard">
                <img src="${artigo.imagem_capa}" alt="">
              </div>
              <div class="textosCard" title="${artigo.titulo}">
                <span  class="tituloCard">${titulo}</span>
                <hr class="tituloLinhaCard">
                <div class="boxAutorData">
                <span  class="NomeAutor">${artigo.author}</span>
                <span  class="dataCard">Data: ${dia} / ${mes} / ${ano}</span>
                </div>
                <span class="resumoCard">${resumo}</span>
                <span class="leiaMaisCard"><i>Leia mais </i><i class="bi bi-arrow-right-short"></i></span>
              </div>
            </div>
          </a>`;
}


async function getAllArtigo() {
  const response = await fetch(url);
  const data = await response.json();
  data.sort(function(a, b) { 
      let valorA = a.created.slice(8, 10) 
      valorA += a.created.slice(5, 7)
      valorA += a.created.slice(0, 4)
      let valorB = b.created.slice(8, 10) 
      valorB += b.created.slice(5, 7)
      valorB += b.created.slice(0, 4)
    return valorB - valorA 
  }
  )
  document.getElementById("artigosLoadID").style.visibility = "visibility";
  data.map((artigo) => {
    if (artigo.aprovado) {
      listaPost.push(artigo)
      cardArtigo(artigo);
      lista.innerHTML += `<li onclick="window.open('post/?${artigo.slug}', '_self')">${artigo.titulo}</li>`;
      titulos.push(artigo.titulo);
    }
  });
  for (let i in titulos) {
    titulos[i] = titulos[i].toLowerCase();
  }
}

getAllArtigo();

function buscaArtigo(text) {
  let r = new RegExp(text.toLowerCase(), "g");
  for (let i in titulos) {
    if (titulos[i].match(r)) {
      lista.children[i].style.display = "block";
    } else {
      lista.children[i].style.display = "none";
    }
  }
}

function buscaArtigoLista(){
  let text = document.getElementById("entradaPesquisa").value
  if(text === ""){
    return 0;
  }else{
    let r = new RegExp(text.toLowerCase(), "g");
    document.getElementById("artigoGrid").innerHTML = ""
    let postEncontrado = false;
    for (let i in titulos) {
      if (titulos[i].match(r)) {
          cardArtigo(listaPost[i])
          postEncontrado = true;
      }
    }
    if(!postEncontrado){
      document.getElementById("artigoGrid").innerHTML = 
      `<div class="pesquisaNotFound">
          <h3><i class="bi bi-info-lg"></i> Nenhum resultado foi encontrado!</h3>
          <p>Pedimos desculpas, mas não encontramos nada que corresponda a sua pesquisa. </p>
      <div>`
    }
  }
}

function abrilista() {
  lista.style.display = "block";
}

function fecharLista() {
  setTimeout(function () {
    lista.style.display = "none";
  }, 100);
}