import { dom } from '@fortawesome/fontawesome-svg-core';
import getRepos from './service';

export default class GitHubRepos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async render() {
    const content = (await getRepos());
    this.shadowRoot.innerHTML = `
      ${GitHubRepos.renderStyles()}
      ${GitHubRepos.renderHeader()}
      <table>
        <tbody>
           ${content.map(r => r.toTableRow()).join('\n')}
        </tbody>
      </table>
    `;
    dom.i2svg({ node: this.shadowRoot });
  }

  static renderHeader() {
    const logo = document.getElementById('gh-logo')
      .content
      .cloneNode(true);
    const h2 = document.createElement('h2');
    h2.appendChild(logo);
    return h2.outerHTML;
  }

  static renderStyles() {
    return (`
      <style>
        img {
          height: 1em;
        }
        h2 {
          width: 20%;
          margin: 1em auto 0;
          text-align: left;
        }
        table {
          font-weight: bold;
          background-color: transparent;
          border-spacing: 0;
          border-collapse: collapse;
          border-top: 1px solid #ddd;
          width: 20%;
          margin: 0 auto 20px;
        }
        th, td {
          padding: .5em 1em;
          vertical-align: top;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        tr {
           color: #333;
        }
        tr:hover {
          color: #999;
          cursor: pointer;
        }
      </style>
    `);
  }
}

// (await getRepos()).forEach(r => alert(r));
