const url = 'https://teste-api-sifsoft.herokuapp.com/artigo/?format=json'
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
    });
}

getAllArtigo();