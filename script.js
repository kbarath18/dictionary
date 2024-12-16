async function searchWord() {
    const word = document.getElementById('word').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
  
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';
  
    if (!word) {
      errorDiv.textContent = 'Please enter a word.';
      return;
    }
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
  
      const data = await response.json();
      const wordData = data[0];
      const phonetic = wordData.phonetic || 'Not available';
      const audio = wordData.phonetics.find(p => p.audio)?.audio || '';
      const definition = wordData.meanings[0]?.definitions[0]?.definition || 'Definition not available';
      const partOfSpeech = wordData.meanings[0]?.partOfSpeech || 'Not available';
  
      resultDiv.innerHTML = `
        <p><strong>${word}</strong></p>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        <p><strong>Phonetic:</strong> ${phonetic}</p>
        ${audio ? `<button onclick="playAudio('${audio}')">🔊 Pronounce</button>` : '<p>No pronunciation available</p>'}
      `;
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  }
  
  function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }