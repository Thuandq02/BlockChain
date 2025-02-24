import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
const TOKEN_ADDRESS = '0xF8aC3482509Cf7a8776f0ae4cDfed4c26FA895e4';


// Component cập nhật Giá Token
function UpdatePrice() {
    const [formData, setFormData] = useState({
      tokenAddress: '',
      price: ''
    });
    const [result, setResult] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();
  const data = { 
    tokenAddress: TOKEN_ADDRESS,
    price: Number(formData.price)
   };

  try {
    const response = await axios.post(`${baseUrl}/set-price`, data);
    setResult(`Price set successfully! Transaction: ${JSON.stringify(response.data.receipt)}`);
  } catch (error) {
    setResult(`Error: ${error.response ? error.response.data.error : error.message}`);
  }
};
  
    return (
      <div className='section'>
        <h2>Cập nhật Giá Token</h2>
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
            <label>Giá:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              className='input'
            />
          </div>
          <button type="submit" className='button'>Cập nhật Giá</button>
        </form>
        <pre className='result'>{result}</pre>
      </div>
    );
  }

  export default UpdatePrice;