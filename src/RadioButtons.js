import React, { useContext } from "react";
import { Font, RadioButton } from "@procore/core-react";
import { Context } from "./Context";
import styles from "./App.module.scss";

function RadioButtons() {
  const { city, setCity } = useContext(Context);

  return (
    <>
      <Font weight="bold" variant="primary">
        City
      </Font>
      <div className={styles.radioButtons}>
        <RadioButton
          name={"santa_barbara"}
          checked={city === "santa_barbara"}
          onChange={() => setCity("santa_barbara")}
        >
          Santa Barbara
        </RadioButton>
        <RadioButton
          name={"carpinteria"}
          checked={city === "carpinteria"}
          onChange={() => setCity("carpinteria")}
        >
          Carpinteria
        </RadioButton>
        <RadioButton
          name={"ventura"}
          checked={city === "ventura"}
          onChange={() => setCity("ventura")}
        >
          Ventura
        </RadioButton>
        <RadioButton
          name={"austin"}
          checked={city === "austin"}
          onChange={() => setCity("austin")}
        >
          Austin
        </RadioButton>
        <RadioButton
          name={"new_york"}
          checked={city === "new_york"}
          onChange={() => setCity("new_york")}
        >
          New York City
        </RadioButton>
      </div>
    </>
  );
}

export default RadioButtons;
