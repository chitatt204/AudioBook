import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

import {AppProvider} from './src/AppContext';
import AppNavigation from './src/AppNavigation';
import Test from './src/main/stacks/Test';
function App(): React.JSX.Element {
  return (
    <AppProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </SafeAreaView>
    </AppProvider>
  );
}

export default App;
