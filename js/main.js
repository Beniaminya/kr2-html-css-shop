"use strict";

// Проверка всех демонстрационных форм средствами HTML и Bootstrap.
document.querySelectorAll(".needs-validation").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const successMessage = document.getElementById(form.dataset.success);

    form.reset();
    form.classList.remove("was-validated");

    if (successMessage) {
      successMessage.classList.remove("d-none");
    }
  });

  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");

    const successMessage = document.getElementById(form.dataset.success);
    if (successMessage) {
      successMessage.classList.add("d-none");
    }
  });
});

// Подстановка выбранного растения в Bootstrap-модальное окно.
const orderModal = document.getElementById("order-modal");

if (orderModal) {
  orderModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const productSelect = orderModal.querySelector("[name='product']");
    const form = orderModal.querySelector("form");
    const successMessage = orderModal.querySelector(".alert-success");

    form.reset();
    form.classList.remove("was-validated");
    successMessage.classList.add("d-none");

    if (button && button.dataset.product) {
      productSelect.value = button.dataset.product;
    }
  });
}

// Учебная фильтрация каталога по названию, категории и цене.
const catalogForm = document.getElementById("catalog-filters");

if (catalogForm) {
  const productCards = Array.from(document.querySelectorAll(".catalog-product"));
  const resultCount = document.getElementById("result-count");
  const emptyMessage = document.getElementById("catalog-empty");

  const applyCatalogFilters = () => {
    const query = catalogForm.elements.search.value.trim().toLowerCase();
    const category = catalogForm.elements.category.value;
    const maxPrice = Number(catalogForm.elements.price.value) || Infinity;
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matchesSearch = card.dataset.name.includes(query);
      const matchesCategory = !category || card.dataset.category === category;
      const matchesPrice = Number(card.dataset.price) <= maxPrice;
      const isVisible = matchesSearch && matchesCategory && matchesPrice;

      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    resultCount.textContent = String(visibleCount);
    emptyMessage.classList.toggle("d-none", visibleCount !== 0);
  };

  catalogForm.addEventListener("input", applyCatalogFilters);
  catalogForm.addEventListener("change", applyCatalogFilters);
  catalogForm.addEventListener("reset", () => {
    window.setTimeout(applyCatalogFilters, 0);
  });
}
