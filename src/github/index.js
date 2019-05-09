import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import GitHubRepos from './component';

export default async () => {
  library.add(faGithub);
  customElements.define('gh-repos', GitHubRepos);
};
