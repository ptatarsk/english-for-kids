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
    this.menuButtonHolder = this.createAppElement('div', ['menu-button-wrapper'], this.toolbar);
    this.menuButton = this.createAppElement('img', ['menu-button'], this.menuButtonHolder, {
      src: './assets/icons/icon-menu.svg',
    });
    this.toggler = this.createAppElement('div', ['toggle'], this.toolbar);
    this.togglerLeftCaption = this.createAppElement('div', ['toggle-label', 'toggle-label-off'], this.toggler);
    this.togglerLeftCaption.innerText = 'Training';
    this.togglerSwitch = this.createAppElement('div', ['toggle-switch'], this.toggler);
    this.togglerRightCaption = this.createAppElement('div', ['toggle-label', 'toggle-label-on'], this.toggler);
    this.togglerRightCaption.innerText = 'Play';
  }

  renderMenu() {
    this.menuItems = this.menuItems.concat(...this.cards[0][0].cardsList);
    this.menuItems.push('Statistic');
    this.menuContainer = this.createAppElement('ul', ['menu-container'], this.menu);
    this.menuItems.forEach((el) => {
      this.li = this.createAppElement('li', ['menu-item'], this.menuContainer);
      this.li.innerText = `${el}`;
    });
  }

  createCard(el) {
    if (this.mode === 'game') {
      this.cardContainer = this.createAppElement('div', ['card-container'], this.cardHolder);
      this.cardWrapper = this.createAppElement('div', ['card-wrapper'], this.cardContainer);
      this.cardImage = this.createAppElement('img', ['card-image', 'in-game'], this.cardWrapper, {
        src: `${el.image}`,
      });
    } else if (this.mode === 'training') {
      this.cardContainer = this.createAppElement('div', ['card-container'], this.cardHolder);
      this.cardWrapper = this.createAppElement('div', ['card-wrapper-train'], this.cardContainer);
      this.frontSide = this.createAppElement('div', ['front-side'], this.cardWrapper);
      this.backSide = this.createAppElement('div', ['back-side'], this.cardWrapper);
      this.cardWord = this.createAppElement('p', ['card-text'], this.frontSide);
      this.cardWord.innerText = `${el.word}`;
      this.cardImage = this.createAppElement('img', ['card-image'], this.frontSide, {
        src: `${el.image}`,
      });
      this.cardControls = this.createAppElement('div', ['card-controls'], this.frontSide);
      this.cardTranslate = this.createAppElement('img', ['card-translate'], this.cardControls, {
        src: './assets/icons/translate.svg',
      });
      this.cardSound = this.createAppElement('img', ['card-sound'], this.cardControls, {
        src: './assets/icons/play.svg',
      });
      this.cardAudio = this.createAppElement('audio', ['card-audio'], this.cardControls, {
        src: `${el.audioSrc}`,
      });
      this.cardImageBack = this.createAppElement('img', ['card-image'], this.backSide, {
        src: `${el.image}`,
      });
      this.cardTranslation = this.createAppElement('p', ['card-translation'], this.backSide);
      this.cardTranslation.innerText = `${el.translation}`;
    }
  }

  renderCards() {
    if (this.page === 'Main') {
      this.cardsArray = this.cards[0][0].cardsList;
      this.cardsImages = this.cards[0][0].image;
      for (let i = 0; i < this.cardsArray.length; i += 1) {
        this.cardContainer = this.createAppElement('div', ['card-container'], this.cardHolder);
        this.cardWrapper = this.createAppElement('div', ['card-wrapper', 'card-category'], this.cardContainer);
        this.cardWord = this.createAppElement('p', ['card-text', 'card-category'], this.cardWrapper);
        this.cardWord.innerText = `${this.cardsArray[i]}`;
        this.cardImage = this.createAppElement('img', ['card-image', 'card-category'], this.cardWrapper, {
          src: `${this.cardsImages[i]}`,
        });
      }
    } else {
      this.cardsArray = this.cards[this.menuItems.indexOf(this.page)];
      this.cardsArray.forEach((el) => {
        this.createCard(el);
      });
      if (this.mode === 'game') {
        this.cardSound = this.createAppElement('img', ['play-game'], this.pageView, {
          src: './assets/icons/play.svg',
        });
      }
    }
  }

  renderStatistic() {
    this.pageView.querySelectorAll('div').forEach((el) => {
      el.remove();
    });
    this.pageView.querySelectorAll('img').forEach((el) => {
      el.remove();
    });
    this.cardHolder = this.createAppElement('div', ['card-holder'], this.pageView);
  }

  renderPage() {
    if (this.page === 'Statistic') {
      this.renderStatistic();
    } else {
      this.pageView.querySelectorAll('div').forEach((el) => {
        el.remove();
      });
      this.pageView.querySelectorAll('img').forEach((el) => {
        el.remove();
      });
      if (this.mode === 'game') {
        this.answers = this.createAppElement('div', ['answers'], this.pageView);
      }
      this.cardHolder = this.createAppElement('div', ['card-holder'], this.pageView);
      this.renderCards();
    }
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
    this.renderPage();
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
    this.renderPage();
  }

  startGame() {
    this.currntSet = [];
    this.cards[this.menuItems.indexOf(this.page)].forEach((el) => {
      this.currntSet = this.currntSet.concat(el.word);
    });
    this.pageView.querySelectorAll('.play-game').forEach((el) => {
      el.remove();
    });
    this.repeat = this.createAppElement('img', ['repeat-game'], this.pageView, {
      src: './assets/icons/repeat.svg',
    });
    if (document.querySelector('.in-game')) {
      this.randomWord = this.currntSet[Math.floor(Math.random() * this.currntSet.length)];
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
      } else if (event.target.className.includes('menu-item')) {
        this.changePageEvents(event);
      }
    });
    this.pageView.addEventListener('click', (event) => {
      if (this.page === 'Main') {
        if (event.target.className.includes('card-category')) {
          this.page = event.target.closest('.card-wrapper').childNodes[0].innerText;
          this.menuContainer.querySelectorAll('li').forEach((el) => {
            if (el.innerText === this.page) {
              el.classList.add('item-active');
            } else {
              el.classList.remove('item-active');
            }
          });
          this.renderPage();
        }
      } else if (this.mode === 'training') {
        if (event.target.className.includes('card-translate')) {
          if (!event.target.closest('.card-wrapper-train').classList.contains('flipped')) {
            event.target.closest('.card-wrapper-train').classList.add('flipped');
          }
        } else if (event.target.className.includes('card-sound')) {
          event.target.nextSibling.play();
        }
      } else if (this.mode === 'game') {
        if (event.target.className.includes('play-game')) {
          this.startGame();
        }
      }
    });
    this.pageView.addEventListener('mouseout', (event) => {
      if (event.target.className.includes('flipped')) {
        event.target.classList.remove('flipped');
      }
    });
  }
}

export default Application;
