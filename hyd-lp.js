
let slides = document.querySelectorAll("#bannerSlider .slide");
let dots = document.querySelectorAll("#sliderDots .dot");
let index = 0;

function updateSlider(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
  index = i;
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => updateSlider(i));
});

setInterval(() => {
  let next = (index + 1) % slides.length;
  updateSlider(next);
}, 4000);
