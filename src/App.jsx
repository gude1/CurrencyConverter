import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { convertCurrency, markets } from "../utils/currencyconverter";
import ConverterBtn from "./components/ConverterBtn/ConverterBtn";

function App() {
  const [count, setCount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const[inverted, setInverted] = useState(false);
  const [result, setResult] = useState("");

  const onFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const onToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const onAmountInputChange = (event) => {
    setAmount(event.target.value);
  };

  const convertToCurrency = () => {
    try {
      if (!fromCurrency || !toCurrency || !amount) {
        return;
      }

      // let fromcurrency =  inverted ? toCurrency: fromCurrency;
      // let tocurrency= inverted ? fromCurrency: toCurrency;

      let result = convertCurrency(amount, fromCurrency, toCurrency);
      if (!result) {
        alert("Could not convert currency please try again");
        return;
      }

      setResult(result);
    } catch (error) {
      alert("Currency conversion failed, please try again");
      console.log("convertCurrency err", error);
    }
  };

  const invertCurrency = () => {
    let fromcurrency = fromCurrency;
    let tocurrency = toCurrency;

    setToCurrency(fromcurrency);
    setFromCurrency(tocurrency);
  }

  return (
    <>
      <div>
        <div className="">
          <select onChange={onFromCurrencyChange} value={fromCurrency}>
            <option>Please select currency A</option>
            {markets.map((item) => {
              return (
                <>
                  <option key={item.id}>{item.base_unit}</option>
                  <option key={`${item.id}${item.quote_unit}`}>{item.quote_unit}</option>
                </>
              );
            })}
          </select>

          <button onClick={invertCurrency}>Invert</button>
          <select onChange={onToCurrencyChange} value={toCurrency}>
            <option>Please select currency B</option>
            {markets.map((item) => {
              return (
                <>
                  <option key={item.id}>{item.base_unit}</option>
                  <option key={`${item.id}${item.quote_unit}`}>{item.quote_unit}</option>
                </>
              );
            })}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <input value={amount} onChange={onAmountInputChange} />
          <button onClick={convertToCurrency}>Convert</button>
        </div>

        <p>Display Result Here:</p>

        <p>{result}</p>
      </div>
    </>
  );
}

export default App;
