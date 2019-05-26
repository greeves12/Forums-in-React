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
      data: [],
      page: 1
    }
  
  }

  componentDidMount(){
    this.getAllPosts();
    
  }

  getAllPosts(){
    //Doesn't get username from the params.
    var username = this.props.navigation.getParam('Username');

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
      //Create post layout
      this.setState({data: responseJson})
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
           subtitle={item.username}
           onPress={() => this.props.navigation.navigate('Views', {Title: item.title, Description: item.description, Username: this.props.navigation.getParam('Username')})}
          />
        )}
        keyExtractor={item => item.title}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Head: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  Container: {
    
  }
  
})

export {users}


