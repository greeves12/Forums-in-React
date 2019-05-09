import * as React from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import login from './components/login';
import register from './components/register';




const AppStackNavigator = createStackNavigator(
{
  Login: {screen:login},
  Register: {screen: register},

  
},
{
  defaultNavigationOptions:{
    header: null
  }
}
);
export default createAppContainer(AppStackNavigator);

