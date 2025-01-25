// Array med pizzor
const pizzor = [
  { namn: "Margherita", pris: 75, ingredienser: ["Tomatsås", "Mozzarella", "Basilika"] },
  { namn: "Capricciosa", pris: 95, ingredienser: ["Tomatsås", "Mozzarella", "Skinka", "Champinjoner"] },
  { namn: "Hawaii", pris: 100, ingredienser: ["Tomatsås", "Mozzarella", "Skinka", "Ananas"] },
  { namn: "Vegetariana", pris: 85, ingredienser: ["Tomatsås", "Mozzarella", "Paprika", "Oliver", "Zucchini"] },
  { namn: "Kebab Special", pris: 105, ingredienser: ["Tomatsås", "Mozzarella", "lök", "kebab"] },
  { namn: "Diavola", pris: 110, ingredienser: ["Tomatsås", "Mozzarella", "Salami", "Chili"] },
  { namn: "Frutti di Mare", pris: 120, ingredienser: ["Tomatsås", "Mozzarella", "Skaldjur", "Vitlök"] },
  { namn: "Calzone", pris: 90, ingredienser: ["Tomatsås", "Mozzarella", "Skinka"] },
  { namn: "Parmigiana", pris: 115, ingredienser: ["Tomatsås", "Mozzarella", "Parmaskinka", "Ruccola", "Parmesan"] },
  { namn: "Pepperoni", pris: 110, ingredienser: ["Tomatsås", "Mozzarella", "Pepperoni", "Paprika"] },
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

function visaPopup(pizza, antal) {
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
