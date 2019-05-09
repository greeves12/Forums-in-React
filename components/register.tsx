import * as React from 'react';
import {Text, ImageBackground, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';


export default class register extends React.Component<any, any>{
    constructor(props: any){
      super(props);
       this.checkEntries = this.checkEntries.bind(this);
    }
    //User object to hold information (password, email, username)
    state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }


    checkEntries() {
        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword;
        
        //Calls PHP for registration approval
        fetch('http://ipaddress/register.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //Sends PHP the username, email and password
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
          //Gets the response from the JSON depending if the user registered successfully or not
        }).then((Response)=>Response.json)
          .then((responseJson)=>{
            Alert.alert(String(responseJson));
        }).catch((error)=>{
          //Returns an error if it occurs
          Alert.alert(error);
        })
    }
    

    render(){
      return(
        
        <ImageBackground source = {require('../assets/background.jpg')} style = {styles.ImageContainer}>
          <KeyboardAvoidingView style={styles.Container} behavior="padding">
          <TextInput placeholder="Username" returnKeyType="next" autoCorrect = {false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({username:text})} style={styles.Input}/>
          <TextInput placeholder="Email" returnKeyType="next" autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({email:text})} style={styles.Input}/>
          <TextInput placeholder="Password" returnKeyType="next" secureTextEntry={true} autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({password: text})} style={styles.Input}/>
          <TextInput placeholder="Confirm Password" returnKeyType="go" secureTextEntry={true} autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({confirmPassword: text})} style={styles.Input}/>

          <TouchableOpacity style={styles.ButtonContainer} onPress={this.checkEntries}>
          <Text style={styles.ButtonText} onPress={ this.checkEntries}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.Login} >Have an Account? Log in</Text>
          </KeyboardAvoidingView>
        </ImageBackground>
      );
    }
}

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    resizeMode: 'cover'
  },
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  Input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginBottom: 20,
        paddingHorizontal: 10,
        opacity: 0.5,
  },
  ButtonContainer: {
      backgroundColor: '#b2bec3',
      paddingVertical: 15,
  },
  ButtonText:{
      textAlign: 'center',
      color: '#FFFFFF'
  },
  Login: {
      padding: 20,
      textAlign: 'center',
      marginBottom: 10,
      color: '#FFF',
  }
});