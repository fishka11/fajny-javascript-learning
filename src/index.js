// import convert from './github/converter';
//
// const ghRepoMock = {
//   name: 'brains',
//   stargazers_count: 32,
//   license: { spdx_id: 'MIT' }
// };
// const result = {
//   name: 'brains',
//   stars: 32,
//   license: 'MIT'
// };
//
// alert(convert(ghRepoMock));

// console.log(result);
// import main from './github/index';
// import { cheats } from './github';

// eslint-disable-next-line no-unused-vars
import initMd from 'markdown-element';

import sayJoke from './joke/index';
import about from './about-me/index';
import cheats from './blog/index';
import startGame from './game/index';
import startGHRepos from './github/index';

about();
cheats();
startGHRepos();

window.controls = {
  sayJoke,
  startGame
};
