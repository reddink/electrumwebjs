import React, {useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';
import Page1 from './ModalCreateWalletPage1.jsx';
import Page2 from './ModalCreateWalletPage2.jsx';
import Page3 from './ModalCreateWalletPage3.jsx';


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

const saveWallet = async (wallet) => {
  localStorage.setItem('wallet', JSON.stringify(wallet.toObject()));
}
const createNewWallet = async (wallet, seed) => {
  try {
    const pwd = '';
    // const newWallet = wallet.WalletFactory.standardWallet();
    wallet.buildFromMnemonic(seed, pwd);
    await saveWallet(wallet);
  } catch (error) {
    console.error('Failed to create wallet', error);
  }
}

const ModalCreateWallet = ({onCreate,onClose}) => {
  const [newseed, setNewSeed] = React.useState('');
  const [ent, setEnt] = React.useState(128);
  const {wallet} = useElectrum();
  const [isChecked, setIsChecked] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wizardData, setWizardData] = React.useState({
    page1Data: '',
    page2Data: '',
    page3Data: ''
  });

  // Handle navigation
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const previousPage = () => setCurrentPage((prev) => prev - 1);

   // Update state with data from a page
  const updateData = (pageKey, data) => {
    setWizardData((prev) => ({ ...prev, [pageKey]: data }));
  };

  const handleCreate = () => {

    console.log(`create me with ${wizardData.page1Data} `);
    // createNewWallet(wallet, wizardData.page1Data);
    onCreate(wizardData.page1Data);

  };

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 data={wizardData.page1Data} onClose={onClose} updateData={updateData} nextPage={nextPage} />;
      case 2:
        return <Page2 seed={wizardData.page1Data} data={wizardData.page2Data} onClose={onClose} updateData={updateData} nextPage={nextPage} previousPage={previousPage} />;
      case 3:
        return <Page3 previousPage={previousPage} onCreate={handleCreate}/>;
      default:
        return <div>Invalid page</div>;
    }
  };

  // useEffect(() => {
  //   if (wallet) {
  //     getSeedMnemonic(ent, wallet, setNewSeed);
  //   }
  // }, [wallet, ent]);
  //
  // const getNewSeed = async () => {
  //   try {
  //     const seed = await wallet.getNewSeed(ent).phrase;
  //     setNewSeed(seed);
  //   } catch (error) {
  //     console.error('Failed to fetch seed', error);
  //   }
  // };
  //
  // const handleWordLength = (event) => {
  //   setEnt(event.target.value);
  // };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all sm:max-w-lg sm:w-full">
          <div className="p-6">
            <div className="wizard-container">
              {renderPage()}
            </div>
          </div>

        </div>
      </div>
  );
};

export default ModalCreateWallet;
