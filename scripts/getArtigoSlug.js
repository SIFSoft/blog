let icons = {
    'insta': '<i class="bi bi-instagram"></i>',
    'face': '<i class="bi bi-facebook"></i>',
    'linkedln': '<i class="bi bi-linkedin"></i>',
    'github': '<i class="bi bi-github"></i>',
    'twitter': '<i class="bi bi-twitter"></i>'
}

async function getArtigoSlug(){
    let url = window.location.href;
    let slug = url.split('artigo/?')[1];
    console.log(slug)
    let api = `https://teste-api-sifsoft.herokuapp.com/artigo/${slug}/?format=json`
    const response = await fetch(api)
    const data = await response.json();
    console.log(data.detail)
    if(data.detail == 'Não encontrado.'){
        document.getElementById("artigoID").innerHTML = `
        <div class="avisoErro">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <h1>A página que você estava procurando não foi encontrada</h1>
            <a href="/"><i class="bi bi-house-fill"></i> Inicio.</a>
        </div>
        `
    }else{
        document.getElementById("titulo").textContent = data.titulo
        document.getElementById("resumo").textContent = data.resumo
        document.getElementById("texto").innerHTML = data.texto;
        document.getElementById("autor").innerHTML = `<p>Autor: </p><p id="nomeAutor">${data.author} <a class='linkRede' href='${data.linkRedeSocial}' target='_blank'>${icons[data.iconTypeRedeSocial]}</a></p>`

    }
}

getArtigoSlug()