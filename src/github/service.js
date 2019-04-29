import { FetchError } from './errors';
import { GitHubRepo } from './model';

const REPOS_URL = 'https://api.github.com/users/mat3e/repos';
const RAW_URL = 'https://raw.githubusercontent.com/fishka11/fishka11.github.io/master/';
const FILES_URL = 'https://api.github.com/repos/fishka11/fishka11.github.io/contents/js-cheatsheet';

const FORBIDDEN_REPOS = ['ux'];
const CHEAT_NAME = /\S+\.md/;

const convert = ({
  name,
  stargazers_count: stars,
  license
}) => new GitHubRepo(name,
  stars,
  license ? license.spdx_id : 'brak');

// export default function getRepos() {
//   return fetch(REPOS_URL)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new FetchError('Response not 200');
//     })
//     .catch((e) => {
//       if (e instanceof FetchError) console.warn(e);
//       else throw e;
//     })
//     .then(arr => arr
//       .filter(r => !FORBIDDEN_REPOS.includes(r.name)).map(convert))
//     .catch(e => console.warn(e));
// }

export default async function getRepos() {
  try {
    const response = await fetch(REPOS_URL);
    if (response.ok) {
      return (await response.json()).filter(r => !FORBIDDEN_REPOS.includes(r.name)).map(convert);
    }
  } catch (e) {
    if (e instanceof FetchError) console.warn('Response not 200');
    else throw e;
  }
  return [];
}

export async function getMds(name) {
  try {
    const response = await fetch(`${RAW_URL}${name}`);
    if (response.ok) {
      return (await response.text());
    }
  } catch (e) {
    if (e instanceof FetchError) console.warn('Response not 200');
    else throw e;
  }
  return '';
}

export async function getMdsNames() {
  try {
    const response = await fetch(FILES_URL);
    if (response.ok) {
      return (await response.json()).filter(file => CHEAT_NAME.test(file.name))
        .map(({ name }) => name.split('.')[0]);
    }
  } catch (e) {
    if (e instanceof FetchError) console.warn('Response not 200');
    else throw e;
  }
  return [];
}
