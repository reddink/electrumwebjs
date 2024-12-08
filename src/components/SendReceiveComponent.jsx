import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import ModalSend from './ModalSend.jsx';
import ModalReceive from './ModalReceive.jsx';

const COIN = 100000000;

const ModalComponent = ({ isOpen, Model, onClose, onSend, onReceive }) => {
  return (
    isOpen && (
      <Model
        onClose={onClose}
        onSend={onSend}
        onReceive={onReceive}
      />
    )
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Model: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func,
  onReceive: PropTypes.func,
}

const SendReceiveComponent = ({ onSend, onReceive }) => {
    const [isSendModalOpen, setSendModalOpen] = useState(false);
    const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
    const [data, setData] = useState({})

  const handleSend = () => {
    console.log("Send");
    setSendModalOpen(true);

  };

  const handleReceive = () => {
    console.log("Receive");
    setReceiveModalOpen(true);

  };

  const handleCloseModel = () => {
    console.log("Close Model");
    setSendModalOpen(false);
    setReceiveModalOpen(false);
  }

  return (
      <Card className="card">
        <CardContent>
          <Grid container spacing={2} className="grid-container">
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={handleSend}
              >
                Send
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="secondary"
                className="button"
                onClick={handleReceive}
              >
                Receive
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <ModalComponent
        isOpen={isSendModalOpen}
        Model={ModalSend}
        onClose={handleCloseModel}
        onSend={onSend}
        onReceive={onReceive}
      />
      <ModalComponent
        isOpen={isReceiveModalOpen}
        Model={ModalReceive}
        onClose={handleCloseModel}
        onReceive={onReceive}
        onSend={onSend}
      />

      </Card>
  );
};

SendReceiveComponent.propTypes = {
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
};

export default SendReceiveComponent;
