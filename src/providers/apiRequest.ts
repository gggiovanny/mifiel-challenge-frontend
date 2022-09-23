import { API_BASE_URL } from 'constants/apiUrls';

export default (route: string, config?: RequestInit) => {
  const url = new URL(route, API_BASE_URL);
  return fetch(url, config)
    .then(res => res.json())
    .catch(e => {
      throw new Error(e);
    });
};
