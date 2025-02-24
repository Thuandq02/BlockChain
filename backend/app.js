import contract from './contract.js';
import connection from './db.js';
import dotenv from 'dotenv';


dotenv.config();

async function app() {
  console.log(`🎧 Listening for Transfer events on contract: ${CONTRACT_ADDRESS}`);

  contract.events.Transfer({ fromBlock: "latest" })
      .on("data", (event) => {
          console.log(`🔥 New Transfer detected!`);
          console.log(`🔹 From: ${event.returnValues.from}`);
          console.log(`🔹 To: ${event.returnValues.to}`);
          console.log(`🔹 Token ID: ${event.returnValues.tokenId}`);
          console.log("----------------------------");
          const query = 'INSERT INTO tokens (name, symbol, decimals, token_address) VALUES (?, ?, ?, ?)';
          connection.query(query, [name, symbol, decimals, fromAddress], (err, result) => {
          if (err) {
            console.error('Error saving token creation data:', err);
          } else {
            console.log('Token creation data saved:', result);
          }
        });

      })
      .on("error", (error) => {
          console.error("❌ Error:", error);
      });
}

app().catch(console.error);

