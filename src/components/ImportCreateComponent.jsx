import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalImportWallet from './ModalImportWallet.jsx';
import ModalCreateWallet from './ModalCreateWallet.jsx';

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
      <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  onClick={handleCreateNewWallet}
              >
                Create a new wallet
              </button>
              <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  onClick={handleImportNewWallet}
              >
                Restore a wallet
              </button>
            </div>
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
      </div>
  );
};

ImportCreateComponent.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default ImportCreateComponent;
