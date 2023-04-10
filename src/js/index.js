import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import fetchCountries from './fetchCountries';

import { returnSingleCountryMarkup, returnCountryItemsMarkup } from './utils';

import '../css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryListEl = document.querySelector('.country-list');
const countryInfoOutputEl = document.querySelector('.country-info');
const searchInputEl = document.getElementById('search-box');

const deleteElementsContent = outputElements => {
  outputElements.forEach(el => {
    el.innerHTML = '';
  });
};

const handleSearchCountry = ({ target: { value } }) => {
  const seekedCountry = value.trim().toLowerCase();

  if (!seekedCountry) {
    deleteElementsContent([countryInfoOutputEl, countryListEl]);

    return;
  }

  deleteElementsContent([countryInfoOutputEl, countryListEl]);

  fetchCountries(seekedCountry)
    .then(data => {
      if (data.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (data.length > 1) {
        countryListEl.innerHTML = returnCountryItemsMarkup(data);
        return;
      }

      countryInfoOutputEl.innerHTML = returnSingleCountryMarkup(data);
    })
    .catch(({ message }) => {
      Notify.failure(message);
    });
};

searchInputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);
