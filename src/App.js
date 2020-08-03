import React from "react";
import { Select } from "@procore/core-react";

function App() {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState({ id: null, name: null });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const perPage = 50;
  const city = "santa_barbara";
  const baseUrl = "https://api.openbrewerydb.org/breweries";
  const url = `${baseUrl}?by_city=${city}&per_page=${perPage}`;

  const getBreweries = async () => {
    let data = [];
    setError(false);
    const response = await fetch(url);
    if (response.ok) {
      data = response.json();
    } else {
      setError(true);
      setLoading(false);
    }
    return data;
  };

  const beforeShow = async () => {
    if (!list.length) {
      setLoading(true);
      return await getBreweries().then((data) => {
        if (data.length) {
          setList(data);
          setLoading(false);
          return true;
        }
        return false;
      });
    }
    return true;
  };

  const onSelect = ({ item }) => {
    setValue(item);
  };

  const onClear = () => {
    setValue({});
  };

  const breweries = list.map((item) => (
    <Select.Option key={item.id} value={item} selected={item.id === value.id}>
      {item.name}
    </Select.Option>
  ));

  return (
    <Select
      beforeShow={beforeShow}
      error={error}
      label={value.name}
      loading={loading}
      onClear={onClear}
      onSelect={onSelect}
      placeholder="Select an item"
    >
      {breweries}
    </Select>
  );
}

export default App;
