import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static targets = ['pane', 'splitter'];
  static values = {
    updateTarget: String,
    storeKey: String
  };
  static actions = [
    ['element', 'mousedown@document->start'],
    ['element', 'touchstart@document->start']
  ];
  static dragActions = [
    ['element', 'mousemove@document->move'],
    ['element', 'touchmove@document->move'],
    ['element', 'mouseup@document->end'],
    ['element', 'touchend@document->end'],
    ['element', 'selectstart@document->prevent']
  ];

  get splitters() {
    return this.scope.findAllElements('[data-splitter-id]');
  }

  initialize() {
    this.store = new Store(this);
  }

  connect() {
    this.store.load();
  }

  start(e) {
    this.splitter = this.splitters.find(splitter => splitter == e.target);
    if (!this.splitter) return;

    [this.startX, this.startY] = this.getXY(e);
    let pane1 = this.splitter.previousElementSibling;
    let pane2 = this.splitter.nextElementSibling;
    this.startSize1 = { width: pane1.offsetWidth, height: pane1.offsetHeight };
    this.startSize2 = { width: pane2.offsetWidth, height: pane2.offsetHeight };

    this.toggleClass(this.splitter, true);
    this.disableIframe(true);
    this.context.actionSet.add(this.constructor.dragActions);
  }

  move(e) {
    let [x, y] = this.getXY(e);
    let pane1 = this.splitter.previousElementSibling;
    let pane2 = this.splitter.nextElementSibling;

    if (this.isVertical(this.splitter)) {
      let width1 = this.startSize1.width + (x - this.startX);
      let width2 = this.startSize2.width - (x - this.startX);
      if (this.updateTargetValue == 'both' || this.updateTargetValue == 'width:both') {
        if (width1 > 0 && width2 > 0) {
          pane1.style.width = width1 + 'px';
          pane2.style.width = width2 + 'px';
        }
      } else {
        if (width1 > 0) {
          pane1.style.width = width1 + 'px';
        }
      }
    } else {
      let height1 = this.startSize1.height + (y - this.startY);
      let height2 = this.startSize2.height - (y - this.startY);
      if (this.updateTargetValue == 'both' || this.updateTargetValue == 'height:both') {
        if (height1 > 0 && height2 > 0) {
          pane1.style.height = height1 + 'px';
          pane2.style.height = height2 + 'px';
        }
      } else {
        if (height1 > 0) {
          pane1.style.height = height1 + 'px';
        }
      }
    }
  }

  end(e) {
    this.toggleClass(this.splitter, false);
    this.disableIframe(false);
    this.context.actionSet.remove(this.constructor.dragActions);

    this.dispatch('resized', { detail: { splitter: this.splitter }});
    this.splitter = null;
    this.store.save();
  }

  prevent(e) {
    e.preventDefault();
  }

  getXY(e) {
    return [
      e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
      e.changedTouches ? e.changedTouches[0].pageY : e.pageY
    ];
  }

  toggleClass(splitter, dragging) {
    if (dragging) {
      splitter.classList.add('st-splitter--dragging');
    } else {
      splitter.classList.remove('st-splitter--dragging');
    }
  }

  getID(splitter) {
    return splitter.getAttribute('data-splitter-id');
  }

  isVertical(splitter) {
    return splitter.parentNode.classList.contains('st-splitter-vertical');
  }

  disableIframe(disabled) {
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.style.pointerEvents = disabled ? 'none' : '';
    })
  }
}
