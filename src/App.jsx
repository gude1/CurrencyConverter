import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { convertCurrency, markets, tickers } from "../utils/currencyconverter";
import ConverterBtn from "./components/ConverterBtn/ConverterBtn";
import { MARKET_RES, TICKER_RES } from "./constants/quidax";

function App() {
  const [count, setCount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [quidaxMarkets, setQuidaxMarkets] = useState(markets);
  const [quidaxTickers, setQuidaxTickers] = useState(tickers)
  const [result, setResult] = useState("");

  useEffect(() =>{
    fetchMarkets();
    fetchTickers();
  },[])

  console.log("quidaxTickers",quidaxTickers)
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

      let result = convertCurrency(amount, fromCurrency, toCurrency, quidaxTickers);
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

  const fetchMarkets =  async () => {
    try {
      const result = MARKET_RES;
      if(result.status != "success"){
       alert('Something went wrong, please retry');
       return;
      }

      setQuidaxMarkets(result.data);
      // console.log("fetchMarkets", result);
    } catch (err) {
      alert('Failed to fetch markets, please try again');
      console.error("fetchMarkets err", err)
    }
  }

  const fetchTickers =  async () => {
    try {
      const result = TICKER_RES;

      if(result.status != "success"){
        alert('Something went wrong, please retry');
        return;
       }
 
       setQuidaxTickers(result.data);
      // console.log("fetchTickers", result);
    } catch (err) {
      alert('Failed to fetch markets, please try again');
      console.error("fetchTickers err", err)
    }
  }

  return (
    <>
      <div>
        <div className="">
          <select onChange={onFromCurrencyChange} value={fromCurrency}>
            <option>Please select currency A</option>
            {quidaxMarkets.map((item) => {
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
            {quidaxMarkets.map((item) => {
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
