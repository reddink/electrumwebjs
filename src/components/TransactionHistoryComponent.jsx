import React from 'react';
import PropTypes from 'prop-types';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const COIN = 100000000;

const TransactionHistoryComponent = ( { data } ) => {

  const convertTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
      <div>
        <Card className="card">
          <CardContent>
            <h2>Transactions: ({data.length})</h2>
            <table>
              <thead>
              <tr>
                <th>Time</th>
                <th className="center">Type</th>
                <th>Address</th>
                <th className="right">Total (RDD)</th>
              </tr>
              </thead>
              <tbody>
                {data.map((transaction, index) => (
                    <tr key={index}>
                      <td>{convertTime(transaction.time)}</td>
                      <td className="center">
                        {transaction.type === "Sent" ? (
                            <NorthEastOutlinedIcon />
                        ) : (
                            <SouthEastOutlinedIcon />
                        )}
                      </td>
                      <td>{transaction.address}</td>
                      <td className="right">{transaction.total / COIN}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
  );
};

TransactionHistoryComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionHistoryComponent;
