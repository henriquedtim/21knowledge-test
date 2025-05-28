document.addEventListener("DOMContentLoaded", function () {
  const images = [
    'images/madeira.png',
    'images/porto.png',
    'images/photo24.jpg',
    'images/photo43.jpg',
    'images/flagsue.jpg',
    'images/ueportugal.jpg'
  ];

  let index = 0;
  const overlay = document.querySelector('.hero-overlay');

  setInterval(() => {
    index = (index + 1) % images.length;
    overlay.style.backgroundImage = `url('${images[index]}')`;
  }, 2000);
});