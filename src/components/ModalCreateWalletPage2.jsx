import React, {useEffect, useState} from 'react';

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
    };
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
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Verify Seed Phrase</h2>
        <div className="grid-container">
          <div className="flex flex-col">
            <label htmlFor="seedPhrase2" className="text-sm font-medium text-gray-700">
              {`Verify Seed Phrase`}
            </label>
            <textarea
                id="seedPhrase2"
                rows="4"
                value={ textFieldValue }
                readOnly
                onChange={handleTextFieldChange}
                className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">Using the buttons below, enter the seed phrase in
              the correct order</p>
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            {words.map((word, index) => (
                <button
                    key={index}
                    color="primary"
                    onClick={() => handleButtonClick(word)}
                    disabled={textFieldValue.includes(word)}
                    className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300 font-bold py-2 px-2 rounded transition duration-300"
                    style={{width: 'auto'}}
                >
                  {word}
                </button>
            ))}
          </div>
          <div>
            <input
                style={{width: '100%'}}
                type="text"
                value={seed}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter data for Page 2"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={handleBack}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Back
            </button>
            <button disabled={!compareWords(seed, textFieldValue)}
                    onClick={handleNext}
                    className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300 font-bold py-2 px-4 rounded transition duration-300">
              Next
            </button>
          </div>
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
