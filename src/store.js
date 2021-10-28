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
      if (this.controller.isVertical(splitter)) {
        this.controller.setWidth(panes, sizes[0][0], sizes[1][0]);
      } else {
        this.controller.setHeight(panes, sizes[0][1], sizes[1][1]);
      }
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
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
      console.error(error);
    }
  }
}
