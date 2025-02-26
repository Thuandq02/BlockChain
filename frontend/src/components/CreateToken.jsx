import React, { useState } from 'react';
import '../App.css';
import { ethers } from 'ethers';
import { connectWallet } from '../services/web3';
import TokenContractABI from '../Abi/TokenContract.json';

const TOKEN_ADDRESS = '0x9d11d69636C8160eb3cffBdBBfcffaB47e7D0049';


// Component tạo Token
function CreateToken() {
  const [formData, setFormData] = useState({
    name: '',
    symbol: ''
  });
  const [result, setResult] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = await connectWallet();
    if (!provider) return;

    const signer = await provider.getSigner();
    const factoryContract = new ethers.Contract(TOKEN_ADDRESS, TokenContractABI.abi, signer);

    try {
      console.log(formData);
      // const fee = await factoryContract.creationFee();
      const tx = await factoryContract.created(formData.name, formData.symbol);
      setResult("Giao dịch đang được xác nhận...");
      await tx.wait();
      setResult("Token đã được tạo thành công!");
    } catch (error) {
      console.error(error);
      setResult("Có lỗi xảy ra khi tạo Token: " + error);
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
        <button type="submit" className='button'>Tạo Token</button>
      </form>
      <pre className='result'>{result}</pre>
    </div>
  );
}

export default CreateToken;