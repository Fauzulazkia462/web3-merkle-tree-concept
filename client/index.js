const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline');

const serverUrl = 'http://localhost:1225';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
    try{
      const merkleTree = new MerkleTree(niceList);
      const name = await askQuestion("What is your name?\nAnswer: ");
      const index = niceList.findIndex(n => n === name);
      const proof = merkleTree.getProof(index);

      const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name: name,
        proof: proof
      });

      console.log(gift);
      process.exit();
    } catch(error) {
      console.log(error);
      process.exit();
    }
}

main();