import React, { useContext, useState } from "react";
import { Select, Font } from "@procore/core-react";
import fetchBreweries from "./Api";
import { Context } from "./Context";

function BrewerySelect() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState({ id: null, name: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { city, setBrewery } = useContext(Context);

  const beforeShow = async () => {
    setError(false);

    try {
      setLoading(true);
      const breweries = await fetchBreweries(city);
      setList(breweries);
      setLoading(false);
      return true;
    } catch (error) {
      setError(true);
      setLoading(false);
      return false;
    }
  };

  const onSelect = ({ item }) => {
    setValue(item);
    setBrewery(item);
  };

  const onClear = () => {
    setValue({});
  };

  const breweries = list.map((item) => {
    if (item.latitude && item.longitude) {
      return (
        <Select.Option
          key={item.id}
          value={item}
          selected={item.id === value.id}
        >
          {item.name}
        </Select.Option>
      );
    }
  });

  return (
    <>
      <Font weight="bold" variant="primary">
        Brewery
      </Font>
      <Select
        beforeShow={beforeShow}
        error={error}
        label={value.name}
        loading={loading}
        onClear={onClear}
        onSelect={onSelect}
        placeholder="Select a brewery..."
      >
        {breweries}
      </Select>
    </>
  );
}

export default BrewerySelect;
