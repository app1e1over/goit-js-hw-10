import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_K9nJIAzuihoZ8sDqtJRx1Wa6m20Ln5Z5SQARrDGQXuk4Fs6291XHCghiMNdCCrtG';

const breedSelect = document.querySelector('.breed-select');


const error = document.querySelector('.error');

function hideError() {
  if (!error.classList.contains('hidden')) error.classList.add('hidden');
}
function showError(){
  error.classList.remove('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Please click here to reload the page.',
    function cb() {
      location.reload();
    },
    {
      timeout: 1,
    },
  )
}

hideError();
breedSelect.classList.add('hidden');
console.log("var 2");
fetchBreeds()
  .then(c => {
    console.log(c);
    for (val of c) {
      let op = document.createElement('option');

      op.value = val.id;
      op.textContent = val.name;
      
      breedSelect.append(op);
    }
  })
  .then(() => {
    console.log("breeds succes");
    breedSelect.classList.remove('hidden');
    new SlimSelect({
      select: "#single",
      settings:{
        
      }
    });
  })
  .catch((e) => {
    console.log(e);
    showError();
  });


  

const catinfo = document.querySelector('.cat-info');
breedSelect.addEventListener('change', e => {
  catinfo.classList.add('hidden');
  hideError();
  fetchCatByBreed(e.target.value)
    .then(v => v[0])
    .then(info => {
      console.log(info);
      document.querySelector('img.cat-picture').src = info.url;
      document.querySelector('h2.cat-name').textContent = info.breeds[0].name;
      document.querySelector('p.cat-desc').textContent =
        info.breeds[0].description;
      document.querySelector('p.cat-temperament').innerHTML =
        '<strong>Temperament:</strong>' + info.breeds[0].temperament;
    })
    .catch(() => {   
       showError();
    })
    .finally(() => {
      catinfo.classList.remove('hidden');
    });
});
