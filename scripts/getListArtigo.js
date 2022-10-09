const url = 'https://teste-api-sifsoft.herokuapp.com/artigo/?format=json'

var titulos = []
var lista = document.getElementById("resultadosID")

async function getAllArtigo(){
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    data.reverse()

    data.map((artigo) =>{
        document.getElementById("artigoGrid").innerHTML += `<a class="cardArtigo" href="artigo/?${artigo.slug}"> 
            <div class="card">
              <div class="imgCard"></div>
              <div class="textosCard">
                <span  class="tituloCard">${artigo.titulo}</span>
                <span  class="NomeAutor">${artigo.author}</span>
                <span  class="dataCard">Data: dd/mm/aaaa</span>
              </div>
            </div>
          </a>`
          lista.innerHTML +=  `<li onclick="window.open('artigo/?${artigo.slug}', '_self')">${artigo.titulo}</li>`
          titulos.push(artigo.titulo)
    });
}
getAllArtigo();

function buscaArtigo(text){
  let r = new RegExp(text, "g")
  for(i in titulos){
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
    lista.style.display = "none"
}