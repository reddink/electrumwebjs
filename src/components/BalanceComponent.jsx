import React from 'react';
import PropTypes from 'prop-types';

const COIN = 100000000;

const BalanceComponent = ({data}) => {
  return (
      <div className="balancecomponent w-full max-w-none mx-auto p-4 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mt-0">
            <h2 className="text-xl font-medium text-black">Balance</h2>
            <div className="flex flex-col sm:flex-row mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-gray-600">
                <strong>Total:</strong> {data.totalBalance / COIN} RDD
              </div>
              <div className="text-gray-600">
                <strong>Confirmed:</strong> {data.confirmed / COIN} RDD
              </div>
              <div className="text-gray-600">
                <strong>Unconfirmed:</strong> {data.unconfirmed / COIN} RDD
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

BalanceComponent.propTypes = {
  data: PropTypes.shape({
    totalBalance: PropTypes.number.isRequired,
    confirmed: PropTypes.number.isRequired,
    unconfirmed: PropTypes.number.isRequired,
  }).isRequired,
};

export default BalanceComponent;
