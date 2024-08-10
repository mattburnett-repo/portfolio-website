document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const sectBtns = document.querySelectorAll('.controls');
  const sectBtn = document.querySelectorAll('.control');
  const allSections = document.querySelector('.main-content');

  function PageTransitions() {
    // Button click active class
    for (let i = 0; i < sectBtn.length; i++) {
      sectBtn[i].addEventListener('click', function() {
        let currentBtn = document.querySelectorAll('.active-btn');
        currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
        this.className += ' active-btn';
      });
    }

    // Sections Active
    allSections.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (id) {
        // Remove selected from the other btns
        sectBtns.forEach((btn) => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Hide other sections
        sections.forEach((section) => {
          section.classList.remove('active');
        });

        const element = document.getElementById(id);
        element.classList.add('active');
      }
    });

    // Toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
      let element = document.body;
      element.classList.toggle('light-mode');
    });
  }

  PageTransitions();

  // Updated portfolio-item and close-dialog event listeners
  document.querySelector('.portfolio-container').addEventListener('click', function(e) {
    // For portfolio-detail dialogs
    if (e.target.closest('.hover-item') && !e.target.closest('.icons')) {
      const dialog = e.target.closest('.portfolio-item').querySelector('.portfolio-detail');
      dialog.showModal();
    }
    
    // For icon links
    if (e.target.closest('.icons .icon')) {
      e.stopPropagation(); // Prevent triggering the dialog
    }
  });

  // Add event listeners for closing dialogs
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-dialog')) {
      const dialog = e.target.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    }
  });
});
