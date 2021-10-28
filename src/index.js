import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static values = {
    resizeTarget: String,
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

    this.startPos = this.pagePos(e);
    this.startSizes = this.panes(this.splitter).map(pane => this.paneSize(pane));

    this.toggleClass(this.splitter, true);
    this.disableIframe(true);
    this.context.actionSet.add(this.constructor.dragActions);
  }

  move(e) {
    let pos = this.pagePos(e);
    let panes = this.panes(this.splitter);

    if (this.isVertical(this.splitter)) {
      this.resizeWidth(panes, pos);
    } else {
      this.resizeHeight(panes, pos);
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

  pagePos(e) {
    return {
      x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
      y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
    };
  }

  panes(splitter) {
    if (this.element.matches('table')) {
      let parent = splitter.closest('th,td');
      return [parent.previousElementSibling, parent];
    } else {
      return [splitter.previousElementSibling, splitter.nextElementSibling]
    }
  }

  paneSize(pane) {
    return { width: pane.offsetWidth, height: pane.offsetHeight };
  }

  isVertical(splitter) {
    return this.element.matches('table') || splitter.parentNode.matches('.st-splitter-vertical');
  }

  resizeWidth(panes, pos) {
    let width1 = this.startSizes[0].width + (pos.x - this.startPos.x);
    let width2 = this.startSizes[1].width - (pos.x - this.startPos.x);
    this.setWidth(panes, width1, width2);
  }

  resizeHeight(panes, pos) {
    let height1 = this.startSizes[0].height + (pos.y - this.startPos.y);
    let height2 = this.startSizes[1].height - (pos.y - this.startPos.y);
    this.setHeight(panes, height1, height2);
  }

  setWidth(panes, width1, width2) {
    if (this.resizeTargetValue == 'both') {
      if (width1 > 0 && width2 > 0) {
        panes[0].style.width = width1 + 'px';
        panes[1].style.width = width2 + 'px';
      }
    } else {
      if (width1 > 0) {
        panes[0].style.width = width1 + 'px';
      }
    }
  }

  setHeight(panes, height1, height2) {
    if (this.resizeTargetValue == 'both') {
      if (height1 > 0 && height2 > 0) {
        panes[0].style.height = height1 + 'px';
        panes[1].style.height = height2 + 'px';
      }
    } else {
      if (height1 > 0) {
        panes[0].style.height = height1 + 'px';
      }
    }
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

  disableIframe(disabled) {
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.style.pointerEvents = disabled ? 'none' : '';
    })
  }
}
