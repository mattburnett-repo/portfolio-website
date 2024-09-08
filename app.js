document.addEventListener('DOMContentLoaded', () => {
  const app = {
    init() {
      this.cacheDOM();
      this.bindEvents();
      this.setInitialState();
    },

    cacheDOM() {
      this.sections = document.querySelectorAll('.section');
      this.sectBtns = document.querySelectorAll('.controls');
      this.sectBtn = document.querySelectorAll('.control');
      this.allSections = document.querySelector('.main-content');
      this.themeBtn = document.querySelector('.theme-btn');
      this.portfolioContainer = document.querySelector('.portfolio-container');
    },

    bindEvents() {
      this.sectBtns.forEach(btn => btn.addEventListener('click', this.handleNavigation.bind(this)));
      this.sectBtns.forEach(btn => btn.addEventListener('touchstart', this.handleNavigation.bind(this)));
      this.themeBtn.addEventListener('click', this.toggleTheme.bind(this));
      this.portfolioContainer.addEventListener('click', this.handlePortfolioClick.bind(this));
      document.addEventListener('click', this.handleDialogClose.bind(this));
    },

    setInitialState() {
      this.setActiveSection('home');
    },

    handleNavigation(e) {
      const clicked = e.target.closest('.control');
      if (!clicked) return;

      this.updateActiveButton(clicked);
      
      // Delay the section update to allow button transition
      setTimeout(() => {
        this.updateActiveSection(clicked.querySelector('span').dataset.id);
      }, 50);
    },

    updateActiveButton(clickedBtn) {
      this.sectBtn.forEach(btn => btn.classList.remove('active-btn'));
      clickedBtn.classList.add('active-btn');
    },

    updateActiveSection(sectionId) {
      this.sections.forEach(section => section.classList.remove('section-active'));
      document.getElementById(sectionId).classList.add('section-active');
    },

    setActiveSection(sectionId) {
      this.updateActiveButton(document.querySelector(`[data-id="${sectionId}"]`).closest('.control'));
      this.updateActiveSection(sectionId);
    },

    toggleTheme() {
      document.body.classList.toggle('light-mode');
    },

    handlePortfolioClick(e) {
      if (e.target.closest('.hover-item') && !e.target.closest('.icons')) {
        const dialog = e.target.closest('.portfolio-item').querySelector('.portfolio-detail');
        dialog.showModal();
      }
    },

    handleDialogClose(e) {
      if (e.target.classList.contains('close-dialog')) {
        const dialog = e.target.closest('dialog');
        if (dialog) {
          dialog.close();
        }
      }
    },
  };

  app.init();
});
