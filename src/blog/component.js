/* eslint-disable import/prefer-default-export */
import style from './style.css';
import { getMds, getMdsNames } from '../github/service';

class HTMLElementWithContent extends HTMLElement {
  constructor(tagName, tagStyle, content) {
    super();
    const tag = document.createElement(tagName);
    tag.className = tagStyle;
    tag.innerHTML = `
    <div class="${style.container}">
        ${content}
    </div>`;
    this.appendChild(tag);
  }
}

export class Header extends HTMLElementWithContent {
  constructor() {
    super('header', style.header, `
        <h1 class="${style['header-heading']}">Notatki z nauki JavaScript</h1>
    `);
  }
}

export class Navigation extends HTMLElementWithContent {
  constructor() {
    super('nav', style['nav-bar'], `
        <ul class="${style.nav}">
            <li><a href="#">Notatki</a></li>
            <li><a href="#">Gra</a></li>
            <li><a href="../index.html#">O mnie</a></li>
        </ul>
    `);
  }
}

export class Footer extends HTMLElementWithContent {
  constructor() {
    super('footer', style.footer, '&copy; Copyright 2019');
  }
}

export class Body extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async render(name) {
    const posts = await getMdsNames();
    const fullPost = !!name;
    this.shadowRoot.innerHTML = (`
      <section>
        ${Body.renderStyles()}
        <div class="${style.container}">
          <main>
            ${posts.reverse()
        .map(postName => (`
          <cheat-post post-name="${postName}" full-post="${fullPost}"></cheat-post>
          <button>${fullPost ? 'Wróć' : 'Czytaj...'}</button>
        `))
        .join('<hr>')}
          </main>
          <aside>
            <slot name="right-side"></slot>
          </aside>
        </div>
      </section>
    `);
  }

  static renderStyles() {
    return (`
      <style>
          .${style.container} {
            max-width: 70em;
            margin: 0 auto;
          }
          section {
            overflow: hidden;
            padding: 1em 1.25em;
            background-color: #fff;
          }
          main, aside {
            margin-bottom: 1em;
          }
          @media (min-width: 55em) {
            section { padding: 2em 3em; }
            main {
              float: left;
              width: 65%;
              margin-right: 5%;
              margin-bottom: 1em;
            }
            aside {
              float: left;
              width: 30%;
              margin-bottom: 1em;
            }
          }
        </style>
    `);
  }
}

export class CheatPost extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  static get observedAttributes() {
    return ['post-name', 'full-post'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async render() {
    const name = this.getAttribute('post-name');
    const fullPost = this.getAttribute('full-post') === 'true';
    const mdContent = (await getMds(`js-cheatsheet/${name}.md`));
    this.shadowRoot.innerHTML = (`
      <article>
        <mark-down>
          ${fullPost ? mdContent : mdContent.substr(0, 200)}
        </mark-down>
      </article>
    `);
  }
}
