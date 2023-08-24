"use strict";

function handleModals() {
  let modalBtns = document.querySelectorAll(".js-modal-trigger");

  modalBtns.forEach((modalBtn) => {
    // Продолжительность анимации
    let duration;
    let modal = document.querySelector(`#${modalBtn.dataset.target}`);
    let modalClose = modal.querySelector(".modal__close");

    let modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";

    modalBtn.addEventListener("click", openModal);
    modalBackdrop.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);

    // Open-close functions
    function openModal() {
      // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
      modalBtn.dataset.duration === "0"
        ? (duration = 0)
        : // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
          (duration = +modalBtn.dataset.duration || 350); // В
      modal.style.transition = `${duration}ms ease-out`;

      modal.style.display = `flex`;
      // Таймаут для того, чтобы отрабатывала анимация
      setTimeout(() => {
        modal.classList.add("shown");
      }, 0);
      modal.append(modalBackdrop);
    }

    function closeModal() {
      modal.classList.remove("shown");
      setTimeout(() => {
        modal.style = ``;
        modalBackdrop.remove();
      }, duration);
    }
  });
}

handleModals();
