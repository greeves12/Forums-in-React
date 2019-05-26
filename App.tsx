import * as React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator,createSwitchNavigator, createAppContainer, createStackNavigator, SafeAreaView} from 'react-navigation';

import loginform from './components/login';
import registerform from './components/register';
import Tickets from './components/ClientPanel/Tickets';
import Post from './components/ClientPanel/Post';
import Profile from './components/ClientPanel/Profile';
import Settings from './components/ClientPanel/Settings';
import ViewPost from './components/ClientPanel/ViewPost';

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

const AppBottomNavigator = createBottomTabNavigator({
  Feed: {screen: Tickets},
  Post: {screen: Post}
});

const AppSwitchNavigator = createSwitchNavigator({
  Login: {screen:loginform},
  Register: {screen: registerform},
  Feeds: {screen:AppBottomNavigator},
  Settings: {screen: Settings},
  Profiles: {screen: Profile},
  Views: {screen: ViewPost}
});


const Application = createAppContainer(AppSwitchNavigator);

 


