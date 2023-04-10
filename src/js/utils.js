export const returnSingleCountryMarkup = countryData => {
  const [
    {
      capital: [city],
      name: { official: countryName },
      flags: { svg: flagUrl },
      population,
      languages,
    },
  ] = countryData;

  return `
      <h1>
        <img src="${flagUrl}" alt="${countryName}"/>${countryName}
      </h1>
      <ul class="country-info">
        <li><b>Capital</b>: ${city}</li>
        <li><b>Population</b>: ${population}</li>
        <li><b>Languages</b>: ${Object.values(languages).join(', ')}</li>
      </ul>
      `;
};

export const returnCountryItemsMarkup = countriesData =>
  countriesData
    .map(country => {
      const {
        name: { official: countryName },
        flags: { svg: flagUrl },
      } = country;

      return `<li><img alt="${countryName}" src="${flagUrl}"/>${countryName}</li>`;
    })
    .join('');
