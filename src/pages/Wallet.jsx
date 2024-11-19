import {useState, useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';

const Wallet = () => {
  const {walletStore, wallet} = useElectrum();

  useEffect(() => {
    // Additional useEffect to watch for changes in walletStore
    // No specific action needed, rerender will be triggered automatically
  }, [walletStore]);

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
        {walletStore ? (
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
