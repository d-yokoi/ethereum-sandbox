import Web3 from 'web3';

const main = async (): Promise<void> => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));

  const wei = await web3.eth.getBalance('0xe330775caD9532A5545168730a579F8f5949dE15');

  console.log(`balance: ${wei} wei`);

  console.log(await web3.eth.getBlockNumber());
  console.log(await web3.eth.getChainId());
  console.log(await web3.eth.getAccounts());
  console.log(await web3.eth.getGasPrice());
}

main().catch(e => console.error(e));
