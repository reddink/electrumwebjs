import React, {useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import { QRCode } from 'react-qrcode-logo';
import logo from '../assets/icon.png';

import {useElectrum} from '../context/ElectrumContext.jsx';


const ModalReceive = ({ onClose, onReceive }) => {
  const {wallet} = useElectrum();
  const [unUsedAddress, setUnUsedAddress] = useState('');

  useEffect(() => {
    if (wallet) {
      getUnusedAddress();
    }
  }, [wallet]);

  const getUnusedAddress = () => {
    try {
      const addresses = wallet.getAddresses();
      const unUsedAddress = addresses.find(function(address) {
        return !address.isUsed;
      })
      setUnUsedAddress(unUsedAddress.address);
    } catch (error) {
      console.error('Failed to fetch seed', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div className="grid-container">
            <div className="send-body">
              <div className="grid-header">
                <Typography variant="h5" component="h1">Receive Reddcoin (RDD)</Typography>
              </div>
              <div className="qr-code">
                <QRCode
                    value={`reddcoin:${unUsedAddress}`}
                    logoImage = {logo}
                    logoWidth = {50}
                    // logoHeight = {100}
                    logoBackgroundColor = "#ffffff"
                    logoBorderRadius = {0}
                    logoBorderColor = "#ffffff"
                    logoBorderWidth = {0}
                    logoMargin = {0}
                    color = "#000000"
                    backgroundColor = "#ffffff"
                />
              </div>
              <div className="center" style={{"fontSize": "small"}}>
                <Typography variant="p" component="p">{unUsedAddress}</Typography>
              </div>
            </div>

          </div>
        </div>
        <div className="modal-footer">
          <div className="grid-container-footer">
            <div>
              <Button onClick={onClose} variant="contained" color="secondary">Close</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalReceive;
