import React, { useContext, useState } from "react";
import { Select, Font } from "@procore/core-react";
import fetchBreweries from "./Api";
import { Context } from "./Context";

function BrewerySelect() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { city, brewery, setBrewery } = useContext(Context);

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
    setBrewery(item);
  };

  const onClear = () => {
    setBrewery({});
  };

  const breweries = list.map((item) => {
    if (item.latitude && item.longitude) {
      return (
        <Select.Option
          key={item.id}
          value={item}
          selected={item.id === brewery.id}
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
        label={brewery.name}
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
