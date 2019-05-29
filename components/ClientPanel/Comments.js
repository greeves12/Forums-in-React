import * as React from 'react';
import {View, Text, Alert, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';



export default class Comments extends React.Component {
  constructor (props) {
    super (props);

    this.createPost = this.createPost.bind(this);
  }

  state = {
    username: this.props.navigation.getParam('Username'),
    title: "",
    description: ""
  }

  createPost() {
    var i = this.props.navigation.getParam('ID');
    var user = this.state.username;
    var t = this.state.title;
    var d = this.state.description;

    fetch('http://162.243.174.168/createcomment.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: i,
        username: user,
        title: t,
        description: d
      })
    }).then((reponse)=> reponse.json()).then((responseJson) => {
      Alert.alert("Works");
    }).catch((error) => {
      Alert.alert(error);
    })
  }

  render() {
    return(
    <View style={styles.Head}>
    
      <Header 
      backgroundColor='#fff'
        centerComponent={<Text style={{marginRight: 80, fontSize: 15, fontFamily: 'Times', fontWeight: 'bold'}}>Comment Reply</Text>}
        rightComponent={<Text style={{color: '#566573', fontFamily: 'Times', fontWeight: 'bold'}} onPress={this.createPost}>POST</Text>}
      />
      <KeyboardAvoidingView style={styles.Container} behavior="padding">
      
      <TextInput style={styles.Input} returnKeyType="next" placeholder="Enter Title..." onChangeText={(text)=> this.setState({title:text})} value={this.state.title}></TextInput>
      <TextInput style={styles.Desc} textAlignVertical={'top'} multiline={true} placeholder="Enter Description..." onChangeText={(text) => this.setState({description:text})} value={this.state.description}></TextInput>
     
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