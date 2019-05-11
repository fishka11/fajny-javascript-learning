/* eslint-disable import/prefer-default-export */
import { markdownRenderer } from '../common/decorator';
import { getMd } from '../github/service';

@markdownRenderer
export class AboutMe extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  static get observedAttributes() {
    return ['page-name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) this.render();
  }

  async render() {
    const name = this.getAttribute('page-name');
    const content = (await getMd(`${name}.md`));
    this.shadowRoot.innerHTML = this.renderMarkdown(content);
  }
}
