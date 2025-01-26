// Array med pizzor
const pizzor = [
  { namn: "Margherita", pris: 75, ingredienser: ["Tomatsås", "Mozzarella", "Basilika"], bild: "../img/margarita_pizza.jpeg" },
  { namn: "Vegetariana", pris: 85, ingredienser: ["Tomatsås", "Mozzarella", "Paprika", "Oliver", "Zucchini"], bild: "../img/vegetariana_pizza.jpeg" },
  { namn: "Kebab Special", pris: 105, ingredienser: ["Tomatsås", "Mozzarella", "lök", "kebab"], bild: "../img/kebab_pizza.jpeg" },
  { namn: "Diavola", pris: 110, ingredienser: ["Tomatsås", "Mozzarella", "Salami", "Chili"], bild: "../img/diavolo_pizza.jpeg" },
  { namn: "Calzone", pris: 90, ingredienser: ["Tomatsås", "Mozzarella", "Skinka"], bild: "../img/calzone_pizza.jpeg" },
  { namn: "Parmigiana", pris: 115, ingredienser: ["Tomatsås", "Mozzarella", "Parmaskinka", "Ruccola", "Parmesan"], bild: "../img/parma_pizza.jpeg" },
];

function skapaMeny() {
  const menuList = document.getElementById("menu-list");
  const template = document.getElementById("pizza-template");

  pizzor.forEach((pizza, index) => {
    const pizzaItem = template.cloneNode(true);
    pizzaItem.classList.remove("d-none");

    pizzaItem.querySelector(".pizza-name").textContent = `${index + 1}. ${pizza.namn}`;
    pizzaItem.querySelector(".pizza-price").textContent = `${pizza.pris}`;
    pizzaItem.querySelector(".pizza-ingredients").innerHTML = `<strong>Ingredienser:</strong> ${pizza.ingredienser.join(", ")}`;
    pizzaItem.querySelector("img").src = pizza.bild; // Sätt bildens källa
    pizzaItem.querySelector("img").alt = pizza.namn; // Sätt alt-text för tillgänglighet

    pizzaItem.querySelector("button").addEventListener("click", () => laggTillIKundkorg(pizza));
    menuList.appendChild(pizzaItem);
  });
}


function laggTillIKundkorg(pizza) {
  let kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const item = kundkorg.find((product) => product.namn === pizza.namn);

  if (item) {
    item.antal += 1;
  } else {
    kundkorg.push({ ...pizza, antal: 1 });
  }

  localStorage.setItem("kundkorg", JSON.stringify(kundkorg));
  uppdateraBadge();
  visaPopup(pizza, item ? item.antal : 1);
}


function uppdateraBadge() {
  const kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const badge = document.getElementById("cart-badge");
  const totalAntal = kundkorg.reduce((sum, item) => sum + item.antal, 0);
  badge.textContent = totalAntal;
  badge.classList.toggle("d-none", totalAntal === 0);
}

// Popup
let modalInstance; // Global modal-instans

function visaPopup(pizza) {
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(document.getElementById("cart-modal"));
  }
  document.getElementById("modal-pizza-name").textContent = pizza.namn;
  document.getElementById("modal-pizza-price").textContent = pizza.pris;

  modalInstance.show();
}


function uppdateraAntal(pizza, delta) {
  let kundkorg = JSON.parse(localStorage.getItem("kundkorg")) || [];
  const item = kundkorg.find((product) => product.namn === pizza.namn);

  if (item) {
    item.antal += delta;
    if (item.antal <= 0) {
      kundkorg = kundkorg.filter((product) => product.namn !== pizza.namn);
    } else {
      visaPopup(pizza, item.antal);
    }
  }

  localStorage.setItem("kundkorg", JSON.stringify(kundkorg));
  uppdateraBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  skapaMeny();
  uppdateraBadge();
});

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}
