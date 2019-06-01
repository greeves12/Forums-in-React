import * as React from 'react';
import {Text, StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert, AsyncStorage} from 'react-native';

//Login class
export default class loginform extends React.Component <any, any>{
    constructor(props: any){
      super(props);

      this.checkEntries = this.checkEntries.bind(this);
      this.saveuserID = this.saveuserID.bind(this);
      this.startPreLogIn = this.startPreLogIn.bind(this);
    }
    //user state object, holds the username and password values
    state = {
      username: "",
      password: "",
    }

    //As soon as the class is initalized we check if there is already a username and password present in the storage, if so than we log them in.
    componentDidMount =() =>{
      AsyncStorage.getItem('userID').then((value) => this.setState({username: value}));
      AsyncStorage.getItem('password').then((value) => this.setState({password: value}));
      this.startPreLogIn()
    }

    //Save the username and password to the storage (only if the username/password match from the php request)
     saveuserID = () => {
      AsyncStorage.setItem('userID', this.state.username);
      AsyncStorage.setItem('password', this.state.password);
    }
    //Starts the pre-login (also known as auto login which will automatically log the user in if they already have an account saved)
    startPreLogIn(){
      var user = this.state.username;
      var pass = this.state.password;
    
      if(user != "" && pass != ""){
        this.props.navigation.navigate('Feed', {Username: user})
        Alert.alert("Logging");
      }
    }

    //Checks the username and password that's entered in the textbox
    checkEntries() {
      //Get user and pass from the object
      var user = this.state.username;
      var pass = this.state.password;

      //Make sure that the neither of the textbox's are blank
      if(user == "" || pass == ""){
        return alert("All fields must be filled");
      }
      //Starts the fetch from the webserver
      fetch('http://162.243.174.168/login.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //Sends a json encode to the server with the username and password
        body: JSON.stringify({
          username: user,
          password: pass,
         
        })
      }).then((response)=>response.json()).then((responseJson) => {
        //Once we receieve the payload from the server, we can see if the credentials were correct
        if(responseJson == 'LOGIN'){
          //Proceeds with the login
          this.props.navigation.navigate('Feed', {Username: user});
          //Saves the user and pass to the storage
          this.saveuserID();
        }else{
          //Sends an alert that the username/password were incorrect
          Alert.alert("Username or password is incorrect");
        }
      }).catch((error)=>{
        //Incase the server can't be reached
        Alert.alert(error);
      })

    }
    
    render() {
        return(
          <ImageBackground source={require('../assets/react.png')} style={styles.imageContainer}> 
            <KeyboardAvoidingView style={styles.container} behavior="padding" >
                <TextInput placeholder="username" returnKeyType="next" autoCapitalize='none' onChangeText={(text)=> this.setState({username:text})} autoCorrect={false} placeholderTextColor="rgba(0,0,0,0.7)" style={styles.input} />
                <TextInput placeholder="password" returnKeyType = "go" autoCapitalize='none' onChangeText={(text) => this.setState({password:text})} placeholderTextColor="rgba(0,0,0,0.7)" secureTextEntry={true} autoCorrect={false} style={styles.input}   />
               
                <TouchableOpacity style={styles.buttonContainer} onPress={this.checkEntries}>
                <Text style = {styles.buttonText} onPress={this.checkEntries}>Login</Text>
                </TouchableOpacity>
                
                <Text style={styles.register} onPress={() => this.props.navigation.navigate('Register')} >Create an account</Text>
            </KeyboardAvoidingView>
            </ImageBackground>
        );
    }

}
//Style sheet for the class; to give it some color
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


