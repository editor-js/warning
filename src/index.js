/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Import Tool's icon
 */
import ToolboxIcon from './svg/toolbox.svg';

/**
 * @class Success
 * @classdesc Success Tool for Editor.js
 * @property {SuccessData} data - Success Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} SuccessData
 * @description Success Tool`s input and output data
 * @property {string} title - success`s title
 * @property {string} message - success`s message
 *
 * @typedef {object} SuccessConfig
 * @description Success Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in success`s title input
 * @property {string} messagePlaceholder - placeholder to show in success`s message input
 */
export default class Success {
  /**
   * Get Toolbox settings
   *
   * @public
   * @return {string}
   */
  static get toolbox() {
      return {
        icon: ToolboxIcon,
        title: 'Success'
      };
  }

  /**
   * Allow to press Enter inside the Success
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Default placeholder for success title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title';
  }

  /**
   * Default placeholder for success message
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return 'Message';
  }

  /**
   * Success Tool`s styles
   *
   * @returns {Object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-success',
      title: 'cdx-success__title',
      input: this.api.styles.input,
      message: 'cdx-success__message'
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {SuccessData} data — previously saved data
   * @param {SuccessConfig} config — user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this.titlePlaceholder = config.titlePlaceholder || Success.DEFAULT_TITLE_PLACEHOLDER;
    this.messagePlaceholder = config.messagePlaceholder || Success.DEFAULT_MESSAGE_PLACEHOLDER;

    this.data = {
      title: data.title || '',
      message: data.message || ''
    };
  }

  /**
   * Create Success Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: true,
      innerHTML: this.data.title
    });
    const message = this._make('div', [this.CSS.input, this.CSS.message], {
      contentEditable: true,
      innerHTML: this.data.message
    });

    title.dataset.placeholder = this.titlePlaceholder;
    message.dataset.placeholder = this.messagePlaceholder;

    container.appendChild(title);
    container.appendChild(message);

    return container;
  }

  /**
   * Extract Success data from Success Tool element
   *
   * @param {HTMLDivElement} successElement - element to save
   * @returns {SuccessData}
   */
  save(successElement) {
    const title = successElement.querySelector(`.${this.CSS.title}`);
    const message = successElement.querySelector(`.${this.CSS.message}`);

    return Object.assign(this.data, {
      title: title.innerHTML,
      message: message.innerHTML
    });
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if ( Array.isArray(classNames) ) {
      el.classList.add(...classNames);
    } else if( classNames ) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  /**
   * Sanitizer config for Success Tool saved data
   * @return {Object}
   */
   static get sanitize() {
      return {
          title: {},
          message: {}
      };
  }
}

