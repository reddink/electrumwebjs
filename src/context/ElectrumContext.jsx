import {createContext, useState, useEffect, useContext, useRef} from 'react';

const electrum = require('electrum-lib');
const {WalletFactory, NetworkMonitor} = electrum;

const ElectrumContext = createContext(null);

export const ElectrumProvider = ({children}) => {
  const [walletStore, setWalletStore] = useState(localStorage.getItem('wallet') || '');
  const [monitor, setMonitor] = useState(null);
  const [wallet, _setWallet] = useState(WalletFactory.standardWallet() || null);

  // Create a ref to the wallet
  const walletRef = useRef(wallet);

  function setWallet(wallet) {
    walletRef.current = wallet; // Updates the ref
    _setWallet(wallet);
  }

  const connectElectrum = (walletStore) => {
    if (walletStore) {
      // const wallet = WalletFactory.standardWallet();
      wallet.fromObject(JSON.parse(walletStore));
      setWallet(wallet);

      const monitor = new NetworkMonitor.start(wallet);
      setMonitor(monitor);

      // Add Wallet event handlers
      monitor.registerListener('idle', handleIdle);
      monitor.registerListener('dataReceived', handleDataRecieved);
      monitor.registerListener('transactionFailed', handleTransactionFailed)

      return monitor;
    }
    return null;
  };

  const handleIdle = () => {
    saveWallet();
    console.log('I am Idle');
  };

  const handleDataRecieved = (data) => {
    console.log('data received', data);
  };

  const handleTransactionFailed = (error) => {
    console.log('Transaction Failed', error);
  }

  useEffect(() => {
    const handleWindowLoad = () => {
      if (walletStore) {
        const monitor = connectElectrum(walletStore);
        return () => {
          if (monitor) monitor.close();
        };
      } else {
        setWallet(WalletFactory.standardWallet());
      }
    };

    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [walletStore, wallet, monitor]);

  const saveWallet = () => {
    console.log(`Saving wallet`);

    if (walletRef.current) {
      localStorage.setItem('wallet', JSON.stringify(walletRef.current.toObject()));
      setWalletStore(JSON.stringify(walletRef.current.toObject()));
    }
  };

  const createWallet = (seed) => {
    console.log(`Creating wallet ${seed}`);
    // const wallet = WalletFactory.standardWallet();
    const pwd = '';
    wallet.buildFromMnemonic(seed, pwd);
    wallet.activateAccount(0, 'Social Funds', 'encrypted', pwd);
    setWallet(wallet);
    setWalletStore(JSON.stringify(wallet.toObject()));
    const monitor = new NetworkMonitor.start(wallet);
    setMonitor(monitor);

    // Add Wallet event handlers
    monitor.registerListener('idle', handleIdle);
    monitor.registerListener('dataReceived', handleDataRecieved);
  }

  const importWallet = (seed) => {
    createWallet(seed);
  };

  return (
      <ElectrumContext.Provider value={{walletStore, wallet, monitor, saveWallet, createWallet, importWallet}}>
        {children}
      </ElectrumContext.Provider>
  );
};

export const useElectrum = () => {
  const value = useContext(ElectrumContext);

  if (!value) {
    throw new Error('useElectrum must be used within a ElectrumProvider');
  }

  return value;

};

