import React from "react";
import { Select } from "@procore/core-react";
import styles from "./App.module.scss";

function App() {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState({ id: null, name: null });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSelect = ({ item }) => {
    setValue(item);
  };

  const onClear = () => {
    setValue({});
  };

  const url = "https://api.openbrewerydb.org/breweries?per_page=50";

  const getBreweries = async () => {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
  };

  const beforeShow = async () => {
    setLoading(true);
    return await getBreweries().then((data) => {
      setLoading(false);
      setList(data);
      return true;
    });
  };

  const afterHide = () => {
    setError(false);
  };

  const breweries = list.map((item) => (
    <Select.Option
      className={styles.capitalize}
      key={item.id}
      value={item}
      selected={item.id === value.id}
    >
      {item.name}
    </Select.Option>
  ));

  return (
    <Select
      afterHide={afterHide}
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
