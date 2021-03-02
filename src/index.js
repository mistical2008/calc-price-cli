// Configuration
const fs = require("fs");
const clipboardy = require("clipboardy");
const [basePrice = 0, partNumber = null, qty = 1] = process.argv.slice(2);
const priceRanges = [
  [[0, 500], 0.7],
  [[501, 1000], 0.65],
  [[1001, 2500], 0.5],
  [[2501, 4000], 0.45],
  [[4001, 6000], 0.4],
  [[6001, 10000], 0.35],
  [[10001, 20000], 0.35],
  [[20001, Infinity], 0.25],
];
const roundTo = 100;
const priceMap = new Map(priceRanges);

// Utils
const round = (number) => {
  return Math.round(number / roundTo) * roundTo;
};

const getByuPrice = (basePrice) => {
  return Number(basePrice) * Number(1 + 0.2);
};

const getSellPrice = (basePrice, rate) => {
  console.log("Price rate:", rate, typeof rate);
  return round(Number(basePrice) * Number(1 + rate));
  //   return basePrice + basePrice * rate;
};

const calculatePrice = (price) => {
  let res;
  for (let [range, rate] of priceMap) {
    if (price > range[0] && price < range[1]) {
      return getSellPrice(price, rate);
    }
  }
  return Number(res);
};

const setResString = (basePrice = 0, partNumber = null, qty) => {
  // defalult: basePrice only
  const buyPrice = getByuPrice(basePrice) * Number(qty);
  const sellPrice = calculatePrice(getByuPrice(basePrice) * Number(qty));

  // console.log("Qty type:", typeof qty);
  // console.log("Number(qty) type:", typeof Number(qty), Number(qty));
  // console.log("sellPrice from setResString:", sellPrice);

  let res;
  if (!partNumber) {
    res = `${qty}шт.: ${buyPrice}-${sellPrice} руб.`;
  } else {
    res = `${partNumber} (${qty}шт.): ${buyPrice}-${sellPrice} руб.`;
  }
  return res;
};

const resString = setResString(basePrice, partNumber, qty);

console.log(resString);
clipboardy.writeSync(resString);

// inputs:  basePrice<number> partNumber<string> qty?<number>
// output: buy-sel-prices<string> "2200-3900 руб."
// Steps:
// 1. Read number
// 2. check in which range number suits
// 3. make a calculations
//      - getBuyPrice() - round to 0.00
//      - getSellPrice() - round to 50
// 4. return a string `${buyPrice}-${sellPrice} руб."
