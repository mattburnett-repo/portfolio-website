document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const sectBtns = document.querySelectorAll('.controls');
  const sectBtn = document.querySelectorAll('.control');
  const allSections = document.querySelector('.main-content');

  function PageTransitions() {
    sectBtns.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        const clicked = e.target.closest('.control');
        if (!clicked) return;

        let currentBtn = document.querySelector('.active-btn');
        if (currentBtn) {
          currentBtn.classList.remove('active-btn');
        }

        clicked.classList.add('active-btn');

        // Additional logic for section switching
        const id = clicked.querySelector('span').dataset.id;
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
    });

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
