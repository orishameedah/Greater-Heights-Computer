function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

const heroSection = document.querySelector(".hero");
const navbar = document.querySelector(".navbar");

if (heroSection && navbar) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 0.05 },
  );

  observer.observe(heroSection);
}

async function convertCurrency() {
  try {
    let res = await fetch("https://api.exchangerate-api.com/v4/latest/NGN");
    let data = await res.json();
    let usd = (3500 * data.rates.USD).toFixed(2);
    document.getElementById("usdPrice").innerText = "$" + usd + " / Session";
  } catch {
    document.getElementById("usdPrice").innerText = "USD unavailable";
  }
}
convertCurrency();
