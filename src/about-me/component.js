/* eslint-disable import/prefer-default-export */
import { getMds } from '../github/service';

export class AboutMe extends HTMLElement {
  static get observedAttributes() {
    return ['page-name'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async render() {
    this.clean();
    const name = this.getAttribute('page-name');
    const md = document.createElement('mark-down');
    md.textContent = (await getMds(`${name}.md`));
    this.shadow.appendChild(md);
  }

  clean() {
    this.shadow.childNodes.forEach(child => child.remove());
  }
}
