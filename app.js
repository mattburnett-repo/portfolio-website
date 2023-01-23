const sections = document.querySelectorAll('.section')
const sectBtns = document.querySelectorAll('.controls')
const sectBtn = document.querySelectorAll('.control')
const allSections = document.querySelector('.main-content')

function PageTransitions() {
  // Active button
  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener('click', function () {
      let activeBtn = document.querySelector('.active-btn')
      activeBtn.className = activeBtn.className.replace('active-btn', '')
      this.className += ' active-btn'
    })
  }

  // Active section
  allSections.addEventListener('click', (e) => {
    const id = e.target.dataset.id

    if (id) {
      // hide other sections
      sections.forEach((section) => {
        section.classList.remove('active')
      })

      const element = document.getElementById(id)
      element.classList.add('active')
    }
  })

  // Toggle theme
  const themeBtn = document.querySelector('.theme-btn')
  const themeIcon = document.getElementById('theme-icon')

  themeBtn.addEventListener('click', () => {
    let element = document.body

    element.classList.toggle('light-mode')
    themeIcon.classList.toggle('fa-sun')
  })
}

PageTransitions()
