import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Home from './tabs/Home';
import Library from './tabs/Library';
import Search from './tabs/Search';

const tabScreenOptions = ({route}) => {
  return {
    headerShown: false,
    tabBarIcon: ({focused}) => {
      if (route.name == 'Home') {
        if (focused) {
          return (
            <Image source={require('../../assets/img/home_selected.png')} />
          );
        }
        return <Image source={require('../../assets/img/home.png')} />;
      } else if (route.name == 'Search') {
        if (focused) {
          return (
            <Image source={require('../../assets/img/search_selected.png')} />
          );
        }
        return <Image source={require('../../assets/img/search.png')} />;
      } else if (route.name == 'Library') {
        if (focused) {
          return (
            <Image source={require('../../assets/img/library_selected.png')} />
          );
        }
        return <Image source={require('../../assets/img/library.png')} />;
      }
    },
    tabBarLabel: ({focused}) => {
      if (route.name == 'Home') {
        if (focused) {
          return <Text style={{color: '#4838D1'}}>Home</Text>;
        }
        return <Text style={{color: '#6A6A8B'}}>Home</Text>;
      } else if (route.name == 'Search') {
        if (focused) {
          return <Text style={{color: '#4838D1'}}>Search</Text>;
        }
        return <Text style={{color: '#6A6A8B'}}>Search</Text>;
      } else if (route.name == 'Library') {
        if (focused) {
          return <Text style={{color: '#4838D1'}}>Library</Text>;
        }
        return <Text style={{color: '#6A6A8B'}}>Library</Text>;
      }
    },
  };
};
const MainTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './stacks/Detail';
import Personalization from './stacks/Personalization';
import Welcome from './stacks/Welcome';
import Finish from './stacks/Finish';
import Splash from './stacks/Splash';
import Setting from './stacks/Setting';
import SectionMore from './stacks/SectionMore';
import ShowListChapter from './stacks/ShowListChapter';
import AllGenre from './stacks/AllGenre';
import BooksOfGenre from './stacks/BooksOfGenre';
import Profile from './stacks/Profile';
import { AppContext } from '../AppContext';
const Stack = createNativeStackNavigator();

// stacks
const MainNavigation = () => {
  const {user}=useContext(AppContext);
  const initRoute = user?.theFirst ? "Welcome":"Splash"
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initRoute}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="SelectTopics" component={Personalization} />
      <Stack.Screen name="Finish" component={Finish} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SectionMore" component={SectionMore} />
      <Stack.Screen name="ListChapter" component={ShowListChapter} />
      <Stack.Screen name="ListGenre" component={AllGenre} />
      <Stack.Screen name="BookOfGenre" component={BooksOfGenre} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  tabItem: {
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#221F1F',
  },
});
