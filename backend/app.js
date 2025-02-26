import contract from './contract.js';
import connection from './db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


dotenv.config();

async function main() {
  console.log(`🎧 Listening for events on contract: ${process.env.CONTRACT_ADDRESS}`);
  contract.events.allEvents()
  .on('data', (event) => {
    console.log("📢 Event detected:", event);
  })
  .on('error', (error) => {
    console.error("❌ Error:", error);
  });

  
  contract.on("TokenCreated", async (creator, tokenAddress, name, symbol, event) => {
    console.log(`🔔 New Event Detected!`);
    console.log(`📌 creator: ${creator}`);
    console.log(`📝 tokenAddress: ${tokenAddress}`);
    console.log(`👤 name: ${name}`);
    console.log(`🔗 symbol : ${symbol}`);
    console.log("-----------------------------------");
  });
}
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM tokens';
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error ' });
      } else {
        res.json(results);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error ' });
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

