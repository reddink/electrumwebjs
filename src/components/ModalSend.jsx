import React from 'react';
import {TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';

const COIN = 100000000;
const FEE = 100000;

const ModalSend = ({ data, onClose, onSend }) => {
  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [useAvailableBalance, setUseAvailableBalance] = React.useState(false);
  const [subtractFee, setSubtractFee] = React.useState(false);
  const [alert, setAlert] = React.useState(null); // State for the alert

  const formatAmount = (amount) => {
    // convert amount to satoshi
    return amount * COIN;
  }

  const handleOnAmountChange = (value) => {
    if (formatAmount(value) + FEE <= data.totalBalance) {
      setAlert(null);
    }
    else {
      setAlert({ type: 'error', message: 'Not enough balance.' });
    }
    setAmount(value);
  }

  const handleOnSubtractFeeChange = (event) => {
     console.log(` Subtract fee from avail bal ${event.target.checked}`);
     setSubtractFee(event.target.checked);
  }

  const handleOnAvailableBalanceChange = (event) => {
    console.log(` Use avail bal ${event.target.checked}`);
    setUseAvailableBalance(event.target.checked);
    if (event.target.checked) {
      const calculatedAmount = (data.totalBalance) / COIN;
      setAmount(calculatedAmount > 0 ? calculatedAmount.toFixed(8) : '');
    } else {
      setAmount('');
    }
  }

  const handleOnSend = () => {
    console.log(`onSend: ${recipient}, ${amount}`);
    try {
      // Basic validation
      if (!recipient) {
        throw new Error('Recipient address is required.');
      }
      if (!amount || isNaN(amount) || parseInt(formatAmount(amount)) <= 0) {
        throw new Error('Amount must be a positive number.');
      }
      onSend(recipient, parseInt(formatAmount(amount)));
      setAlert({ type: 'success', message: 'Transaction sent successfully!' });
      setRecipient('');
      setAmount('');
      onClose();
      setTimeout(() => {
        setAlert(null); // Clear alert after 3 seconds
      }, 3000);

    } catch (error) {
      setAlert({ type: 'error', message: error.message }); // Set alert for errors
      console.error("Error in handleOnSend:", error.message);
    }
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all sm:max-w-lg sm:w-full">
      <div className="px-6 py-4">
        <div className="mb-4">
          <Typography variant="h5" component="h1"
                      className="text-xl font-semibold text-gray-800">
            Send Reddcoin (RDD)
          </Typography>
        </div>
        <div className="space-y-4">
          <TextField
              fullWidth
              label="Enter Recipient Reddcoin Address"
              variant="outlined"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
          />
          <TextField
              fullWidth
              label="Amount (RDD)"
              variant="outlined"
              value={amount}
              onChange={(e) => handleOnAmountChange(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="available-bal-checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                value={useAvailableBalance}
                onChange={(e) => handleOnAvailableBalanceChange(e)}
            />
            <label htmlFor="available-bal-checkbox" className="text-sm text-gray-600">
              Use available balance minus fee
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="subtract-fee-checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                value={subtractFee}
                onChange={(e) => handleOnSubtractFeeChange(e)}
            />
            <label htmlFor="subtract-fee-checkbox" className="text-sm text-gray-600">
              Subtract fee from amount.
            </label>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-blue-600">Network Fee: {FEE / COIN}</p>
            <p className="text-blue-600">Available Balance: {data.totalBalance / COIN}</p>
          </div>
        </div>
      </div>

      {/* Alert Section */}
        {alert && (
          <div
            className={`px-4 py-3 text-center ${
              alert.type === 'error'
                ? 'bg-red-100 text-red-800 border-red-400'
                : 'bg-green-100 text-green-800 border-green-400'
            } border rounded mb-4 mx-6`}
          >
            {alert.message}
          </div>
        )}

      <div className="flex justify-end items-center px-6 py-4 border-t border-gray-200">
        <button
            onClick={onClose}
            className="w-32 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleOnSend}
          className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);
};

ModalSend.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default ModalSend;
