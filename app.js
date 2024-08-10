const sections = document.querySelectorAll('.section')
const sectBtns = document.querySelectorAll('.controls')
const sectBtn = document.querySelectorAll('.control')
const allSections = document.querySelector('.main-content')

const portfolioItems = document.querySelectorAll('.portfolio-item');
// const hoverItems = document.querySelectorAll('.hover-item');

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

  // Make portfolio items hover class clickable and show description when clicked.
  // hoverItems.forEach(item => {
  //   item.addEventListener('click', function(event) {
  //     event.preventDefault();
  //     alert('Make portfolio detail visible for this project.');
  //   });
  // });

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('close-dialog')) {
      const dialog = event.target.closest('.portfolio-detail');
      if (dialog) {
        dialog.close();
      }
    }
    });
  
  portfolioItems.forEach(item => {
    const hoverItem = item.querySelector('.hover-item');
    const dialog = item.querySelector('.portfolio-detail');

    if (hoverItem && dialog) {
      hoverItem.addEventListener('click', function(event) {
        event.preventDefault();
        dialog.showModal();
      });
    }
  });

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
