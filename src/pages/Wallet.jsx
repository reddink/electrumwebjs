import {useState, useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';
import BalanceComponent from '../components/BalanceComponent.jsx';
import TransactionHistoryComponent from '../components/TransactionHistoryComponent.jsx';
import SendReceiveComponent from '../components/SendReceiveComponent.jsx';

const INITIAL_BALANCE = {confirmed: 0, unconfirmed: 0};

const calculateTotalBalance = (accounts) => {
  return accounts.reduce(
      (accumulator, account) => {
        accumulator.confirmed += account.confirmed;
        accumulator.unconfirmed += account.unconfirmed;
        return accumulator;
      },
      {...INITIAL_BALANCE},
  );
};

const loadTransactions = async (wallet, setTransactions) => {
  try {
    const transactions = await wallet.getTransactions();
    setTransactions(transactions);
  } catch (error) {
    console.error('Failed to fetch transactions', error);
  }
};

const Wallet = () => {
  const {walletStore, createWallet, wallet, monitor} = useElectrum();
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

  const getBalance = () => {
    if (!wallet) return {totalBalance: 0, confirmed: 0, unconfirmed: 0};
    const accounts = wallet.getAccountInfo();
    const {confirmed, unconfirmed} = calculateTotalBalance(accounts);
    return {
      totalBalance: confirmed + unconfirmed,
      confirmed,
      unconfirmed,
    };
  };

  const getTransactions = () => {
    if (!wallet) return [];
    const transactions = wallet.getTransactions();
    return transactions;
  }

  const handleOnSend = (address, amount) => {
    console.log(`handleOnSend: ${address} ${amount}`);
    if (address === '' || amount === '' ) {
      return 'Error'
    }
    const acctIndex = 0;
    const requirePwd = true;
    const password = '';
    if (!wallet) {
      return 'Error'
    }
    wallet.send(amount * 100000000, acctIndex, requirePwd, address, password, monitor );
  };

  const handleOnReceive = (address, amount) => {
    console.log(`handleOnReceive`);
  };

  return (
      <div className="AppBody">
        {walletStore ? (
            <>
              <header>
                <h1>Reddcoin Wallet</h1>
              </header>
              <BalanceComponent data={getBalance()}/>
              <SendReceiveComponent onSend={handleOnSend}
                                    onReceive={handleOnReceive}/>
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
