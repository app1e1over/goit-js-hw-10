import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_K9nJIAzuihoZ8sDqtJRx1Wa6m20Ln5Z5SQARrDGQXuk4Fs6291XHCghiMNdCCrtG';
export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(v => v.data);
}
export function fetchCatByBreed(breedId){
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(v => v.data);
}