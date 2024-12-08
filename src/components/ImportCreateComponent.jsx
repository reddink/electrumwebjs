import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import ModalImportWallet from './ModalImportWallet.jsx';
import ModalCreateWallet from './ModalCreateWallet.jsx';

const COIN = 100000000;

const ModalComponent = ({isOpen, Modal, onClose, onCreate, onImport}) => {
  return (
      isOpen && (
          <Modal
              content={'Boo'}
              onClose={onClose}
              onCreate={onCreate}
              onImport={onImport}
          />
      )
  );
};

const ImportCreateComponent = ({onCreate, onImport}) => {
  const [isCreateWalletModalOpen, setCreateWalletModalOpen] = useState(false);
  const [isImportWalletModalOpen, setImportWalletModalOpen] = useState(false);

  const handleCreateNewWallet = () => {
    console.log('Create New Wallet');
    setCreateWalletModalOpen(true);

  };

  const handleImportNewWallet = () => {
    console.log('Import');
    setImportWalletModalOpen(true);

  };

  const handleCloseCreateModel = () => {
    console.log('Close Create Model');
    setCreateWalletModalOpen(false);
    setImportWalletModalOpen(false);
  };

  const handleCloseImportModel = () => {
    console.log('Close Import Model');
    setCreateWalletModalOpen(false);
    setImportWalletModalOpen(false);
  };

  const handleOnCreate = (seed) => {
    console.log('Create Wallet', seed);
    onCreate(seed);
    handleCloseCreateModel();
  }

  const handleOnImport = (seed) => {
    console.log('Import Wallet', seed);
    onImport(seed);
    handleCloseImportModel();
  }

  return (
      <Card className="card">
        <CardContent>
          <Grid container spacing={2} direction="column" className="grid-container">
            <Grid>
              <Button
                  variant="contained"
                  color="primary"
                  className="button"
                  fullWidth
                  onClick={handleCreateNewWallet}
              >
                Create a new wallet
              </Button>
            </Grid>
            <Grid>
              <Button
                  variant="contained"
                  color="secondary"
                  className="button"
                  fullWidth
                  onClick={handleImportNewWallet}
              >
                Restore a wallet
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <ModalComponent
            isOpen={isCreateWalletModalOpen}
            Modal={ModalCreateWallet}
            onClose={handleCloseCreateModel}
            onCreate={handleOnCreate}
        />
        <ModalComponent
            isOpen={isImportWalletModalOpen}
            Modal={ModalImportWallet}
            onClose={handleCloseImportModel}
            onImport={handleOnImport}
        />

      </Card>
  );
};

ImportCreateComponent.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default ImportCreateComponent;
