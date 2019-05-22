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

    //The function that runs when the user clicks enter
    checkEntries() {
        var user = this.state.username;
        var em = this.state.email;
        var pas = this.state.password;
        var confirmPassword = this.state.confirmPassword;
        //Makes sure that all fields have been filled.
        if(user == "" || pas == ""){
          return Alert.alert("All fields must be filled");
        }
        //Checks if the passwords match.
        if(pas != confirmPassword){
          return Alert.alert("Passwords don't match");
        }
        
        //Calls PHP for registration approval
        fetch('http://162.243.174.168/register.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          //Sends PHP the username, email and password
          body: JSON.stringify({
            username: user,
            email: em,
            password: pas
          })
          //Gets the response from the JSON depending if the user registered successfully or not
        }).then((response)=>response.json())
          .then((responseJson)=>{
            Alert.alert(String(responseJson));
        }).catch((error)=>{
          //Returns an error if it occurs
          Alert.alert(error);
        })
    }
    

    render(){
      return(
        
        <ImageBackground source = {require('../assets/react.png')} style = {styles.ImageContainer}>
          <KeyboardAvoidingView style={styles.Container} behavior="padding">
          <TextInput placeholder="Username" returnKeyType="next" autoCapitalize='none' autoCorrect = {false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({username:text})} style={styles.Input}/>
          <TextInput placeholder="Email" returnKeyType="next" autoCapitalize='none' autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({email:text})} style={styles.Input}/>
          <TextInput placeholder="Password" returnKeyType="next" autoCapitalize='none' secureTextEntry={true} autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({password: text})} style={styles.Input}/>
          <TextInput placeholder="Confirm Password" returnKeyType="go" autoCapitalize='none' secureTextEntry={true} autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.8)" onChangeText={(text) => this.setState({confirmPassword: text})} style={styles.Input}/>

          <TouchableOpacity style={styles.ButtonContainer} onPress={this.checkEntries}>
          <Text style={styles.ButtonText} onPress={ this.checkEntries}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.Login} onPress={()=> this.props.navigation.navigate('Login')}>Have an Account? Log in</Text>
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