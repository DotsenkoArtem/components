"use strict";

function handleModals() {
  var modalBtns = document.querySelectorAll(".js-modal-trigger");
  modalBtns.forEach(function (modalBtn) {
    // Продолжительность анимации
    var duration;
    var modal = document.querySelector("#".concat(modalBtn.dataset.target));
    var modalClose = modal.querySelector(".modal__close");
    var modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBtn.addEventListener("click", openModal);
    modalBackdrop.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal); // Open-close functions

    function openModal() {
      // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
      modalBtn.dataset.duration === "0" ? duration = 0 : // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
      duration = +modalBtn.dataset.duration || 350; // В

      modal.style.transition = "".concat(duration, "ms ease-out");
      modal.style.display = "flex"; // Таймаут для того, чтобы отрабатывала анимация

      setTimeout(function () {
        modal.classList.add("shown");
      }, 0);
      modal.append(modalBackdrop);
    }

    function closeModal() {
      modal.classList.remove("shown");
      setTimeout(function () {
        modal.style = "";
        modalBackdrop.remove();
      }, duration);
    }
  });
}

handleModals();