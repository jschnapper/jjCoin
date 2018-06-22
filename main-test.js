const Main = require('./main.js');

let testCoin = new Main.Blockchain();
testCoin.addBlock(new Main.Block(1, "06/21/2018", { value: 20 }));
testCoin.addBlock(new Main.Block(2, "06/21/2018", { value: 200 }));
console.log('Is the chain valid?: ' + testCoin.isValid());

// create invalid coin by changing value
let hackedCoin1 = new Main.Blockchain();
hackedCoin1 = testCoin;
hackedCoin1.chain[1].data = { value: 1000000 };
console.log('Is the hacked chain 1 valid?: ' + hackedCoin1.isValid());

// create invalid coin by changing hash
let hackedCoin2 = new Main.Blockchain();
hackedCoin2 = testCoin;
hackedCoin2.chain[1].hash = hackedCoin2.chain[1].calculateHash();
console.log('Is the hacked chain 2 valid?: ' + hackedCoin2.isValid());


// console.log(JSON.stringify(testCoin, null, 4));
