import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {TextField} from '@mui/material';
import PropTypes from 'prop-types';
import ImportCreateComponent from './ImportCreateComponent.jsx';

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
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-body">
            <h2>Import Reddcoin Seed phrase</h2>
            <p>Create to the Wallet!</p>
            <div className="grid-container">
              <div className="grid-item">
                <TextField fullWidth
                           multiline={true}
                           label="Recovery Seed Phrase"
                           variant="outlined"
                           onChange={handleTextFieldChange}
                           value={textFieldValue}
                />
              </div>
              <div className="grid-item">
                <Button onClick={onClose} variant="contained" color="secondary"
                        className="button">Cancel</Button>
              </div>
              <div className="grid-item">
                <Button onClick={handleImport} variant="contained" color="primary"
                        className="button">Ok</Button>
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
