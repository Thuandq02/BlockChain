import contract from './contract.js';
import connection from './db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


dotenv.config();

async function main() {
  console.log(`🎧 Listening for events on contract: ${process.env.CONTRACT_ADDRESS}`);
  // contract.events.allEvents()
  // .on('data', (event) => {
  //   console.log("📢 Event detected:", event);
  // })
  // .on('error', (error) => {
  //   console.error("❌ Error:", error);
  // });

  contract.events.TokenCreated({ fromBlock: "latest" })
    .on("data", (event) => {
      console.log(`🔥 New Token Created!`);
      console.log("----------------------------");
      const query = 'INSERT INTO tokens (creator, token_address, name, symbol, total_token) VALUES (?, ?, ?, ?, ?)';
      connection.query(query,
        [event.returnValues.creator, event.returnValues.tokenAddress, event.returnValues.name, event.returnValues.symbol, 0],
        (err, result) => {
          if (err) {
            console.error('Error saving token creation data:', err);
          } else {
            console.log('Token creation data saved success:', result);
          }
        });

    })
    .on("error", (error) => {
      console.error("❌ Error:", error);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

main().catch(console.error);

