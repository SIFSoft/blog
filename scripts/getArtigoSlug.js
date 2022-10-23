let icons = {
  insta: '<i class="bi bi-instagram"></i>',
  face: '<i class="bi bi-facebook"></i>',
  linkedln: '<i class="bi bi-linkedin"></i>',
  github: '<i class="bi bi-github"></i>',
  twitter: '<i class="bi bi-twitter"></i>',
};
let meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

async function getArtigoSlug() {
  let url = window.location.href;
  let slug = url.split("post/?")[1];
  let api = `https://teste-api-sifsoft.herokuapp.com/artigo/${slug}/?format=json`;
  const response = await fetch(api);
  const data = await response.json();

  if (data.detail == "Não encontrado." || !data.aprovado) {
    document.getElementById("artigoID").innerHTML = `
        <div class="avisoErro">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <h1>A página que você estava procurando não foi encontrada</h1>
            <a href="/"><i class="bi bi-house-fill"></i> Inicio.</a>
        </div>
        `;
    document.getElementById("boxCompartilhar").style = 'opacity: 0;  pointer-events: none;'

  } else {
    let dia = data.created.slice(8, 10);
    let mes = data.created.slice(5, 7) - 1;
    let ano = data.created.slice(0, 4);
    let diaU = data.update.slice(8, 10);
    let mesU = data.update.slice(5, 7) - 1;
    let anoU = data.update.slice(0, 4);

    document.getElementById("titulo").textContent = data.titulo;
    document.getElementById("resumo").textContent = data.resumo;
    document.getElementById("texto").innerHTML = data.texto;
    document.getElementById("autor").innerHTML = `<p id="nomeAutor" onclick="window.open('${data.linkRedeSocial}', '_blank')"> <strong>Autor: </strong>  ${data.author} <a class='linkRede' href='${data.linkRedeSocial}' target='_blank'>${icons[data.iconTypeRedeSocial]}</a></p><p>Criado em ${dia} de ${meses[mes]} de ${ano}.</p>`;

    document.getElementById("AtualizaçãoPost").textContent = `Atualizado em ${diaU} de ${meses[mesU]} de ${anoU}.`
  }
}

getArtigoSlug();
