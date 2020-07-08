import Web3 from 'web3';
import { setupLoader } from '@openzeppelin/contract-loader';

const main = async (args: string[]): Promise<void> => {
  if (args.length !== 1) {
    throw new Error(`Usage: npx ts-node ${__filename} <contract address>`);
  }
  const contractAddress = args[0];

  const web3 = new Web3('http://0.0.0.0:8545');
  const loader = setupLoader({ provider: web3 }).web3;
  const sandboxToken = loader.fromArtifact('SandboxToken', contractAddress);

  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const recipient = accounts[1];

  const sendOptions = { from: sender, gas: 1500000, gasPrice: web3.utils.toWei('100', 'gwei') };

  const beforeBalance = await sandboxToken.methods.balanceOf(recipient).call();
  console.log({ beforeBalance });

  const receipt = await sandboxToken.methods.transfer(recipient, 1).send(sendOptions);
  console.log({ receipt });

  const afterBalance = await sandboxToken.methods.balanceOf(recipient).call();
  console.log({ afterBalance });
}

main(process.argv.slice(2)).catch(e => console.error(e));
