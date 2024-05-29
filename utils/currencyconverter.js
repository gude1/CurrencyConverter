export const markets = [
  { id: "btcusdt", base_unit: "btc", quote_unit: "usdt" },
  { id: "ethusdt", base_unit: "eth", quote_unit: "usdt" },
  { id: "usdtngn", base_unit: "usdt", quote_unit: "ngn" },
];

const tickers = {
  btcusdt: { ticker: { last: "62281.7" } },
  ethusdt: { ticker: { last: "3165.71" } },
  usdtngn: { ticker: { last: "1347.0" } },
};

export const convertCurrency = (amount, from, to) => {
  try {
    if (!amount || !from || !to) {
      return "";
    }

    let tickerobj = returnTicker(from, to);

    if (!tickerobj) {
      return "";
    }

    if (tickerobj.inverted) {
      let calc = parseFloat(amount) / parseFloat(tickerobj.val.ticker.last);
      return `${calc} ${to}`;
    } else {
      let calc = parseFloat(amount) * parseFloat(tickerobj.val.ticker.last);
      return `${calc} ${to}`;
    }
  } catch (err) {
    console.log("convertCurrency Err", err);
  }
};

const returnTicker = (from, to) => {
  let originalkey = `${from}${to}`;
  let invertedkey = `${to}${from}`;

  let tickerobjorginal = tickers[originalkey];
  let tickerobjinverted = tickers[invertedkey];

  if (tickerobjorginal) {
    return { inverted: false, val: tickerobjorginal };
  }

  if (tickerobjinverted) {
    return { inverted: true, val: tickerobjinverted };
  }
  return null;
};
