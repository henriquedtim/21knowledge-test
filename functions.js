document.addEventListener("DOMContentLoaded", function () {
  console.log("functions.js carregado");

  // 1. Animação do slideshow (apenas se houver .hero-overlay)
  const images = [
    "images/madeira.png",
    "images/porto.png",
    "images/photo43.jpg",
    "images/flagsue.jpg",
    "images/ueportugal.jpg",
  ];

  let index = 0;
  const overlay = document.querySelector(".hero-overlay");

  if (overlay) {
    setInterval(() => {
      index = (index + 1) % images.length;
      overlay.style.backgroundImage = `url('${images[index]}')`;
    }, 2000);
  }

  // 2. Animação da navbar (deve funcionar em todas as páginas que tenham .navbar)
  const colors = ["#A0522D", "#3B6E44", "#1E6F9F"];

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }


function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

  function interpolateColor(color1, color2, factor) {
    const result = color1.map((c, i) =>
      Math.round(c + factor * (color2[i] - c))
    );
    return result;
  }

  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    console.warn(
      "Elemento .navbar não encontrado, animação da navbar ignorada."
    );
    return; // Não faz sentido continuar se não existe navbar
  }

  // Opcional: tenta selecionar os elementos exclusivos do index, se existirem
  const explorer = document.querySelector(".explore-section");
  const heroTitle = document.querySelector(".hero h1");
  const heroSquare = document.querySelector(".hero p");
  const sidebaractive = document.querySelector(".sidebar-link.active");
  const heroOverlay = document.querySelector(".hero-contact");
  const navHover = document.querySelector(".nav-link:hover");

  let current = 0;
  let next = 1;
  let progress = 0;
  const duration = 5000; // 5 segundos para cada transição
  const fps = 60;

  const rgbColors = colors.map((c) => hexToRgb(c));

  function animate() {
    progress += 1 / (duration / (1000 / fps)); // incremento proporcional

    if (progress >= 1) {
      progress = 0;
      current = next;
      next = (next + 1) % colors.length;
    }

    const colorRgb = interpolateColor(
      rgbColors[current],
      rgbColors[next],
      progress
    );
    const colorHex = rgbToHex(...colorRgb);

    navbar.style.setProperty("--main-color", colorHex);

    // Só anima se os elementos existirem
    if (explorer) {
      explorer.style.setProperty("--main-color", colorHex);
    }

    if (heroTitle) {
      heroTitle.style.setProperty("--main-color", colorHex);
    }

    if (heroSquare) {
      heroSquare.style.setProperty("--main-color", colorHex);
    }

    if (sidebaractive) {
      sidebaractive.style.setProperty("--main-color", colorHex);
    }

    if (heroOverlay) {
      heroOverlay.style.setProperty("--main-color", colorHex);
    }

    if (navHover) {
     navHover.style.setProperty("--main-color", colorHex);
    }

    requestAnimationFrame(animate);
  }

  animate();
});
