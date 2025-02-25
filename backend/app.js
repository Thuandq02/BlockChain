import contract from './contract.js';
import connection from './db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


dotenv.config();

async function main() {
  console.log(`🎧 Listening for events on contract: ${process.env.CONTRACT_ADDRESS}`);
  contract.on("TokenCreated", async (creator, tokenAddress, name, symbol, event) => {
    console.log(`🔔 New Event Detected!`);
    console.log(`📌 creator: ${creator}`);
    console.log(`📝 tokenAddress: ${tokenAddress}`);
    console.log(`👤 name: ${name}`);
    console.log(`🔗 symbol : ${symbol}`);
    console.log("-----------------------------------");
  });
  // contract.events.TokenCreated({ fromBlock: "latest" })
  //     .on("data", (event) => {
  //         console.log(`🔥 New Token detected!`);
  //         console.log(`🔹 Owner: ${event.returnValues.creator}`);
  //         console.log(`🔹 tokenAddress: ${event.returnValues.tokenAddress}`);
  //         console.log(`🔹 name ID: ${event.returnValues.name}`);
  //         console.log(`🔹 name ID: ${event.returnValues.symbol}`);
  //         console.log("----------------------------");
  //         // const query = 'INSERT INTO tokens (name, symbol, decimals, token_address) VALUES (?, ?, ?, ?)';
  //         // connection.query(query, [name, symbol, decimals, fromAddress], (err, result) => {
  //         // if (err) {
  //         //   console.error('Error saving token creation data:', err);
  //         // } else {
  //         //   console.log('Token creation data saved:', result);
  //         // }
  //         // });

  //     })
  //     .on("error", (error) => {
  //         console.error("❌ Error:", error);
  //     });
}
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const coins = await MemeCoin.find().sort({ createdAt: -1 });
    res.json(coins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tokens', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

main().catch(console.error);

