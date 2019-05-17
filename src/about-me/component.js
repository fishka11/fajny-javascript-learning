/* eslint-disable import/prefer-default-export */
import { markdownRenderer, onAttributesChangeRenderer } from '../common/decorator';
import { getMd } from '../github/service';

@onAttributesChangeRenderer(['post-name'])
@markdownRenderer
export class AboutMe extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  async render() {
    const name = this.getAttribute('page-name');
    const content = (await getMd(`${name}.md`));
    this.shadowRoot.innerHTML = this.renderMarkdown(content);
  }
}
