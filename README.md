# stimulus-splitter

A stimulus controller for simple splitter.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-splitter --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import SplitterController from '@kanety/stimulus-splitter';

const application = Application.start();
application.register('splitter', SplitterController);
```

Import css:

```css
@import '@kanety/stimulus-splitter';
```

Build html as follows for vertical splitter:

```html
<div class="st-splitter-vertical" data-controller="splitter">
  <div>
    <p>content 1</p>
  </div>
  <hr data-splitter-id="splitter1">
  <div>
    <p>content 2</p>
  </div>
  <hr data-splitter-id="splitter2">
  <div>
    <p>content 3</p>
  </div>
</div>
```

You can also specify horizontal splitter:

```html
<div class="st-splitter-horizontal" data-controller="splitter">
  <div>
    <p>content 1</p>
  </div>
  <hr data-splitter-id="splitter1">
  <div>
    <p>content 2</p>
  </div>
  <hr data-splitter-id="splitter2">
  <div>
    <p>content 3</p>
  </div>
</div>
```

You can also use for resizable table headers as the following example:

```html
<table class="st-splitter-table" data-controller="splitter">
  <tr>
    <th>header 1</th>
    <th><hr data-splitter-id="1">header 2</th>
    <th><hr data-splitter-id="2">header 3</th>
    <th><hr data-splitter-id="3">header 4</th>
  </tr>
  <tr>
    <td>data 1</td>
    <td>data 2</td>
    <td>data 3</td>
    <td>data 4</td>
  </tr>
</table>
```

### Options

#### resize-target

By default the previous element adjacent with splitter is resized.
If your container has fixed size, you can resize both elements adjacent with the splitter:

```html
<div data-controller="splitter" style="width: 100vw; height: 100vh;"
     data-splitter-resize-target-value="both">
</div>
```

#### store-key

Save element size to `sessionStorage`:

```html
<div data-controller="splitter"
     data-splitter-store-key-value="YOUR_KEY">
</div>
```

### Callbacks

Run callbacks when elements are resized by splitter:

```javascript
let element = document.querySelector('[data-controller="splitter"]');
element.addEventListener('splitter:resized', e => {
  console.log("resized: " + e.detail.splitter);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
