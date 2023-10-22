"use strict";

var scrollBarIndicator = document.querySelector('.scroll-bar-indicator');
var scrollBarIndicatorStrip = scrollBarIndicator.querySelector('.scroll-bar-indicator__strip');
var documentHeight = document.documentElement.offsetHeight;
var windowHeight = document.documentElement.clientHeight;

function setScrollBarIndicator() {
  var scrollProgress = window.scrollY;
  scrollBarIndicatorStrip.style.width = "".concat(Math.floor(scrollProgress / (documentHeight - windowHeight) * 10000) / 100, "%");
}

setScrollBarIndicator();
window.addEventListener('scroll', setScrollBarIndicator);
window.addEventListener('resize', setScrollBarIndicator);