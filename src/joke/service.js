// import { FetchError } from './errors';
// import { OfficialJokeRepo, ICNDbRepo } from './model';
//
// const OfficialJokeRepoURL = 'https://official-joke-api.appspot.com/random_joke';
// const ICNDbRepoURL = 'http://api.icndb.com/jokes/random?limitTo=[nerdy]';
//
// function convertOfficialJokeRepo({
//                                    setup: question,
//                                    punchline: answer,
//                                    type: category
//                                  }) {
//   return new OfficialJokeRepo(question,
//     answer,
//     category);
// }
//
// function convertICNDbRepo({ value: { joke } }) {
//   return new ICNDbRepo(joke);
// }
//
// export default async function getJoke() {
//   try {
//     let response = await fetch(OfficialJokeRepoURL);
//     if (response.ok) {
//       let joke = await response.json();
//       if (joke.type !== 'programming') {
//         response = await fetch(ICNDbRepoURL);
//         if (response.ok) {
//           joke = await response.json();
//           return convertICNDbRepo(joke);
//         }
//       }
//       return convertOfficialJokeRepo(joke);
//     }
//   } catch (e) {
//     if (e instanceof FetchError) console.log(e);
//     else throw e;
//   }
//   return [];
// }

import { FetchError } from './errors';
import { Joke } from './model';

const OfficialJokeRepoURL = 'https://official-joke-api.appspot.com/random_joke';
const ICNDbRepoURL = 'http://api.icndb.com/jokes/random?limitTo=[nerdy]';

export default async function getJoke() {
  try {
    let response = await fetch(OfficialJokeRepoURL);
    if (response.ok) {
      const joke = await response.json();
      if (joke.type === 'programming') {
        const { setup: question, punchline: answer } = joke;
        return new Joke({ question, answer });
      }
      response = await fetch(ICNDbRepoURL);
      if (response.ok) {
        const { value: { joke: answer } } = await response.json();
        return new Joke({ answer });
      }
    }
    throw new FetchError('Serwer nie zwrócił statusu 200');
  } catch (e) {
    if (e instanceof FetchError) console.log(e);
    else throw e;
  }
  return [];
}
