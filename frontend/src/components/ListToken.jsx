import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ListToken() {
  const [tokens, settokens] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.get('http://localhost:3000/api/tokens');
        settokens(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu token:", error);
      }
    }
    fetchToken();
  }, []);

  // Hàm gọi khi user bấm nút View
  // const handleView = (meme) => {
  //   // Chuyển đến đường dẫn /buy-sell/:tokenAddress
  //   navigate(`/buy-sell/${meme.tokenAddress}`);
  // };

  return (
    <div>
      <h2>Danh sách Token</h2>
      <ul>
        {tokens.map((token) => (
          <li key={token._id}>
            <strong>{token.name}</strong> ({token.symbol}) - Tạo bởi: {token.creator} - Tổng token: {BigInt(token.totalTokens ?? 0)}
            {/* <button onClick={() => handleView(meme)}>View</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListToken;
