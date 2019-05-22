import * as React from 'react';
import {Text, StyleSheet, Alert, View, FlatList} from 'react-native';
import {ListItem, List, Header} from 'react-native-elements'



export default class Tickets extends React.Component{
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
    //var username = this.props.navigation.getParam('Username');

    fetch("http://162.243.174.168/scrobble.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'tate'
      })
    }).then((reponse) => reponse.json()).then((responseJson) => {
      //Create post layout
      /*
      this.setState({
        data: page === 1 ? response.results : [...this.state.data]
      }); */
      Alert.alert(JSON.stringify(responseJson));
    }).catch((error) =>{
      Alert.alert(error);
    });
    
  }


  render() {
    return(
      <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 50}}>
      <Text onPress={this.getAllPosts}>hi</Text>
      </View>
    );
  }
}
