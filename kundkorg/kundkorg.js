
function visaKundkorg() {
  const kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = ""; 

  if (kundkorg.length === 0) {
    cartContainer.innerHTML = "<p>Kundkorgen är tom.</p>";
    cartTotal.textContent = "0 kr";
    return;
  }

  const template = document.getElementById("cart-item-template"); 
  let total = 0;

  kundkorg.forEach((item) => {
    total += item.pris * item.antal;

  
    const cartItem = template.content.cloneNode(true);

  
    cartItem.querySelector(".cart-item-name").textContent = item.namn;
    cartItem.querySelector(".cart-item-quantity").textContent = item.antal;
    cartItem.querySelector(".cart-item-price").textContent = `${item.pris} kr`;

   
    cartItem.querySelector(".cart-item-minus").addEventListener("click", () => uppdateraAntal(item, -1));
    cartItem.querySelector(".cart-item-plus").addEventListener("click", () => uppdateraAntal(item, 1));
    cartItem.querySelector(".cart-item-remove").addEventListener("click", () => taBort(item.namn));

   
    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `${total} kr`; 
}


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
  uppdateraBadge(); 
  visaKundkorg();  
}


function taBort(namn) {
  let kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  kundkorg = kundkorg.filter((item) => item.namn !== namn);
  localStorage.setItem("kundkorg", JSON.stringify(kundkorg));
  uppdateraBadge();
  visaKundkorg();
}


function uppdateraBadge() {
  const kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const badge = document.getElementById("cart-badge");
  const totalAntal = kundkorg.reduce((sum, item) => sum + item.antal, 0);

  badge.textContent = totalAntal;
  badge.classList.toggle("d-none", totalAntal === 0); 
}


document.addEventListener("DOMContentLoaded", () => {
  uppdateraBadge(); 
  visaKundkorg();  
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))