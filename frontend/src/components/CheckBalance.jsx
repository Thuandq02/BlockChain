import React, { useState } from 'react';
import '../App.css';

const baseUrl = 'http://localhost:3000';

// Component kiểm tra Số dư
function CheckBalance() {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${baseUrl}/balance/${address}`)
        .then((res) => res.json())
        .then((data) => setResult('Success: ' + JSON.stringify(data, null, 2)))
        .catch((err) => setResult('Error: ' + err));
    };
  
    return (
      <div className='section'>
        <h2>Kiểm tra Số dư</h2>
        <form onSubmit={handleSubmit} className='form'>
          <div className='formGroup'>
            <label>Địa chỉ ví:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className='input'
            />
          </div>
          <button type="submit" className='button'>Kiểm tra Số dư</button>
        </form>
        <pre className='result'>{result}</pre>
      </div>
    );
  }

  export default CheckBalance;