import React from 'react';
import {Card, CardContent, Button, Typography, TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';
import './ModalSendReceive.css';
import PropTypes from 'prop-types';

const ModalSend = ({ onClose, onSend }) => {
  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');

  const handleOnSend = () => {
    console.log(`onSend: ${recipient}, ${amount}`);
    onSend(recipient, amount);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div className="grid-container">
            <div className="grid-item grid-header">
              <Typography variant="h5" component="h1">Send Reddcoin (RDD)</Typography>
            </div>
            <div className="grid-item">
              <TextField
                  fullWidth
                  label="Enter Recipient Reddcoin Address"
                  variant="outlined"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="grid-item">
              <TextField
                  fullWidth
                  label="Amount (RDD)"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="grid-container-footer">
            <div className="grid-item">
              <Button onClick={onClose} variant="contained" color="secondary">Cancel</Button>
            </div>
            <div className="grid-item">
              <Button onClick={handleOnSend} variant="contained" color="primary">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalSend.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default ModalSend;
