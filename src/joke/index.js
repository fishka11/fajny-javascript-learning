import getJoke from './service';

export default async () => {
  alert(await getJoke());
};
