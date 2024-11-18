// import React, {createContext, useState, useContext} from 'react';
//
// const WalletContext = createContext();
//
// // export default WalletContext;
//
// export const WalletProvider = ({children}) => {
//   const [wallet, setWallet] = useState(null);
//
//   const handleWallet = (wallet) => setWallet({ wallet});
//   const unloadWallet = () => setWallet(null);
//
//   return (
//     <WalletContext.Provider value={{ wallet, handleWallet, unloadWallet }}>
//       {children}
//     </WalletContext.Provider>
//   );
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useWallet = () => useContext(WalletContext);

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
