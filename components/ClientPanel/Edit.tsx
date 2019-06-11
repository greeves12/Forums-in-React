import * as React from 'react';
import {Alert, Text, View, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class Edit extends React.Component <any,any>{
  constructor (props: any) {
    super (props);

    this.createPost = this.createPost.bind(this);
  }

  title = this.props.navigation.getParam('Title');
  description = this.props.navigation.getParam('Description');
  username = this.props.navigation.getParam('Username');
  theId = this.props.navigation.getParam('ID');

  //User object as always with the username, title and description
  state = {
    username: this.props.navigation.getParam('Username'),
    description: this.description,
    title: this.title
  }


  //Create post function
  createPost() {
    //Variables that will be sent to the server
    var i = this.props.navigation.getParam('ID');
    var user = this.state.username;
    var d = this.state.description;
    var t = this.state.title;

    if(t == ""){
      return Alert.alert("Title must have a value");
    }

    
    if(this.state.title == ""){
       return Alert.alert("Title must be filled");
    }
    if(this.state.title == this.title){
      return Alert.alert("Nothing to edit");
    }

    //Creates a request to the server
    fetch('http://162.243.174.168/editpost.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //Sends the id of the thread *IMPORTANT when we are fetching comments*, username, and description
      body: JSON.stringify({
        id: i,
        title: t,
        description: d
      })
    }).then((reponse)=> reponse.json()).then((responseJson) => {
      //TODO Create a navigation statement
      Alert.alert("Post Edited");
    }).catch((error) => {
      Alert.alert(error);
    })
  }

  render() {
    return(
    <View style={styles.Head}>
    
      <Header 
      backgroundColor='#fff'
        leftComponent={<Icon name='arrow-left' type='font-awesome' onPress={() => this.props.navigation.navigate('Views', {Username: this.state.username, Title: this.state.title, Description: this.state.description, ID: this.theId, OP: this.props.navigation.getParam('OP')} )} />}
        centerComponent={<Text style={{marginRight: 80, fontSize: 15, fontFamily: 'Times', fontWeight: 'bold'}}>Comment Reply</Text>}
        rightComponent={<Text style={{color: '#566573', fontFamily: 'Times', fontWeight: 'bold'}} onPress={this.createPost}>POST</Text>}
      />
      <KeyboardAvoidingView style={styles.Container} behavior="padding">
    <TextInput style={styles.Input} returnKeyType="next" placeholder="Enter Title..." onChangeText={(text)=> this.setState({title:text})} value={this.state.title}></TextInput>
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
  Input: {
        height: 40,
        color: '#424949',
        fontSize: 20,
        paddingHorizontal: 10,
        opacity: 0.5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        borderColor: '#515A5A',
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