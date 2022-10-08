
async function getArtigoSlug(){
    let url = window.location.href;
    let slug = url.split('artigo/#')[1];
    console.log(slug)
    let api = `https://teste-api-sifsoft.herokuapp.com/artigo/${slug}/?format=json`
    const response = await fetch(api)
    const data = await response.json();
    document.getElementById("titulo").textContent = data.titulo
    document.getElementById("resumo").textContent = data.resumo
    document.getElementById("texto").innerHTML = data.texto;
    document.getElementById("nomeAutor").textContent = data.author
}

getArtigoSlug()