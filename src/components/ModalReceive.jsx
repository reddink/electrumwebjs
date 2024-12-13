import React, {useEffect, useState} from 'react';
import { Typography} from '@mui/material';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
            className="bg-white rounded-lg shadow-xl overflow-hidden transform sm:max-w-lg sm:w-full transition-all">
          <div className="px-8 py-6">
            <div className="mb-4">
              <Typography variant="h5" component="h1"
                          className="text-xl font-semibold text-gray-800">
                Receive Reddcoin (RDD)
              </Typography>
            </div>
            <div className="flex justify-center mb-4">
              <QRCode
                  value={`reddcoin:${unUsedAddress}`}
                  logoImage={logo}
                  logoWidth={40}
                  logoBackgroundColor="#ffffff"
                  logoBorderRadius="full"
                  logoMargin={10}
                  logoPadding={1}
                  logoPaddingStyle={"circle"}
                  logoOpacity={0.8}
                  color="#000000"
                  backgroundColor="#ffffff"
              />
            </div>
            <div className="text-center text-gray-800">
              <p className="break-all">{unUsedAddress}</p>
            </div>
          </div>
          <div
              className="flex justify-end items-center px-8 py-4 bg-gray-50 border-t border-gray-200">
            <button
                onClick={onClose}
                className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
  );
};

export default ModalReceive;
