import React, {useState, useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';
import BalanceComponent from '../components/BalanceComponent.jsx';
import TransactionHistoryComponent from '../components/TransactionHistoryComponent.jsx';
import SendReceiveComponent from '../components/SendReceiveComponent.jsx';
import ImportCreateComponent from '../components/ImportCreateComponent.jsx';

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
  };

  const handleOnSend = (address, amount) => {
    console.log(`handleOnSend: ${address} ${amount}`);
    if (address === '' || amount === '') {
      return 'Error';
    }
    const acctIndex = 0;
    const requirePwd = true;
    const password = '';
    if (!wallet) {
      return 'Error';
    }
    wallet.send(amount, acctIndex, requirePwd, address, password, monitor);
  };

  const handleOnReceive = (address, amount) => {
    console.log(`handleOnReceive`);
  };

  const handleOnImport = (seed) => {
    console.log(`onImport: ${seed}`);
    createWallet(seed);
  };

  const handleOnCreate = (seed) => {
    console.log(`onCreate: ${seed}`);
    createWallet(seed);
  };

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start pt-16">
        {walletStore ? (
            <>
              <header className="mb-4">
                <h1 className="text-4xl font-bold text-blue-600 text-center">Reddcoin Wallet</h1>
              </header>
              <div>
                <div className="flex flex-col md:flex-row gap-2 max-w-full">
                  <BalanceComponent data={getBalance()}/>
                  <SendReceiveComponent data={getBalance()}
                                        onSend={handleOnSend}
                                        onReceive={handleOnReceive}/>
                </div>
                <div className="max-w-full">
                  <TransactionHistoryComponent data={getTransactions()}/>
                </div>
              </div>
            </>
        ) : (
            <>
              <header className="mb-4">
                <h1 className="text-4xl font-bold text-blue-600 text-center">Manage Wallet</h1>
              </header>
              <ImportCreateComponent onCreate={handleOnCreate} onImport={handleOnImport}/>
            </>
        )}
      </div>
  );
};

export default Wallet;
