const parseResponse = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response.json();
};

export default async function fetchBreweries(city) {
  const baseUrl = "https://api.openbrewerydb.org/breweries";
  const perPage = 100;
  const url = `${baseUrl}?by_city=${city}&per_page=${perPage}`;
  const response = await fetch(url, { method: "GET", cache: "reload" });
  return parseResponse(response);
}
