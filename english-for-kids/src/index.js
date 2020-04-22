import Application from './js/Application';
import 'bootstrap';

window.onload = () => {
  const app = new Application();
  app.renderApp();
  app.initApp();
};
