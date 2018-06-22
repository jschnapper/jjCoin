class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  // Calculates and returns the hash value
  calculateHash() {
    // @source http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    String.prototype.hashCode = function() {
      let hash = 0;
      if (this.length == 0) return hash;
      for (let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
    return (this.index + this.timestamp + JSON.stringify(this.data)).toString().hashCode().toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];

  }

  // Manually adds first block to chain
  createGenesisBlock() {
    return new Block(0, "06/21/2018", "Genesis block", "0");
  }

  // Returns most recent block
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Adds a new block
  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  // Returns true if the chain is valid, false otherwise
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      let currBlock = this.chain[i];
      let prevBlock = this.chain[i - 1];

      // Checks for validity of the hash for the current block
      if (currBlock.hash != currBlock.calculateHash()) {
        console.log("Hashcode is incorrect");
        console.log("Current Hashcode Property: " + currBlock.hash);
        console.log("Calculated Hashcode: " + currBlock.calculateHash());
        return false;
      }

      // Check if pointing to correct previous block
      if (currBlock.prevHash != prevBlock.hash) {
        console.log("previous block is incorrect");
        console.log("Current Hashcode Property: " + currBlock.prevHash);
        console.log("Calculated Hashcode: " + prevBlock.hash);
        return false;
      }
    }

    return true;
  }
}

module.exports = {
  Block: Block,
  Blockchain: Blockchain
}
