### obzen.js

Obzen.js is a simple js plugin for filtering elements.

  - native js
  - uses data-attributes
  - custom control buttons

### Usage

1. Add obzen.js files
```html
<link rel="stylesheet" type="text/css" href="/<path_to>/obzen.css">
<script src="/<path_to>/obzen.js"></script>
```
2. Create controls and items containers:
```html
<div id="ctrls"></div>
<div class="items square">
      <div data-ftate-value="1" class="item">1</div>
      <div data-ftate-value="2" class="item">2</div>
      <div data-ftate-value="3" class="item">3</div>
</div>
```
3. Initialize obzen.js:
```javascript
var obzenFilter = new Obzen({
      controlsContainer: "ctrls",
      itemsContainer: "items",
});
```
