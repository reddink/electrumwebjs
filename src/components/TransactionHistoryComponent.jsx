import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined';

const COIN = 100000000;

// Dynamically truncate the address based on window width
const truncateAddress = (address, length) => {
  if (address.length > length) {
    return `${address.slice(0, Math.max(3, length / 2))}...${address.slice(-Math.max(3, length / 2))}`;
  }
  return address;
};

const TransactionHistoryComponent = ( { data } ) => {
  const [truncateLength, setTruncateLength] = useState(getTruncateLength());

  // Helper function: determines the truncate length based on screen size
  function getTruncateLength() {
    if (window.innerWidth < 480) {
      return 12; // Very small screens
    } else if (window.innerWidth < 768) {
      return 18; // Small to medium screens
    } else {
      return 34; // Larger screens
    }
  }

  // Update responsiveness dynamically on window resize
  useEffect(() => {
    // Function to update truncate length on window resize
    const handleResize = () => {
      setTruncateLength(getTruncateLength());
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const convertTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
      <div className="mx-auto max-w-full overflow-x-auto">
        <div className="p-4">
          <h2 className="text-xl font-medium text-black mb-4">
            Transactions: ({data.length})
          </h2>

          {/* Responsive Table */}
          <table className="min-w-full divide-y divide-gray-400">
            <thead>
            <tr>
              {/* Type column */}
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500">
                Type
              </th>
              {/* Combined Time & Address */}
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500">
                Time & Address
              </th>
              {/* Total */}
              <th className="px-2 py-2 text-right text-sm font-medium text-gray-500">
                Total (RDD)
              </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
            {data.map((transaction, index) => (
                <tr key={index}>
                  {/* Type Column */}
                  <td
                      className={`px-2 py-2 text-left font-medium ${
                          transaction.type === 'Sent'
                              ? 'text-red-500'
                              : 'text-green-500'
                      }`}
                  >
                    {transaction.type === 'Sent' ? (
                        <NorthEastOutlinedIcon fontSize="small"/>
                    ) : (
                        <SouthEastOutlinedIcon fontSize="small"/>
                    )}
                  </td>

                  {/* Combined Time & Address */}
                  <td className="px-2 py-2 text-black">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Time */}
                      <span className="text-gray-600 text-sm">
                      {convertTime(transaction.time)}
                    </span>
                      {/* Address: Responsive truncation*/}
                      <span className="truncate text-sm">
                      {truncateAddress(
                          transaction.address, truncateLength )}
                    </span>
                    </div>
                  </td>

                  {/* Total Column */}
                  <td className="px-2 py-2 text-right text-sm text-black">
                    {transaction.total / COIN}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
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
