// 1 - Generate a new Keypair for the Counter Account
const counter = anchor.web3.Keypair.generate();
console.log('creating counter: ', counter.publicKey.toString());

// 2 - Fetch latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash('finalized');

// 3 - Call initialize_counter and send the transaction to the network
const tx = await pg.program.methods
  .initializeCounter()
  // 3a - Pass the counter public key into our accounts context
  .accounts({counter: counter.publicKey})
  // 3b - Append the counter keypair's signature to transfer authority to our program
  .signers([counter])
  .rpc();

// 4 - Confirm the transaction
await pg.connection.confirmTransaction({
  signature: tx,         
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
});
console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`); 
