class View {
  constructor() {
    this.body = document.querySelector('body');
  }

  createAppElement(elementType, styleRules = [], appendTo = this.body) {
    const element = document.createElement(elementType);
    styleRules.forEach((el) => {
      element.classList.add(el);
    });
    appendTo.appendChild(element);
    return element;
  }

  test() {
    this.app = this.createAppElement('div', []);
    this.menu = this.createAppElement('div', ['.menu'], this.app);
  }
}

export default View;
