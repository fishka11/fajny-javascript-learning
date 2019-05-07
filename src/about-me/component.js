/* eslint-disable import/prefer-default-export */
import { getMd } from '../github/service';

export class AboutMe extends HTMLElement {
  static get observedAttributes() {
    return ['page-name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) this.render();
  }

  async render() {
    const name = this.getAttribute('page-name');
    const content = (await getMd(`${name}.md`));
    this.shadowRoot.innerHTML = `
      <mark-down>
        ${content}
      </mark-down>
    `;
  }
}
