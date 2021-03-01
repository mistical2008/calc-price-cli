const fs = require("fs");
const clipboardy = require("clipboardy");
const 

// inputs:  base_price<number>
// output: buy-sel-prices<string> "2200-3900 руб."
// Steps:
// 1. Read number
// 2. check in which range number suits
// 3. make a calculations
//      - getBuyPrice() - round to 0.00
//      - getSellPrice() - round to 50
// 4. return a string `${buyPrice}-${sellPrice} руб."
