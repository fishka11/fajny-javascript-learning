// eslint-disable-next-line import/prefer-default-export
export class GitHubRepo {
  constructor(name, stars, license) {
    this.name = name;
    this.stars = stars;
    this.license = license;
  }

  get stringInfo() {
    return this.stars > 0 ? `${this.stars}` : '';
  }

  toString() {
    return `
      Repozytorium: ${this.name}
      Ocena: ${this.stringInfo}
      Licencja: ${this.license}
    `;
  }
}
