import * as React from 'react';
import {Text, StyleSheet, Alert, View, FlatList} from 'react-native';
import {ListItem, Header} from 'react-native-elements'

var theList;

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
      this.setState({data: responseJson})
      
    }).catch((error) =>{
      Alert.alert(error);
    });
    
  }


  render() {
    return(
      
      <FlatList
        
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem 
           title ={item.username}
           
          />
        )}
        keyExtractor={item=>item.title}
      />
    );
  }
}
