import React, { useState } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '../services/web3';
import TokenContractABI from '../Abi/TokenContract.json';

const FACTORY_ADDRESS = "0x9d11d69636C8160eb3cffBdBBfcffaB47e7D0049";

function BuySell() {
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
    const factoryContract = new ethers.Contract(FACTORY_ADDRESS, TokenContractABI.abi, signer);

    try {
      if (formData.isBuy === 'true') {
        // const cost = await factoryContract.getBuyCost(coinIndex, amount);
        // const tx = await factoryContract.buyTokens(coinIndex, amount, { value: cost });
        setResult("Giao dịch mua token đang được xử lý...");
        // await tx.wait();
        setResult("Mua token thành công!");
      } else {
        const tx = await factoryContract.sellTokens(coinIndex, amount);
        setResult("Giao dịch bán token đang được xử lý...");
        await tx.wait();
        setResult("Bán token thành công!");
      }
    } catch (error) {
      console.error(error);
      setResult("Có lỗi xảy ra trong giao dịch");
    }
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

export default BuySell;
