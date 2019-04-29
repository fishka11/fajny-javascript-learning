// // eslint-disable-next-line import/prefer-default-export
// export class OfficialJokeRepo {
//   constructor(ask, answer, category) {
//     this.ask = ask;
//     this.answer = answer;
//     this.category = category;
//   }
//
//   toString() {
//     return `Programistyczny żarcik na dzisiaj:
//     - ${this.ask}
//     - ${this.answer}`;
//   }
// }
//
// export class ICNDbRepo {
//   constructor(joke) {
//     this.joke = joke;
//   }
//
//   toString() {
//     return `Programistyczny żarcik na dzisiaj:
//     ${this.joke}`;
//   }
// }

// eslint-disable-next-line import/prefer-default-export
export class Joke {
  constructor({ question, answer }) {
    this.question = question;
    this.answer = answer;
  }

  toString() {
    return this.question ? `Programistyczny żarcik na dzisiaj:
- ${this.question}
- ${this.answer}`
      : `Żarcik z Chuckiem na dzisiaj:
${this.answer}`;
  }
}
