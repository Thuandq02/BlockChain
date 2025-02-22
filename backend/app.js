// app.js
const express = require('express');
const contract = require('./contract');
const connection = require('./db');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const web3 = new Web3();

// Cấu hình Middleware để xử lý JSON
app.use(express.json());

// Endpoint để tạo token và lưu thông tin vào MySQL
app.post('/create-token', (req, res) => {
    const { name, symbol, decimals, fromAddress } = req.body;
  
    contract.methods.createToken(name, symbol, decimals).send({ from: fromAddress })
      .then(receipt => {
        res.json({ receipt });
        // Optionally store token creation event in MySQL database
        const query = 'INSERT INTO tokens (name, symbol, decimals, from_address) VALUES (?, ?, ?, ?)';
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
app.get('/balance/:address', (req, res) => {
    const userAddress = req.params.address;
    
    contract.methods.getBalance(userAddress).call()
      .then(balance => {
        res.json({ balance: balance });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  // Route to swap tokens (buy or sell)
  app.post('/swap', (req, res) => {
    const { tokenAddress, amount, isBuy, fromAddress } = req.body;
  
    contract.methods.swap(tokenAddress, amount, isBuy).send({ from: fromAddress })
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
    const { tokenAddress, price, fromAddress } = req.body;
  
    contract.methods.setPrice(tokenAddress, price).send({ from: fromAddress })
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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
