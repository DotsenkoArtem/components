"use strict"

const scrollBarIndicator = document.querySelector('.scroll-bar-indicator')
const scrollBarIndicatorStrip = scrollBarIndicator.querySelector('.scroll-bar-indicator__strip')
const documentHeight = document.documentElement.offsetHeight
const windowHeight = document.documentElement.clientHeight

function setScrollBarIndicator() {
  let scrollProgress = window.scrollY
  scrollBarIndicatorStrip.style.width = `${Math.floor(scrollProgress/(documentHeight - windowHeight) * 10000) / 100}%`
}

setScrollBarIndicator()

window.addEventListener('scroll', setScrollBarIndicator)
window.addEventListener('resize', setScrollBarIndicator)
