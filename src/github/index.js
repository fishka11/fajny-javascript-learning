import GitHubRepos from './component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default async () => {
  library.add(faGithub);
  customElements.define('gh-repos', GitHubRepos);
};
