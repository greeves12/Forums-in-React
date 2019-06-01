import * as React from 'react';
import {Text, StyleSheet, Alert, View, FlatList} from 'react-native';
import {ListItem, Header, Icon} from 'react-native-elements';
import Drawer from 'react-native-drawer';
import PropTypes from 'prop-types'


import posts from '../ClientPanel/Post';

let users = "";

export default class Tickets extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      //Array for the payload
      data: [],
      page: 1,
      refreshing: false
    }
    this.getAllPosts = this.getAllPosts.bind(this);
  }

  //When the class is initialized this will be the first to run as we need to render the threads
  componentDidMount(){
    this.getAllPosts();
  }

  //Originally the app was supposed to be a support center, however, I changed it to become a forum for more of challenge
  getAllPosts =()=> {
    //Gets the username from the property
    var username = this.props.navigation.getParam('Username');

    //Requests an array of data from the server (Threads)
    fetch("http://162.243.174.168/scrobble.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    }).then((reponse) => reponse.json()).then((responseJson) => {
      //Since the response will be an array, I've created an array in the state object
      this.setState({data: responseJson});
      //
      users = username;
      
    }).catch((error) =>{
      Alert.alert(error);
    });
    
  }

  render() {
    return(
      
      <View style={styles.Head}>
      <Header 
        leftComponent={<Icon name='cog' type='font-awesome' onPress={()=>this.props.navigation.navigate('Settings')}/>}
        rightComponent={<Icon name='user' type='font-awesome' onPress={() => this.props.navigation.navigate('Profiles')} />}
      />
      <FlatList style={styles.Container}
        
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
           title ={item.title}
           subtitle={item.description}
           subtitleNumberOfLines={(item.description.length)/40}
           onPress={() => this.props.navigation.navigate('Views', {Title: item.title, Description: item.description, Username: this.props.navigation.getParam('Username'), ID: item.id})}
          />
        )}
        keyExtractor={item => item.title}
        refreshing={this.state.refreshing}
        onRefresh={this.getAllPosts}
      />
      </View>
    );
  }
}

//Style sheet for the class
const styles = StyleSheet.create({
  Head: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  Container: {
    
  },

  
})

//Exports the user variable, this was needed as a bypass for the navigation property (bottom bar)
export {users}


