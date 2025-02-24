import Contract from './contract.js';
import connection from './db.js';
import Dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

Dotenv.config();

const app = express();

// Cấu hình Middleware để xử lý JSON
app.use(express.json());

// Endpoint để tạo token và lưu thông tin vào MySQL
app.post('/create-token', (req, res) => {
    const { name, symbol, decimals, fromAddress} = req.body;
  
    Contract.methods.createToken(name, symbol, decimals).call()
      .then(receipt => {
        console.log(name);
        res.json({ receipt });
        // Optionally store token creation event in MySQL database
        const query = 'INSERT INTO tokens (name, symbol, decimals, token_address) VALUES (?, ?, ?, ?)';
        connection.query(query, [name, symbol, decimals, fromAddress], (err, result) => {
          if (err) {
            console.error('Error saving token creation data:', err);
          } else {
            console.log('Token creation data saved:', result);
          }
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
});

// Endpoint để tạo token và lưu thông tin vào MySQL
// app.get('/balance/:address', (req, res) => {
//   console.log(userAddress)

//     const userAddress = req.params.address;
    
//     Contract.methods.getBalance(userAddress).call()
//       .then(balance => {
//         res.json({ balance: balance });
//       })
//       .catch(err => {
//         res.status(500).json({ error: err.message });
//       });
//   });
  
  // Route to swap tokens (buy or sell)
  app.post('/swap', (req, res) => {
    const { tokenAddress, amount, isBuy, fromAddress } = req.body;
  
    Contract.methods.swap(tokenAddress, amount, isBuy).send({ from: fromAddress })
      .then(receipt => {
        res.json({ receipt });
        // Store swap data in MySQL database
        const query = 'INSERT INTO swaps (token_address, amount, is_buy, from_address) VALUES (?, ?, ?, ?)';
        connection.query(query, [tokenAddress, amount, isBuy, fromAddress], (err, result) => {
          if (err) {
            console.error('Error saving swap data:', err);
          } else {
            console.log('Swap data saved:', result);
          }
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  // Route to update token price
  app.post('/set-price', (req, res) => {
    const { tokenAddress, price } = req.body;
  
    Contract.methods.setPrice(tokenAddress, price).call()
      .then(receipt => {
        res.json({ receipt });
        // Store price data in MySQL database
        const query = 'UPDATE tokens SET price = ? WHERE token_address = ?';
        connection.query(query, [price, tokenAddress], (err, result) => {
          if (err) {
            console.error('Error updating price data:', err);
          } else {
            console.log('Price data updated:', result);
          }
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  // Start server
  const port = process.env.PORT || 3000;
  app.use(cors({
    origin: 'http://localhost:5173'  // Cho phép yêu cầu từ frontend React
  }));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
