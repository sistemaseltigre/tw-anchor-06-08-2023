//6bSPVDS4wXx3zG1WA7Z5hrBYHj5z68VpNcjfhne3CTzQ
const COUNTER = '6bSPVDS4wXx3zG1WA7Z5hrBYHj5z68VpNcjfhne3CTzQ'; //Replace with your public key
console.log(pg.wallet.publicKey.toString(), "Count ++:");

//1. Fetch latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash('finalized');

//2. Call say_hello and send the transaction to the network
const counter = new anchor.web3.PublicKey(COUNTER);
 const tx = await pg.program.methods
  .incrementCount()
  .accounts({counter})
  .rpc();

//3. Confirm the transaction and log the tx URL
await pg.connection.confirmTransaction({
  signature: tx,         
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
}); 
console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);  

//4. Query the chain for our data account and log its value
const data = await pg.program.account.counter.fetch(counter);
console.log('greeted', data.count.toNumber(),' times');