import * as React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator,createSwitchNavigator, createAppContainer, createStackNavigator, SafeAreaView, } from 'react-navigation';

import loginform from './components/login';
import registerform from './components/register';
import Tickets from './components/ClientPanel/Tickets';
import Post from './components/ClientPanel/Post';
import Profile from './components/ClientPanel/Profile';
import Settings from './components/ClientPanel/Settings';
import ViewPost from './components/ClientPanel/ViewPost';
import Comments from './components/ClientPanel/Comments';

//Comments will not be displayed within the render/return methods of the components as the compiler thinks that its a text that isn't wrapped in a <Text> component and breaks the code
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

//Creates the bottom navigator for the application
const AppBottomNavigator = createBottomTabNavigator({
  Feed: {screen: Tickets,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => (
            <Icon name='rss' type='font-awesome'/>
        ),
    }
    
  },
  Post: {screen: Post,
    navigationOptions :{
      tabBarIcon: ({tintColor}) => (
        <Icon name='plus' type='font-awesome' />
      ),
    }
  }
});

//Creates the entire page switiching system, alls the application to transfer between pages aswell as allowing data to be passed through without having to constantly export
const AppSwitchNavigator = createSwitchNavigator({
  Login: {screen:loginform},
  Register: {screen: registerform},
  Feeds: {screen:AppBottomNavigator},
  Settings: {screen: Settings},
  Profiles: {screen: Profile},
  Views: {screen: ViewPost},
  Comment: {screen: Comments}
});

//Creates the container for the application
const Application = createAppContainer(AppSwitchNavigator);

 


