function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuButton = document.querySelector(".menu");

  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuButton.innerHTML = "✕"; // Close icon
    menuButton.setAttribute("aria-label", "Close menu");
  } else {
    menuButton.innerHTML = "☰"; // Menu icon
    menuButton.setAttribute("aria-label", "Open menu");
  }
}

const heroSection = document.querySelector(".hero");
const navbar = document.querySelector(".navbar");

if (heroSection && navbar) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 1.0 }, // Changed from 0.05 to 1.0
  );

  observer.observe(heroSection);
}
async function convertCurrency() {
  try {
    let res = await fetch("https://api.exchangerate-api.com/v4/latest/NGN");
    let data = await res.json();
    let usd = (3500 * data.rates.USD).toFixed(2);
    document.getElementById("usdPrice").innerText = "$" + usd;
  } catch {
    document.getElementById("usdPrice").innerText = "USD unavailable";
  }
}
convertCurrency();

const scriptURL =
  "https://script.google.com/macros/s/AKfycbztUX9JMjFEy1sMY2WsdqzCkVWqhaq253DpnaZWi4zsI-cqWn-O98i6QKkOih9VSDW97g/exec";
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Change button text to show it's working
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  // Create the data object
  const formData = {
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    phone: document.getElementById("userPhone").value,
    inquiry: document.getElementById("userInquiry").value,
  };

  // Use Fetch API to send data as JSON
  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      // Replace the entire form with success message
      form.innerHTML = `
        <div class="success-message">
          <h3>✓ Thanks for your inquiry!</h3>
          <p>We will get back to you via your email.</p>
          <p class="redirect-note">Redirecting in <span id="countdown">20</span> seconds...</p>
        </div>
      `;

      // Countdown timer
      let seconds = 15;
      const countdownElement = document.getElementById("countdown");
      const interval = setInterval(() => {
        seconds--;
        countdownElement.innerText = seconds;
        if (seconds === 0) {
          clearInterval(interval);
          location.reload(); // Refresh the page
        }
      }, 1000);
    })
    .catch((error) => {
      statusText.innerHTML = "Error sending message. Please try WhatsApp.";
      statusText.style.color = "red";
      console.error("Error!", error.message);
      submitBtn.innerText = "Send Inquiry";
      submitBtn.disabled = false;
    });
});
