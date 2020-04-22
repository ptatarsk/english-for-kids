import Application from './js/Application';
import 'bootstrap';

window.onload = () => {
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = './assets/icons/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);
  const app = new Application();
  app.renderApp();
  app.initApp();
};
