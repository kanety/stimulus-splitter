# stimulus-splitter

A stimulus controller for simple splitter.

## Dependencies

* @hotwired/stimulus 3.0

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

Build html as follows for splitter with vertical bar:

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
    <p>content 2</p>
  </div>
</div>
```

You can also specify horizontal bar as follows:

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
    <p>content 2</p>
  </div>
</div>
```

### Options

#### update-target

By default the size of previous element adjacent with splitter is updated.
If your container has fixed size,
you can update both elements adjacent with the splitter using this option:

```html
<div data-controller="splitter" style="width: 100vw; height: 100vh;"
     data-splitter-update-target-value="both">
</div>
```

#### store-key

Save element size to `sessionStorage`:

```html
<div data-controller="splitter"
     data-splitter-store-key-value="YOUR_KEY">
</div>
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
