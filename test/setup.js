import { Application } from '@hotwired/stimulus';
import SplitterController from 'index';

const application = Application.start();
application.register('splitter', SplitterController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

global.mockMouseEvent = (type, options = {}) => {
  let event = new MouseEvent(type, { bubbles: options.bubbles });
  Object.defineProperty(event, 'pageX', {
    get: () => options.pageX
  });
  Object.defineProperty(event, 'pageY', {
    get: () => options.pageY
  });
  return event;
}

global.mockElementSize = (selector, width, height) => {
  $$(selector).forEach(elem => {
    Object.defineProperty(elem, 'offsetWidth', {
      get: () => width
    });
    Object.defineProperty(elem, 'offsetHeight', {
      get: () => height
    });
  });
}