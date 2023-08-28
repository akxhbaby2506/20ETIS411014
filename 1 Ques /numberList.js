import React, { useState } from 'react';
import axios from 'axios';

function NumberList() {
  const [numbers, setNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  
  const handleFetchNumbers = async () => {
    const urls = inputUrls.split(',').map(url => url.trim());
    try {
      const response = await axios.get('/numbers', { params: { url: urls } });
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter URLs separated by commas"
          value={inputUrls}
          onChange={(e) => setInputUrls(e.target.value)}
        />
        <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      </div>
      <div>
        <h2>Merged Numbers</h2>
        <ul>
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NumberList;
