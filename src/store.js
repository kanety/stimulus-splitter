export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  get splitters() {
    return this.controller.splitters;
  }

  load() {
    if (!this.key) return;

    let data = this.constructor.load(this.key);
    if (!data) return;

    this.splitters.forEach(splitter => {
      let size = data[this.controller.getID(splitter)];
      let pane = splitter.previousElementSibling;
      if (this.controller.isVertical(splitter)) {
        pane.style.width = size[0] + 'px';
      } else {
        pane.style.height = size[1] + 'px';
      }
    });
  }

  save() {
    if (!this.key) return;

    let data = {};
    this.splitters.forEach(splitter => {
      let pane = splitter.previousElementSibling;
      data[this.controller.getID(splitter)] = [pane.offsetWidth, pane.offsetHeight];
    });
    this.constructor.save(this.key, data);
  }

  static load(key) {
    let json = sessionStorage.getItem(key);
    try {
      return JSON.parse(json)
    } catch {
      return null;
    }
  }

  static save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
