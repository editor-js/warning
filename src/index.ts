/**
 * import types
 */
import type {
  API,
  ToolboxConfig,
  BlockTool,
  ToolConfig,
  BlockToolData,
} from '@editorjs/editorjs';

/**
 * Import Tool's icon
 */
import { IconWarning } from '@codexteam/icons';

/**
 * Build styles
 */
import './index.css';

interface WarningCSS {
  baseClass: string;
  wrapper: string;
  title: string;
  input: string;
  message: string;
}

/**
 * @typedef {object} WarningData
 * @description Warning Tool`s input and output data
 * @property {string} title - warning`s title
 * @property {string} message - warning`s message
 */
export interface WarningData extends BlockToolData {
  title: string;
  message: string;
}

/**
 * @typedef {object} WarningConfig
 * @description Warning Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in warning`s title input
 * @property {string} messagePlaceholder - placeholder to show in warning`s message input
 */
export interface WarningConfig extends ToolConfig {
  titlePlaceholder?: string;
  messagePlaceholder?: string;
}

interface WarningConstructorArgs {
  data: WarningData;
  config?: WarningConfig;
  api: API;
  readOnly: boolean;
}

/**
 * @class Warning
 * @classdesc Warning Tool for Editor.js
 * @property {WarningData} data - Warning Tool`s input and output data
 * @property {API} api - Editor.js API instance
 */
export default class Warning implements BlockTool {
  private api: API;
  private readOnly: boolean;
  private data: WarningData;
  titlePlaceholder: string;
  messagePlaceholder: string;

  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported(): boolean {
    return true;
  }

  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {ToolboxConfig}
   */
  static get toolbox(): ToolboxConfig {
    return {
      icon: IconWarning,
      title: 'Warning',
    };
  }

  /**
   * Allow to press Enter inside the Warning
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks(): boolean {
    return true;
  }

  /**
   * Default placeholder for warning title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER(): string {
    return 'Title';
  }

  /**
   * Default placeholder for warning message
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER(): string {
    return 'Message';
  }

  /**
   * Warning Tool`s styles
   *
   * @returns {WarningCSS}
   */
  get CSS(): WarningCSS {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-warning',
      title: 'cdx-warning__title',
      input: this.api.styles.input,
      message: 'cdx-warning__message',
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params — constructor params
   * @param {WarningData} params.data — previously saved data
   * @param {WarningConfig} params.config — user config for Tool
   * @param {API} params.api - Editor.js API
   * @param {boolean} params.readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }: WarningConstructorArgs) {
    this.api = api;
    this.readOnly = readOnly;

    this.titlePlaceholder =
      config?.titlePlaceholder || Warning.DEFAULT_TITLE_PLACEHOLDER;
    this.messagePlaceholder =
      config?.messagePlaceholder || Warning.DEFAULT_MESSAGE_PLACEHOLDER;

    this.data = {
      title: data.title || '',
      message: data.message || '',
    };
  }

  /**
   * Create Warning Tool container with inputs
   *
   * @returns {Element}
   */
  render(): HTMLElement {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    });
    const message = this._make('div', [this.CSS.input, this.CSS.message], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.message,
    });

    title.dataset.placeholder = this.titlePlaceholder;
    message.dataset.placeholder = this.messagePlaceholder;

    container.appendChild(title);
    container.appendChild(message);

    return container;
  }

  /**
   * Extract Warning data from Warning Tool element
   *
   * @param {HTMLDivElement} warningElement - element to save
   * @returns {WarningData}
   */
  save(warningElement: HTMLDivElement): WarningData {
    const title = warningElement.querySelector(`.${this.CSS.title}`);
    const message = warningElement.querySelector(`.${this.CSS.message}`);

    return Object.assign(this.data, {
      title: title?.innerHTML ?? '',
      message: message?.innerHTML ?? '',
    });
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  private _make<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    classNames: string | string[] | null = null,
    attributes: { [key: string]: any } = {}
  ): HTMLElementTagNameMap[K] {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      (el as any)[attrName] = attributes[attrName];
    }

    return el;
  }

  /**
   * Sanitizer config for Warning Tool saved data
   *
   */
  static get sanitize() {
    return {
      title: {},
      message: {},
    };
  }
}
