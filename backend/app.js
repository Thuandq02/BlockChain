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


    contract.events.TokenCreated({fromBlock: "latest"})
        .on("data", (event) => {
            console.log(`🔥 New Transfer detected!`);
            console.log(`🔹 From: ${event.returnValues.from}`);
            console.log(`🔹 To: ${event.returnValues.to}`);
            console.log(`🔹 Token ID: ${event.returnValues.tokenId}`);
            console.log("----------------------------");
            console.log("save to db");

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
                res.status(500).json({error: 'Server error '});
            } else {
                res.json(results);
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error '});
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

