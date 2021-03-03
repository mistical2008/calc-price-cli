#!/usr/bin/env node
// inputs:  basePrice<number> partNumber<string> qty?<number>
// output: buy-sel-prices<string> "2200-3900 руб."
// Steps:
// 1. Read number
// 2. check in which range number suits
// 3. make a calculations
//      - getBuyPrice() - round to 0.00
//      - getSellPrice() - round to hundreds (or set by variable)
// 4. return a string `${buyPrice}-${sellPrice} руб."

const clipboardy = require("clipboardy");
const [basePrice = 0, partNumber = null, qty = 1] = process.argv.slice(2);

// Configuration
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

const getPriceWithTax = (basePrice) => {
  return Number(basePrice) * Number(1 + 0.2);
};

const getSellPrice = (basePrice, rate) => {
  console.log("Price rate:", rate);
  return round(Number(basePrice) * Number(1 + rate));
};

const calculatePrice = (price) => {
  for (let [range, rate] of priceMap) {
    if (price > range[0] && price < range[1]) {
      return getSellPrice(price, rate);
    }
  }
};

const setResString = (basePrice = 0, partNumber = null, qty) => {
  // defalult: basePrice only
  const buyPrice = getPriceWithTax(basePrice);
  const sellPrice = calculatePrice(getPriceWithTax(basePrice));

  // console.log("Qty type:", typeof qty);
  // console.log("Number(qty) type:", typeof Number(qty), Number(qty));
  // console.log("sellPrice from setResString:", sellPrice);

  if (!partNumber) {
    return `${qty}шт.: ${buyPrice * Number(qty)}-${
      sellPrice * Number(qty)
    } руб.`;
  } else {
    return `${partNumber} (${qty}шт.): ${buyPrice * Number(qty)}-${
      sellPrice * Number(qty)
    } руб.`;
  }
};

const resString = setResString(basePrice, partNumber, qty);

console.log(resString);
clipboardy.writeSync(resString);
