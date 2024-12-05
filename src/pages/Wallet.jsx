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
      <div className="AppBody">
        {walletStore ? (
            <>
              <header>
                <h1>Reddcoin Wallet</h1>
              </header>
            </>
        ) : (
            <>
              <header>
                <h1>Manage Wallet</h1>
              </header>
              <p>Create to the Wallet!</p>
            </>
        )}
      </div>
  );
};

export default Wallet;
