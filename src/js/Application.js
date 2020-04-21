import cards from './Cards';

class Application {
  constructor() {
    this.mode = 'training';
    this.location = 'main';
    this.body = document.querySelector('body');
    this.cards = cards;
  }

  createAppElement(elementType, styleRules = [], appendTo = this.body, attributes = {}) {
    const element = document.createElement(elementType);
    styleRules.forEach((el) => {
      element.classList.add(el);
    });
    Object.keys(attributes).forEach((el) => {
      element.setAttribute(`${el}`, `${attributes[el]}`);
    });
    appendTo.append(element);
    return element;
  }

  renderToolbar() {
    this.menu = this.createAppElement('div', ['menu'], this.toolbar);
    this.menuButtonHolder = this.createAppElement('div', [], this.toolbar);
    this.menuButton = this.createAppElement('img', ['menu-button'], this.menuButtonHolder, {
      src: '../assets/icons/icon-menu.svg',
    });
    this.toggler = this.createAppElement('div', ['toggle'], this.toolbar);
    this.togglerLeftCaption = this.createAppElement('div', ['toggle-label', 'toggle-label-off'], this.toggler);
    this.togglerLeftCaption.innerText = 'Training';
    this.togglerSwitch = this.createAppElement('div', ['toggle-switch'], this.toggler);
    this.togglerRightCaption = this.createAppElement('div', ['toggle-label', 'toggle-label-on'], this.toggler);
    this.togglerRightCaption.innerText = 'Play';
  }

  renderMenu() {
    let menuItems = ['Main'];
    menuItems = menuItems.concat(...this.cards[0]);
    menuItems.push('Statistic');
    menuItems.forEach((el) => {
      this.li = this.createAppElement('li', [], this.menu);
      this.li.innerText = `${el}`;
    });
  }

  renderApp() {
    this.toolbar = this.createAppElement('div', ['toolbar-layout'], this.body);
    this.renderToolbar();
    this.renderMenu();
  }

  togglerEvents() {
    if (this.toggler.classList.contains('active')) {
      this.mode = 'training';
      this.toggler.classList.remove('active');
    } else {
      this.mode = 'game';
      this.toggler.classList.add('active');
    }
  }

  menuEvents() {
    if (this.menuButton.classList.contains('menu-button_active')) {
      this.menuButton.classList.remove('menu-button_active');
      this.menu.classList.remove('menu_active');
    } else {
      this.menuButton.classList.add('menu-button_active');
      this.menu.classList.add('menu_active');
    }
  }

  initApp() {
    window.addEventListener('click', (event) => {
      if (this.menuButton.classList.contains('menu-button_active') && !event.target.className.includes('menu-button')) {
        this.menuButton.classList.remove('menu-button_active');
        this.menu.classList.remove('menu_active');
      }
    });
    this.toolbar.addEventListener('click', (event) => {
      if (event.target.className.includes('menu-button')) {
        this.menuEvents();
      } else if (event.target.className.includes('toggle')) {
        this.togglerEvents();
      }
    });
  }
}

export default Application;

/*
    this.toolbar.querySelectorAll('div').forEach((el) => {
      el.remove();
    });
*/
