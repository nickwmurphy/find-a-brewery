import React, { useState } from "react";
import Header from "./Header";
import BrewerySelect from "./BrewerySelect";
import RadioButtons from "./RadioButtons";
import Map from "./Map";
import { Context } from "./Context";
import styles from "./App.module.scss";

function App() {
  const [city, setCity] = useState("santa_barbara");
  const [brewery, setBrewery] = useState({});

  return (
    <>
      <Header />
      <div className={styles.flexRow}>
        <Context.Provider value={{ city, setCity, brewery, setBrewery }}>
          <div className={styles.controls}>
            <RadioButtons />
            <BrewerySelect />
          </div>
          <Map />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
