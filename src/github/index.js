import getRepos, { getMds } from './service';

export default async () => {
  (await getRepos()).forEach(r => alert(r));
};

export async function cheats() {
  const md = document.createElement('mark-down');
  md.textContent = await getMds('arrays.md');
  document.body.appendChild(md);
}
