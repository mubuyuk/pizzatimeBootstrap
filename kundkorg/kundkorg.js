// Visa kundkorgsdata på sidan
function visaKundkorg() {
  const kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = ""; // Rensa tidigare innehåll

  if (kundkorg.length === 0) {
    cartContainer.innerHTML = "<p>Kundkorgen är tom.</p>";
    cartTotal.textContent = "0 kr";
    return;
  }

  const template = document.getElementById("cart-item-template"); // Hämta mallen
  let total = 0;

  kundkorg.forEach((item) => {
    total += item.pris * item.antal;

    // Klona mallen
    const cartItem = template.content.cloneNode(true);

    // Fyll med data
    cartItem.querySelector(".cart-item-name").textContent = item.namn;
    cartItem.querySelector(".cart-item-quantity").textContent = item.antal;
    cartItem.querySelector(".cart-item-price").textContent = `${item.pris} kr`;

    // Lägg till eventlyssnare
    cartItem.querySelector(".cart-item-minus").addEventListener("click", () => uppdateraAntal(item, -1));
    cartItem.querySelector(".cart-item-plus").addEventListener("click", () => uppdateraAntal(item, 1));
    cartItem.querySelector(".cart-item-remove").addEventListener("click", () => taBort(item.namn));

    // Lägg till i containern
    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `${total} kr`; // Uppdatera totalsumma
}

// Uppdatera kvantitet i kundkorgen
function uppdateraAntal(pizza, delta) {
  let kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const item = kundkorg.find((product) => product.namn === pizza.namn);

  if (item) {
    item.antal += delta;
    if (item.antal <= 0) {
      kundkorg = kundkorg.filter((product) => product.namn !== pizza.namn);
    }
  }

  localStorage.setItem("kundkorg", JSON.stringify(kundkorg));
  uppdateraBadge(); // Uppdatera badge
  visaKundkorg(); // Uppdatera kundkorgsvyn
}

// Ta bort en produkt helt från kundkorgen
function taBort(namn) {
  let kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  kundkorg = kundkorg.filter((item) => item.namn !== namn);
  localStorage.setItem("kundkorg", JSON.stringify(kundkorg));
  uppdateraBadge();
  visaKundkorg();
}

// Uppdatera badge med antalet objekt i kundkorgen
function uppdateraBadge() {
  const kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const badge = document.getElementById("cart-badge");
  const totalAntal = kundkorg.reduce((sum, item) => sum + item.antal, 0);

  badge.textContent = totalAntal;
  badge.classList.toggle("d-none", totalAntal === 0); // Dölj om kundkorgen är tom
}

// Kör när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
  uppdateraBadge(); // Uppdatera badge när sidan laddas
  visaKundkorg();   // Visa kundkorgen
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))