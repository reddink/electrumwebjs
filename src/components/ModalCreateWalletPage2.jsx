import React, {useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';

const Page2 = ({seed, data, updateData, nextPage, previousPage}) => {
  const [input, setInput] = useState(data);
  const [words, setWords] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState('');

  useEffect(() => {
    // Split the input string by spaces to create an array of words and shuffle it
    setWords(shuffleArray(seed.split(' ')));
  }, [seed]);

  const handleButtonClick = (word) => {
    setTextFieldValue((prevValue) => (prevValue ? `${prevValue} ${word}` : word));
  };

  const handleNext = () => {
    updateData('page2Data', input);
    nextPage();
  };

  const handleBack = () => {
    if (textFieldValue.length === 0) {
      previousPage();
    } else {
      const words = textFieldValue.split(' ');
      if (words.length > 0) {
        setTextFieldValue(words.slice(0, -1).join(' ').trim());
      }
    }
    ;
  };

  // Handle text field change
  const handleTextFieldChange = (e) => {
    setTextFieldValue(
        e.target.value.trim().replace(/[\s\u3000]+/g, ' '),
    );
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random());
  };

  return (
      <div>
        <h2>Verify Seed Phrase</h2>
        <div className="grid-item">
          <TextField
              fullWidth
              multiline
              label={`Verify Seed Phrase`}
              variant="outlined"
              onClick={(e) => e.preventDefault()}
              onChange={handleTextFieldChange}
              value={textFieldValue}
          />
        </div>
        <div className="grid-item">
          <p>Using the buttons below, enter the seed phrase in the correct order</p>
        </div>
        <div className="grid-item">
          {words.map((word, index) => (
              <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClick(word)}
                  disabled={textFieldValue.includes(word)}
              >
                {word}
              </Button>
          ))}
        </div>
        <div className="grid-item">
          <input
              style={{width: '100%'}}
              type="text"
              value={seed}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter data for Page 2"
          />
        </div>
        <div className="grid-item">
          <Button onClick={handleBack}
                  variant="contained"
                  color="primary"
                  className="button">
            Back
          </Button>
          <Button disabled={!compareWords(seed, textFieldValue)}
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  className="button">
            Next
          </Button>
        </div>
      </div>
  );
};

// Utility function to compare words in input and text field
const compareWords = (seed, textFieldValue) => {
  const inputWords = seed.split(' ').filter((x) => x);
  const textFieldWords = textFieldValue.split(' ').filter((x) => x);
  if (inputWords.length !== textFieldWords.length) {
    return false;
  }
  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] !== textFieldWords[i]) {
      return false;
    }
  }
  return true;
};

export default Page2;
