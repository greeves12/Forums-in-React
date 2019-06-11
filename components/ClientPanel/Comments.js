import * as React from 'react';
import {View, Text, Alert, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class Comments extends React.Component {
  constructor (props) {
    super (props);

    this.createPost = this.createPost.bind(this);
  }

  //User object as always with the username, title and description
  state = {
    username: this.props.navigation.getParam('Username'),
    description: ""
  }
  title = this.props.navigation.getParam('Title');
  description = this.props.navigation.getParam('Description');
  username = this.props.navigation.getParam('Username');
  theId = this.props.navigation.getParam('ID');
  op = this.props.navigation.getParam('OP');

  //Create post function
  createPost() {
    //Variables that will be sent to the server
    var i = this.props.navigation.getParam('ID');
    var user = this.state.username;
    var d = this.state.description;

    if(d == ""){
      return Alert.alert("All fields must be filled");
    }
    //Creates a request to the server
    fetch('http://162.243.174.168/createcomment.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //Sends the id of the thread *IMPORTANT when we are fetching comments*, username, and description
      body: JSON.stringify({
        id: i,
        username: user,
        description: d
      })
    }).then((reponse)=> reponse.json()).then((responseJson) => {
      //TODO Create a navigation statement
      Alert.alert("Comment posted");
    }).catch((error) => {
      Alert.alert(error);
    })
  }

  render() {
    return(
    <View style={styles.Head}>
    
      <Header 
      backgroundColor='#fff'
        leftComponent={<Icon name='arrow-left' type='font-awesome' onPress={() => this.props.navigation.navigate('Views', {Username: this.username, Title: this.title, Description: this.description, ID: this.theId, OP: this.op} )} />}
        centerComponent={<Text style={{marginRight: 80, fontSize: 15, fontFamily: 'Times', fontWeight: 'bold'}}>Comment Reply</Text>}
        rightComponent={<Text style={{color: '#566573', fontFamily: 'Times', fontWeight: 'bold'}} onPress={this.createPost}>POST</Text>}
      />
      <KeyboardAvoidingView style={styles.Container} behavior="padding">
      <TextInput style={styles.Desc} textAlignVertical={'top'} multiline={true} placeholder="Enter Text..." onChangeText={(text) => this.setState({description:text})} value={this.state.description}></TextInput>
     
      </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Head: {
    flex: 1,
    justifyContent: "flex-start",
  },

  Desc: {
    height: 300,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  Container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    
  }, 

});