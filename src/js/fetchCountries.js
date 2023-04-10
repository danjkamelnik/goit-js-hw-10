const BASE_URL = 'https://restcountries.com/v3.1/name';

const QUERY_FILTERS = 'fields=name,capital,population,flags,languages';

const fetchCountries = seekedCountry =>
  fetch(`${BASE_URL}/${seekedCountry}?${QUERY_FILTERS}`).then(res => {
    if (!res.ok) {
      throw new Error('Oops, there is no country with that name');
    }

    return res.json();
  });

export default fetchCountries;
