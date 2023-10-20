const sections = document.querySelectorAll('.section')
sections.forEach(section => {
  section.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
})


let options = {
  threshold: .5
}

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const targetElement = entry.target
      targetElement.classList.add('fadeIn')
    }
  })
}, options)



sections.forEach(section => {
  observer.observe(section)
})