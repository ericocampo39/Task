import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:44329';

const instance = axios.create({
  baseURL: API_BASE_URL
});

const Translator = () => {
  const [englishText, setText] = useState(''); 
  const [translatedText, setTranslatedText] = useState(''); 
  const [loading, setLoading] = useState(false); 


  const handleTranslate = async () => {
    if (!englishText) {
      alert("Please enter both text and target language.");
      return;
    }

    setLoading(true); 
    try {
      const response = await instance.post('/api/Translation', { fromEnglish: englishText });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{textAlign:'center'}}>
      <h1>Hungarian Language Translator</h1>
      <div >
        <input
          type="text"
          value={englishText}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter English text to translate"
          style={{ marginRight: '10px',width:'400px'}}
        />
        <button onClick={handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      {translatedText && (
        <div>
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;