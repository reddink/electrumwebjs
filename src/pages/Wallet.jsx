import {useState, useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';
import TransactionHistoryComponent from '../components/TransactionHistoryComponent.jsx';

const loadTransactions = async (wallet, setTransactions) => {
  try {
    const transactions = await wallet.getTransactions();
    setTransactions(transactions);
  } catch (error) {
    console.error('Failed to fetch transactions', error);
  }
};

const Wallet = () => {
  const {walletStore, wallet} = useElectrum();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (wallet) {
      loadTransactions(wallet, setTransactions);
    }
  }, [wallet]);

  useEffect(() => {
    // Additional useEffect to watch for changes in walletStore
    // No specific action needed, rerender will be triggered automatically
  }, [walletStore]);

  const getTransactions = () => {
    if (!wallet) return [];
    const transactions = wallet.getTransactions();
    return transactions;
  }

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
              <TransactionHistoryComponent data={getTransactions()}/>
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
