import View from './view/View';
import Model from './model/Model';

class Controller {
    constructor(model, view) {
      this.model = Model;
      this.view = View;
    }
}

export default Controller;