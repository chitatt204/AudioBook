import React, {useState, useContext, createContext} from 'react';

// tạo context
export const AppContext = createContext();
// tạo dữ liệu dùng chung cho app
export const AppProvider = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  // thông tin người dùng
  const [user, setUser] = useState([]);
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userEmail,
        setUserEmail,
        user,
        setUser,
        savedBooks,
        setSavedBooks,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
