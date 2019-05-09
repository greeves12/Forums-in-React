import * as React from 'react';
import {Text, StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground} from 'react-native';


export default class loginform extends React.Component <any, any>{
    constructor(props: any){
      super(props);

      this.checkEntries = this.checkEntries.bind(this);
    }

    state = {
      username: "",
      password: ""
    }

    checkEntries() {
      var user = this.state.username;
      var pass = this.state.password;

      if(user == "" || pass == ""){
        return alert("All fields must be filled");
      }

      fetch('http://ipaddress/login.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user,
          password: pass
        })
      })

    }
    
    render() {
  
        return(
          
          <ImageBackground source={require('../assets/background.jpg')} style={styles.imageContainer}> 
            <KeyboardAvoidingView style={styles.container} behavior="padding" >
                <TextInput placeholder="username or email" returnKeyType="next" autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.7)" style={styles.input}/>
                <TextInput placeholder="password" returnKeyType = "go" placeholderTextColor="rgba(0,0,0,0.7)" secureTextEntry={true} autoCorrect={false} style={styles.input}   />
                
                <TouchableOpacity style={styles.buttonContainer} onPress={this.checkEntries}>
                <Text style = {styles.buttonText} onPress={this.checkEntries}>Login</Text>
                </TouchableOpacity>
                
                <Text style={styles.register} onPress={() => this.props.navigation.push('Register')} >Create an account</Text>
            </KeyboardAvoidingView>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
    container: {
      flex: 1,
       marginBottom: 5,
       justifyContent: 'flex-end',

       
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,244,0.7)',
        marginBottom: 20,
        paddingHorizontal: 10,
        opacity: 0.5,
    },
    register: {
      padding: 40,
      textAlign: 'center',
      marginBottom: 10,
      color: '#FFF',
    },
    buttonContainer: {
      backgroundColor: '#b2bec3',
      paddingVertical: 15,
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF'
    },
});
