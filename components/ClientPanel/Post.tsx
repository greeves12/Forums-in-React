import * as React from 'react';
import {Text,TextInput, TouchableOpacity, KeyboardAvoidingView, View, StyleSheet, Alert} from 'react-native';
import {Header, Divider, Icon} from 'react-native-elements';


export default class Post extends React.Component <any,any>{
  constructor(props: any){
    super(props);
    
    this.createPost = this.createPost.bind(this);
  }

   state = {
      title: "",
      description: ""
    }
    

    createPost (){
      const {title} = this.state;
      const {description} = this.state;
      var username = this.props.navigation.getParam('Username');

      if(title == "" || description == ""){
        return Alert.alert("All fields must be filled");
      }
      fetch('http://162.243.174.168/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          username: username
        })
      }).then((response)=>response.json()).then((responseJson)=>{
        if(responseJson == 'POSTED'){
          this.props.navigation.navigate('Ticket');
          Alert.alert("Successfully posted.");
        }else{
          Alert.alert("Something went wrong...Try again later");
        }
      }).catch((error)=>{
        Alert.alert(error);
      })
    }
  
  
  render(){
    return(
      <View style={styles.Head}>
      <Header 
        leftComponent={<Icon name='arrow-left' type='font-awesome' onPress={() => this.props.navigation.navigate('Ticket')} />}
        rightComponent={<Icon name='check' type='font-awesome' onPress={this.createPost} />}
      />
      <KeyboardAvoidingView style={styles.Container} behavior="padding">
      
      <TextInput style={styles.Input} returnKeyType="next" placeholder="Enter Title..." onChangeText={(text)=> this.setState({title:text})}></TextInput>
      <TextInput style={styles.Desc} textAlignVertical={'top'} multiline={true} placeholder="Enter Description..." onChangeText={(text) => this.setState({description:text})}></TextInput> 
     
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Head: {
    flex: 1,
    justifyContent: "flex-start",    
  },
  Input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginTop: 60,
        paddingHorizontal: 10,
        opacity: 0.5,
  },
  Desc: {
    height: 300,
    marginTop: 120
  },
  Container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "flex-start",
    
  }, 

});