import * as React from 'react';
import {View} from 'react-native';
import {createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';

import loginform from './components/login';
import registerform from './components/register';
import Tickets from './components/ClientPanel/Tickets';
import Post from './components/ClientPanel/Post';

export default class App extends React.Component <any,any>{
  constructor(props:any){
    super(props);
  }

  render(){
    return(
      <Application />
    );
  }
}



//Creates the navigation menu with all the pages in the application
/*const AppStackNavigator = createSwitchNavigator(
{
  
  Login: {screen:loginform},
  Bar: AppDrawerNavigator,
  Register: {screen: registerform},
  Ticket: {screen: Tickets},
  Post: {screen: Post},  
  
}

);*/

const AppDrawerNavigator = createDrawerNavigator({
  Tickets: {screen: Tickets}
});

const AppSwitchNavigator = createSwitchNavigator({
  Login: {screen:loginform},
  Register: {screen: registerform},
  Ticket: {screen: AppDrawerNavigator},
  Post: {screen: Post},
    
});

const Application = createAppContainer(AppSwitchNavigator);

 


