import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ModalImportWallet = ({ onClose, onImport }) => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSend = () => {
    console.log("Send");
    onSend("ONSEND");
    setSendModalOpen(true);

  };

  const handleReceive = () => {
    console.log("Receive");
    onReceive("ONRECEIVE");
    setReceiveModalOpen(true);

  };

  const handleCloseModel = () => {
    console.log("Close Model");
    setSendModalOpen(false);
    setReceiveModalOpen(false);
  }

  // Handle text field change
  const handleTextFieldChange = (e) => {
    setTextFieldValue(
        e.target.value.trim().replace(/[\s\u3000]+/g, ' '),
    );
  };

  const handleImport = () => {
    onImport(textFieldValue);
  }

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">Import Reddcoin Seed phrase</h2>
            <p className="text-sm text-gray-600">Paste your seed phrase to restore wallet.</p>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="seedPhrase" className="text-sm font-medium text-gray-700">
                  Recovery Seed Phrase
                </label>
                <textarea
                    id="seedPhrase"
                    rows="4"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex space-x-4">
                <button onClick={onClose}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 hover:shadow-lg">
                  Cancel
                </button>
                <button onClick={handleImport}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 hover:shadow-lg">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

ModalImportWallet.propTypes = {
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default ModalImportWallet;
