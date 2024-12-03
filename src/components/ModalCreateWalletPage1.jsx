import React, {useEffect, useState} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';
import {Checkbox, FormControlLabel, MenuItem, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import LoopIcon from '@mui/icons-material/Loop';

/* Entropy is calculated from word length
* 12: 4
* 15: 5
* 18: 6
* 21: 7
* 24: 8
*/
const words = [
  {value: 128, label: '12 Words'},
  {value: 160, label: '15 Words'},
  {value: 192, label: '18 Words'},
  {value: 224, label: '21 Words'},
  {value: 256, label: '24 Words'},
];

const getSeedMnemonic = async (ent, wallet, setNewSeed) => {
  try {
    const seed = await wallet.getNewSeed(ent).phrase;
    setNewSeed(seed);
  } catch (error) {
    console.error('Failed to fetch seed', error);
  }
};

const Page1 = ({ data, onClose, updateData, nextPage }) => {
  const [input, setInput] = useState(data);
  const [newseed, setNewSeed] = useState(data);
  const [ent, setEnt] = useState(128);
  const {wallet} = useElectrum();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (wallet) {
      getSeedMnemonic(ent, wallet, setNewSeed);
    }
  }, [wallet, ent]);

  const getNewSeed = async () => {
    try {
      const seed = await wallet.getNewSeed(ent).phrase;
      setNewSeed(seed);
    } catch (error) {
      console.error('Failed to fetch seed', error);
    }
  };

  const handleWordLength = (event) => {
    setEnt(event.target.value);
  };

  const handleNext = () => {
    updateData('page1Data', newseed);
    nextPage();
  };

  return (
      <div>
        <h2>Create a new Reddcoin Wallet</h2>
        <p>!! Sensitive Information !!</p>
        <p>Please copy the following seed phrase and keep it in a safe place.</p>
        <div className="grid-container">
          <div className="grid-item dropdown right-aligned">
            <TextField
                select
                fullWidth
                label="Word Length"
                variant="outlined"
                className="dropdown"
                defaultValue={128}
                size="small"
                onChange={handleWordLength}
                value={ent}
            >
              {words.map((option) => (
                  <MenuItem selected={option.value === 256} key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="grid-item">
            <TextField
                fullWidth
                multiline
                label={`${words.find(word => word.value === ent).
                    label.
                    slice(0, -1)} Seed Phrase (${ent} bits)`}
                variant="outlined"
                value={data? data: newseed}
            />
          </div>
          <div className="grid-item regenerate">
            <Button
                onClick={getNewSeed}
                variant="contained"
                color="tertiary"
                className="button"
                startIcon={<LoopIcon/>}
            >
              Regenerate
            </Button>
          </div>
          <div className="grid-item">
            <FormControlLabel
                control={<Checkbox checked={isChecked}
                                   onChange={(e) => setIsChecked(e.target.checked)}/>}
                label="I have safely saved my seed phrase"
            />
          </div>
          <div className="grid-item">
            <Button onClick={onClose} variant="contained" color="secondary"
                    className="button">
              Cancel
            </Button>
          </div>
          <div className="grid-item">
            <Button disabled={!isChecked} onClick={handleNext} variant="contained" color="primary"
                    className="button">
              Next
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Page1;
