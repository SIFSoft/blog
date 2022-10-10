const url = 'https://teste-api-sifsoft.herokuapp.com/artigo/?format=json'

var titulos = []
var lista = document.getElementById("resultadosID")

async function getAllArtigo(){
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    data.reverse()
    document.getElementById("artigosLoadID").style.visibility = 'visibility'
    data.map((artigo) =>{
        document.getElementById("artigosLoadID").style.visibility = 'hidden'
        document.getElementById("artigosLoadID").style.position = 'absolute'
        document.getElementById("artigoGrid").innerHTML += `<a class="cardArtigo" href="post/?${artigo.slug}"> 
            <div class="card">
              <div class="imgCard"></div>
              <div class="textosCard">
                <span  class="tituloCard">${artigo.titulo}</span>
                <span  class="NomeAutor">${artigo.author}</span>
                <span  class="dataCard">Data: dd/mm/aaaa</span>
              </div>
            </div>
          </a>`
          lista.innerHTML +=  `<li onclick="window.open('post/?${artigo.slug}', '_self')">${artigo.titulo}</li>`
          titulos.push(artigo.titulo)
    });
    for(let i in titulos){
      titulos[i] = titulos[i].toLowerCase();
    }
}
getAllArtigo();

function buscaArtigo(text){
  let r = new RegExp(text.toLowerCase(), "g")
  for(let i in titulos){
    if(titulos[i].match(r)){
      lista.children[i].style.display = "block";
    }else{
      lista.children[i].style.display = "none";
    }
  }
}

function abrilista(){
  lista.style.display = "block"
}
function fecharLista(){
  setTimeout(function(){lista.style.display = "none"}, 100);
    
}