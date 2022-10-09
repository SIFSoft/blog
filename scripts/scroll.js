// Chama a função ``scrollShandow()`` conforme se scrolla a página.
window.onscroll = function () {
  scrollShandow();
};

// Função ``scrollShandow()`` verificar qual botão do navbar será desabilitado conforme a posição do scroll.
function scrollShandow() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.boxShadow =
      "0px 3px 10px rgba(0, 0, 0, 0.15)";
  } else {
    document.getElementById("navbar").style.boxShadow = "none";
  }
}


