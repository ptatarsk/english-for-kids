import cards from './Cards';

class Application {
  constructor() {
    this.mode = 'training';
    this.page = 'Main';
    this.body = document.querySelector('body');
    this.cards = cards;
    this.menuItems = ['Main'];
    this.stats = localStorage.getItem('stats') || [];
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
    this.menuItems = this.menuItems.concat(...this.cards[0]);
    this.menuItems.push('Statistic');
    this.menuContainer = this.createAppElement('ul', ['menu-container'], this.menu);
    this.menuItems.forEach((el) => {
      this.li = this.createAppElement('li', ['menu-item'], this.menuContainer);
      this.li.innerText = `${el}`;
    });
  }

  createCard() {
    this.cardContainer = this.createAppElement('div', ['card-container'], this.cardHolder);
    this.frontSide = this.createAppElement('div', ['card-container'], this.cardContainer);
    this.backSide = this.createAppElement('div', ['card-container'], this.cardContainer);
    this.cardWord = this.createAppElement('p', ['card-text'], this.frontSide);
    this.cardImage = this.createAppElement('img', ['card-image'], this.frontSide, {
      src: '../assets/icons/icon-menu.svg',
    });
    this.cardControls = this.createAppElement('div', ['card-controls'], this.frontSide);
    this.cardTranslate = this.createAppElement('img', ['card-translate'], this.cardControls);
    this.cardSound = this.createAppElement('img', ['card-sound'], this.cardControls);
    this.cardAudio = this.createAppElement('audio', ['card-audio'], this.cardControls, {
      src: '../assets/icons/icon-menu.svg',
    });
    this.cardImageBack = this.createAppElement('img', ['card-image'], this.backSide, {
      src: '../assets/icons/icon-menu.svg',
    });
    this.cardTranslation = this.createAppElement('p', ['card-translate'], this.backSide);
  }

  renderCards() {
    this.cardHolder = this.createAppElement('div', ['card-holder'], this.pageView);
    this.cardsArray = this.cards[this.menuItems.indexOf(this.page)];
    console.log('this.cardsArray: ', this.cardsArray);
    this.cardsArray.forEach((el) => {
      this.createCard(el);

      
    });
  }

  // renderStatistic() {

  // }

  renderPage() {
    // if (this.page === 'Statistic') {
    //   this.renderStatistic();
    // } else {
    this.renderCards();
    // }
  }

  renderApp() {
    this.toolbar = this.createAppElement('div', ['toolbar-layout'], this.body);
    this.renderToolbar();
    this.renderMenu();
    this.pageView = this.createAppElement('div', ['page-layout'], this.body);
    this.renderPage();
  }

  togglerEvents() {
    if (this.toggler.classList.contains('active')) {
      this.mode = 'training';
      this.toggler.classList.remove('active');
      this.body.classList.remove('body-active');
    } else {
      this.mode = 'game';
      this.toggler.classList.add('active');
      this.body.classList.add('body-active');
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

  changePageEvents(event) {
    if (!event.target.classList.contains('item-active')) {
      this.menuContainer.querySelectorAll('li').forEach((el) => {
        if (el.classList.contains('item-active')) {
          el.classList.remove('item-active');
        }
      });
      event.target.classList.add('item-active');
      this.page = event.target.innerText;
    }
    console.log(this.page);
    console.log(cards[this.menuItems.indexOf(this.page)]);
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
      } else if (event.target.className.includes('menu-item')) {
        this.changePageEvents(event);
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
