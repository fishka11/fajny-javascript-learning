// eslint-disable-next-line import/prefer-default-export
export class GitHubRepo {
  constructor(name, stars, license, url) {
    this.name = name;
    this.stars = stars;
    this.license = license;
    this.url = url;
  }

  get stringInfo() {
    return this.stars > 0 ? `${this.stars}` : '';
  }

  toString() {
    return `
      Repozytorium: ${this.name}
      Ocena: ${this.stringInfo}
      Licencja: ${this.license}
      Link: ${this.url}
    `;
  }

  toTableRow() {
    return `
      <tr onclick="location.assign('${this.url}')">
        <td>${this.name}</td>
        <td>${this.stars}</td>
        <td>${this.license}</td>
      </tr>
    `;
  }
}
