import cards from './Cards';

class Application {
  constructor() {
    this.mode = 'training';
    this.page = 'Main';
    this.body = document.querySelector('body');
    this.cards = cards;
    this.menuItems = ['Main'];
    this.isGame = false;
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
        alt: `${el.word}`,
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
      this.pageView.querySelectorAll('audio').forEach((el) => {
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
    this.isGame = false;
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

  nextTurn() {
    if (this.currntSet.length) {
      const min = 1;
      const max = this.currntSet.length;
      this.rand = Math.floor(min + Math.random() * (max + 1 - min)) - 1;
      this.randomWord = this.currntSet[this.rand];
      this.randomAudio = this.createAppElement('audio', ['card-audio'], this.cardControls, {
        src: `${this.randomWord.audioSrc}`,
      });
      this.randomAudio.play();
    } else {
      this.isGame = false;
      if (this.incorrectAnswers === 0) {
        this.win.play();
      } else {
        this.lose.play();
      }
      this.pageView.querySelectorAll('div').forEach((el) => {
        el.remove();
      });
      this.pageView.querySelectorAll('img').forEach((el) => {
        el.remove();
      });
      this.pageView.querySelectorAll('audio').forEach((el) => {
        el.remove();
      });
      this.mesagge = this.createAppElement('div', [], this.pageView);
      this.mesaggeText = this.createAppElement('p', ['message'], this.mesagge);
      if (this.incorrectAnswers === 0) {
        this.mesaggeText.innerText = 'Success!';
      } else {
        this.mesaggeText.innerText = `Errors: ${this.incorrectAnswers}! Try again!`;
      }
    }
  }

  startGame() {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.currntSet = this.cards[this.menuItems.indexOf(this.page)].slice();
    this.isGame = true;
    this.pageView.querySelectorAll('.play-game').forEach((el) => {
      el.remove();
    });
    this.repeat = this.createAppElement('img', ['repeat-game'], this.pageView, {
      src: './assets/icons/repeat.svg',
    });
    this.ok = this.createAppElement('audio', ['card-audio'], this.pageView, {
      src: './assets/audio/correct.mp3',
    });
    this.wrong = this.createAppElement('audio', ['card-audio'], this.pageView, {
      src: './assets/audio/error.mp3',
    });
    this.win = this.createAppElement('audio', ['card-audio'], this.pageView, {
      src: './assets/audio/success.mp3',
    });
    this.lose = this.createAppElement('audio', ['card-audio'], this.pageView, {
      src: './assets/audio/failure.mp3',
    });
    this.nextTurn();
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
        } else if (event.target.className.includes('repeat-game')) {
          this.randomAudio.play();
        } else if (this.isGame) {
          if (event.target.attributes.alt && event.target.className.includes('in-game')) {
            if (event.target.getAttribute('alt') === this.randomWord.word) {
              this.correctAnswers += 1;
              this.currntSet.splice(this.rand, 1);
              this.ok.play();
              this.createAppElement('img', ['answers-img'], this.answers, {
                src: './assets/icons/star-win.svg',
              });
              event.target.classList.remove('in-game');
              event.target.classList.add('out-game');
              this.nextTurn();
            } else {
              this.incorrectAnswers += 1;
              this.wrong.play();
              this.createAppElement('img', ['answers-img'], this.answers, {
                src: './assets/icons/star.svg',
              });
              this.randomAudio.play();
            }
          } else {
            this.page = 'Main';
            this.renderPage();
          }
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
