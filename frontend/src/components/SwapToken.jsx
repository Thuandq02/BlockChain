import React, { useState } from 'react';
import '../App.css';


const baseUrl = 'http://localhost:3000';
const TOKEN_ADDRESS = '0xF8aC3482509Cf7a8776f0ae4cDfed4c26FA895e4';

// Component Swap Token
function SwapToken() {
    const [formData, setFormData] = useState({
      tokenAddress: '',
      amount: '',
      isBuy: 'true'
    });
    const [result, setResult] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${baseUrl}/swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenAddress: formData.tokenAddress,
          amount: Number(formData.amount),
          isBuy: formData.isBuy === 'true',
          fromAddress: TOKEN_ADDRESS
        })
      })
        .then((res) => res.json())
        .then((data) => setResult('Success: ' + JSON.stringify(data, null, 2)))
        .catch((err) => setResult('Error: ' + err));
    };
  
    return (
      <div className='section'>
        <h2>Swap Token</h2>
        <form onSubmit={handleSubmit} className='form'>
          <div className='formGroup'>
            <label>Địa chỉ Token:</label>
            <input
              type="text"
              value={formData.tokenAddress}
              onChange={(e) =>
                setFormData({ ...formData, tokenAddress: e.target.value })
              }
              required
              className='input'
            />
          </div>
          <div className='formGroup'>
            <label>Số lượng:</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              className='input'
            />
          </div>
          <div className='formGroup'>
            <label>Hành động:</label>
            <select
              value={formData.isBuy}
              onChange={(e) =>
                setFormData({ ...formData, isBuy: e.target.value })
              }
              required
              className='input'
            >
              <option value="true">Mua</option>
              <option value="false">Bán</option>
            </select>
          </div>
          <button type="submit" className='button'>Thực hiện Swap</button>
        </form>
        <pre className='result'>{result}</pre>
      </div>
    );
  }

  export default SwapToken;