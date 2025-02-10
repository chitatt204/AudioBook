import React, {useContext} from 'react';
import MainNavigation from './main/MainNavigation';
import AuthenNav from './authen/AuthenNav';
import {AppContext} from './AppContext';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const AppNavigation = () => {
  const {isLogin} = useContext(AppContext);
  console.log(isLogin);
  return (
    <NavigationContainer>
      {isLogin ? <MainNavigation /> : <AuthenNav />}
    </NavigationContainer>
  );
};

export default AppNavigation;
