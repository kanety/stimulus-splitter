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
      let sizes = data[this.controller.getID(splitter)];
      let panes = this.controller.panes(splitter);
      panes.forEach((pane, i) => {
        if (this.controller.isVertical(splitter)) {
          pane.style.width = sizes[i][0] + 'px';
        } else {
          pane.style.height = sizes[i][1] + 'px';
        }
      });
    });
  }

  save() {
    if (!this.key) return;

    let data = {};
    this.splitters.forEach(splitter => {
      let panes = this.controller.panes(splitter);
      data[this.controller.getID(splitter)] = panes.map(pane => [pane.offsetWidth, pane.offsetHeight]);
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
