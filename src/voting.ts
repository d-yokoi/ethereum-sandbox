import Web3 from 'web3';
import * as fs from 'fs';
import * as path from 'path';

const main = async (): Promise<void> => {
  const filename = 'contracts_Voting_sol_Voting';
  const filepath = path.resolve(__dirname, '../contracts', filename);
  const bytecode = fs.readFileSync(`${filepath}.bin`).toString();
  const abi = JSON.parse(fs.readFileSync(`${filepath}.abi`).toString());

  const web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));
  const contract = new web3.eth.Contract(abi);

  const candidates = ['Rama', 'Nick', 'Jose'];
  const candidatesHex = candidates.map(web3.utils.asciiToHex);

  const sender = contract.deploy({ data: bytecode, arguments: [candidatesHex] });
  const sendOptions = { from: '0x3E26F44030d0CB71De1e6b16c2E5c13EFb802565', gas: 1500000, gasPrice: web3.utils.toWei('0.00003', 'ether') };
  const instance = await sender.send(sendOptions);
  contract.options.address = instance.options.address;

  // https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#id12
  const beforeVotes = await contract.methods.totalVotesFor(candidatesHex[0]).call();
  console.log({ beforeVotes });

  const receipt = await contract.methods.voteForCandidate(candidatesHex[0]).send(sendOptions);
  console.log({ receipt });

  const afterVotes = await contract.methods.totalVotesFor(candidatesHex[0]).call();
  console.log({ afterVotes });
}

main().catch(e => console.error(e));
