import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';


const InputPopup = ({ onAccept, modeInput, getNewSeed, handleInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const mode = modeInput;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAccept = () => {
    onAccept(inputValue);
  };

  const refreshSeed = () => {
    setInputValue(getNewSeed());
  }

  return (
      <div>
        {mode ? (
            <>
              <h2>Creating</h2>
              <div>
                <div>
                  {
                    inputValue ? (
                        <p>{inputValue}</p>
                    ) : (
                        <p>{refreshSeed()}</p>
                    )
                  }
                </div>
                <Button variant="outlined" startIcon={<AutorenewIcon/>}
                        onClick={refreshSeed}>
                  Refresh
                </Button>
                <Button variant="outlined" startIcon={<CheckCircleOutlineIcon/>}
                        onClick={handleAccept}>
                  Create
                </Button>
              </div>
            </>

        ) : (
            <>
              <h2>Restoring</h2>
              <div>
                <input type="text" value={inputValue} onChange={handleChange}/>
                <button onClick={handleAccept}>Accept</button>
              </div>
            </>
        )}
      </div>
  );
};

InputPopup.propTypes = {
  onAccept: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  modeInput: PropTypes.bool.isRequired,
  getNewSeed: PropTypes.func.isRequired,
};

export default InputPopup;
