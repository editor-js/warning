![](https://badgen.net/badge/CodeX%20Editor/v2.0/blue)

# Warning Tool

Provides Warning Block for the [CodeX Editor](https://ifmo.su/editor). Block has title and message. It can be used, for example, for editorials notifications or appeals.

![](assets/2d7b7bc1-ac46-4020-89c9-390d1a7297e2.jpg)

## Installation

Get the package

```shell
yarn add @editorjs/warning
```

Include module at your application

```javascript
import Warning from '@editorjs/warning';
```

Optionally, you can load this tool from CDN [JsDelivr CDN](https://cdn.jsdelivr.net/npm/@editorjs/warning@latest)

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    warning: Warning,
  },
  
  ...
});
```

Or init Warning Tool with additional settings

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    warning: {
      class: Warning,
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
| titlePlaceholder   | `string` | Warning Tool's title placeholder  |
| messagePlaceholder | `string` | Warning Tool's message placeholder|

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| title     | `string` | warning's title  |
| message   | `string` | warning's message|

```json
{
    "type" : "warning",
    "data" : {
        "title" : "Note:",
        "message" : "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff."
    }
}
```
