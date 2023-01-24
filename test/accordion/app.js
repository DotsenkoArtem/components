/* 
АККОРДЕОН
- для кнопок задать определенный класс (.accordion-btn)
- для вкладок задать определенный класс (.accordion-content)
- значения атрибута data-target кнопки должно соответствовать значению id вкладки

- поиск вкладок осуществляется по id через атрибут кнопки data-target
- таким образом, вкладка может быть расположена в любом месте независимо от кнопки, то есть мы не должны соблюдать строгую структуру html-разметки
- при открытии вкладки акрываются все остальные закрытые вкладки
*/

"use strict"

setAccordion()

function setAccordion() {
  const accordionBtns = document.querySelectorAll('.accordion-btn')
  const accordionContents = document.querySelectorAll('.accordion-content')

  accordionBtns.forEach((item)=> {
    item.addEventListener('click', function() {

      for (let content of accordionContents) {
        if(content.id == this.dataset.target) {
          handleAccordion(this, content)
          // Break для выхода из цикла на случай, если будет дублирование вкладок аккордеона .accordion-content
          break
        }
      }
    })
  })

  function handleAccordion(button, content){
    // Если вкладка открыта - закрываем ее
    if(button.classList.contains('open')){
      closeAccordion(button, content)
    // В остальных случаях открываем
    } else {
      openAccordion(button, content)
    }
  }

  function openAccordion(button, content){
    // Предварительно закрываем все открытые вкладки
    accordionBtns.forEach(item=> item.classList.remove('open'))
    accordionContents.forEach(item=> item.style.maxHeight = ``)
    // Добавляем класс к кнопке и открываем вкладку
    button.classList.add('open')
    content.style.maxHeight = `${content.scrollHeight}px`
  }

  function closeAccordion(button, content) {
    // Удаляем класс с кнопки и закрываем вкладку
    button.classList.remove('open')
    content.style.maxHeight = ``
  }
}

