import React, {useEffect, useState} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';

/* Entropy is calculated from word length
* 12: 4
* 15: 5
* 18: 6
* 21: 7
* 24: 8
*/
const words = [
  {value: 128, label: '12 Words'},
  {value: 160, label: '15 Words'},
  {value: 192, label: '18 Words'},
  {value: 224, label: '21 Words'},
  {value: 256, label: '24 Words'},
];

const getSeedMnemonic = async (ent, wallet, setNewSeed) => {
  try {
    const seed = await wallet.getNewSeed(ent).phrase;
    setNewSeed(seed);
  } catch (error) {
    console.error('Failed to fetch seed', error);
  }
};

const Page1 = ({ data, onClose, updateData, nextPage }) => {
  const [input, setInput] = useState(data);
  const [newseed, setNewSeed] = useState(data);
  const [ent, setEnt] = useState(128);
  const {wallet} = useElectrum();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (wallet) {
      getSeedMnemonic(ent, wallet, setNewSeed);
    }
  }, [wallet, ent]);

  const getNewSeed = async () => {
    try {
      const seed = await wallet.getNewSeed(ent).phrase;
      setNewSeed(seed);
    } catch (error) {
      console.error('Failed to fetch seed', error);
    }
  };

  const handleWordLength = (event) => {
    setEnt(Number(event.target.value));
  };

  const generateLabelText = (bits) => {
    const wordObject = words.find(word => word.value === bits);
    return `${wordObject ? wordObject.label.slice(0, -1) : ''} Seed Phrase (${bits} bits)`;
  };

  const handleNext = () => {
    updateData('page1Data', newseed);
    nextPage();
  };

  return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-lg text-center font-semibold text-gray-900">Create a new Reddcoin Wallet</h2>
        <p className="text-center text-gray-600">!! Sensitive Information !!</p>
        <p className="text-sm text-gray-600"> Please copy the following
          seed phrase and keep it in a safe place.</p>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="seedPhrase" className="text-sm font-medium text-gray-700">
              {generateLabelText(ent)}
            </label>
            <textarea
                id="seedPhrase"
                rows="4"
                value={data ? data : newseed}
                readOnly
                className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex space-x-4">
            <button
                onClick={getNewSeed}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 hover:shadow-lg"
            >
              Regenerate
            </button>
            <div className="flex-1">
              <label htmlFor="wordLength" className="sr-only">
                Word Length
              </label>
              <select
                  id="wordLength"
                  className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleWordLength}
                  value={ent}
              >
                {words.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                id="confirmation"
            />
            <label htmlFor="confirmation" className="text-sm text-gray-700">
              I have safely saved my seed phrase
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Cancel
            </button>
            <button disabled={!isChecked} onClick={handleNext}
                    className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300 font-bold py-2 px-4 rounded transition duration-300">
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default Page1;
