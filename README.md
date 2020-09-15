![](https://badgen.net/badge/CodeX%20Editor/v2.0/blue)

# Success Tool

Provides Success Block for the [CodeX Editor](https://ifmo.su/editor). Block has title and message. It can be used, for example, for editorials notifications or appeals.

![](https://capella.pics/2d7b7bc1-ac46-4020-89c9-390d1a7297e2.jpg)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/success
```

Include module at your application

```javascript
const Success = require('@editorjs/success');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/success).

`https://cdn.jsdelivr.net/npm/@editorjs/success@latest`

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    success: Success,
  },
  
  ...
});
```

Or init Success Tool with additional settings

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    success: {
      class: Success,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+W',
      config: {
        titlePlaceholder: 'Title',
        messagePlaceholder: 'Message',
      },
    },
  },
  
  ...
});
```

## Config Params

| Field              | Type     | Description                       |
| ------------------ | -------- | ----------------------------------|
| titlePlaceholder   | `string` | Success Tool's title placeholder  |
| messagePlaceholder | `string` | Success Tool's message placeholder|

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| title     | `string` | Success's title  |
| message   | `string` | Success's message|

```json
{
    "type" : "success",
    "data" : {
        "title" : "Note:",
        "message" : "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff."
    }
}
```
