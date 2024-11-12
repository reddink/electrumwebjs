import {useState, useEffect} from 'react';

const Wallet = () => {

  const handleRestoreButtonClick = () => {
    setIsOpen(true);
    setCreating(false);
  };

  const handleRestoreAccept = (value) => {
    console.log(`handleRestoreAccept be: ${value}`)
    inputValue = value;
    setIsOpen(false);
    // taskInput = value;
    configureElectrum(value);
  };

  return (
      <div>
        {keyValueExists ? (
            <>
              <h1>Reddcoin Wallet</h1>
            </>
        ) : (
            <>
              <h1>Create or Import Wallet</h1>
              <p>Create to the Wallet!</p>
            </>
        )}
      </div>
  );
};

export default Wallet;
