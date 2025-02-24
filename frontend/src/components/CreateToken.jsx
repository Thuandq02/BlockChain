import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';


const baseUrl = 'http://localhost:3000';
const TOKEN_ADDRESS = '0xF8aC3482509Cf7a8776f0ae4cDfed4c26FA895e4';


// Component tạo Token
function CreateToken() {
    const [formData, setFormData] = useState({
      name: '',
      symbol: '',
      decimals: ''
    });
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = JSON.stringify({
        name: formData.name,
        symbol: formData.symbol,
        decimals: Number(formData.decimals),
        fromAddress: TOKEN_ADDRESS
      });
    
      try {
        const response = await axios.post(`${baseUrl}/create-token`, data);
        setResult(`Price set successfully! Transaction: ${JSON.stringify(response.data.receipt)}`);
      } catch (error) {
        setResult(`Error: ${error.response ? error.response.data.error : error.message}`);
      }
    };
  
    return (
      <div className='section'>
        <h2>Tạo Token</h2>
        <form onSubmit={handleSubmit} className='form'>
          <div className='formGroup'>
            <label>Tên Token:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className='input'
            />
          </div>
          <div className='formGroup'>
            <label>Ký hiệu:</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
              required
              className='input'
            />
          </div>
          <div className='formGroup'>
            <label>Decimals:</label>
            <input
              type="number"
              value={formData.decimals}
              onChange={(e) =>
                setFormData({ ...formData, decimals: e.target.value })
              }
              required
              className='input'
            />
          </div>
          
          <button type="submit" className='button'>Tạo Token</button>
        </form>
        <pre className='result'>{result}</pre>
      </div>
    );
  }

  export default CreateToken;