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
      // Media query support for nav buttons. Icons replace text on smaller screens.
      this.mediaQuery_mw_600 = window.matchMedia('(max-width: 600px)');
      this.el_home = document.querySelector('span[data-id="home"]');
      this.el_portfolio = document.querySelector('span[data-id="portfolio"]');
      this.el_skillset = document.querySelector('span[data-id="skill-summary"]');
      this.el_other_info = document.querySelector('span[data-id="other-info"]');
      this.el_contact = document.querySelector('span[data-id="contact"]');
    },

    bindEvents() {
      this.sectBtns.forEach(btn => btn.addEventListener('click', this.handleNavigation.bind(this)));
      this.sectBtns.forEach(btn => btn.addEventListener('touchstart', this.handleNavigation.bind(this)));
      this.themeBtn.addEventListener('click', this.toggleTheme.bind(this));
      this.portfolioContainer.addEventListener('click', this.handlePortfolioClick.bind(this));
      document.addEventListener('click', this.handleDialogClose.bind(this));
      this.mediaQuery_mw_600.addEventListener('change', this.handleMediaQueryChange.bind(this));
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

    handleMediaQueryChange(e) {
      if (e.matches) {
        this.replaceTextWithIcon();
      } else {
        this.resetSpanText();
      }
    },
    replaceTextWithIcon() {
      this.el_home.innerHTML = '<i class="fas fa-home"></i>';
      this.el_portfolio.innerHTML = '<i class="fas fa-briefcase"></i>';
      this.el_skillset.innerHTML = '<i class="fas fa-code"></i>';
      this.el_other_info.innerHTML = '<i class="fas fa-info-circle"></i>';
      this.el_contact.innerHTML = '<i class="fas fa-envelope"></i>';
    },
    resetSpanText() {
      this.el_home.innerHTML = 'Home';
      this.el_portfolio.innerHTML = 'Portfolio';
      this.el_skillset.innerHTML = 'Skill Set';
      this.el_other_info.innerHTML = 'Other Info';
      this.el_contact.innerHTML = 'Contact';
    },
  };

  app.init();
});
