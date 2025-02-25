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
        // console.log(response.data);
        settokens(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu token:", error);
      }
    }
    fetchToken();
  }, []);

  return (
    <div>
      <h2>Danh sách Tokens</h2>
      <ul>
        <div class="card-container">
          {Array.isArray(tokens) && tokens.length > 0 ? (
            tokens.map((token) => (
              <div class="card">
                <div class="card-header">
                  <strong>{token.name}</strong> <span>({token.symbol})</span>
                </div>
                <div class="card-body">
                  <p>Tạo bởi: {token.creator}</p>
                  <p>Tổng token: {token.total_token}</p>
                </div>
                <div class="card-footer">
                  <button onclick="handleView()">View</button>
                </div>
              </div>
            ))
          ) : (
            <p>Không có tokens nào.</p> // Hiển thị nếu không có tokens
          )}
        </div>

      </ul>
    </div>
  );
}

export default ListToken;
