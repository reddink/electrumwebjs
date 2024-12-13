import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalSend from './ModalSend.jsx';
import ModalReceive from './ModalReceive.jsx';

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
      <div className="sendreceivecomponent w-full mx-auto p-4 bg-white rounded-xl shadow-md flex items-center justify-center">
        <div className="flex flex-row md:flex-col">
          <button
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 my-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
              onClick={handleSend}
          >
            Send
          </button>
          <button
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 my-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
              onClick={handleReceive}
          >
            Receive
          </button>
        </div>
        <ModalComponent
            isOpen={isSendModalOpen}
            Model={ModalSend}
            onClose={handleCloseModel}
            onSend={onSend}
        />
        <ModalComponent
            isOpen={isReceiveModalOpen}
            Model={ModalReceive}
            onClose={handleCloseModel}
            onReceive={onReceive}
        />
      </div>
  );
};

SendReceiveComponent.propTypes = {
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
};

export default SendReceiveComponent;
