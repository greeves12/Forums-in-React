import * as React from 'react';
import {StyleSheet,FlatList, Text, Alert, View, ImageBackground, ScrollView, RefreshControl} from 'react-native';
import {Header, Icon, ListItem} from 'react-native-elements';


export default class ViewPost extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={
      data: [],
      refreshing: false
    }

    this.getAllComments = this.getAllComments.bind(this);
  }

  //Local variables that are fetched from the property
  title = this.props.navigation.getParam('Title');
  description = this.props.navigation.getParam('Description');
  username = this.props.navigation.getParam('Username');
  theId = this.props.navigation.getParam('ID');
  op = this.props.navigation.getParam('OP');
  admin = this.props.navigation.getParam('Admin');

  deleteContent=()=>{

  }

  getAllComments=()=>{
    var i = this.props.navigation.getParam('ID');
    //Creates another request to the server
    fetch('http://162.243.174.168/comment.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //We need to send the ID of the thread only since we only want the comments for that thread
          id: i
        })
    }).then((reponse) => reponse.json()).then((reponseJson) => {
        //Set the state data as the array reponse we get back
        this.setState({data: reponseJson});
    }).catch((error) =>{
      Alert.alert(error);
    })
  }

  //Makes sure we get the comments first since we need to render them
  componentDidMount(){
    this.getAllComments();
  }

  render() {
    let deleteIcon;
    let deleteText;
    let editText;
    let editButton;

    if(this.username == this.op || this.admin){
      deleteIcon =  <Icon onPress={() => this.deleteContent} name='trash' type='font-awesome' size={20} />
      deleteText =  <Text onPress={() => this.deleteContent}> Delete</Text>
      editText = <Text onPress={() => this.props.navigation.navigate()}> Edit    </Text>
      editButton = <Icon onPress={() => this.props.navigation.navigate()} containerStyle={{marginLeft: 3}} name='edit' type='font-awesome' size={20}/>
    }

    return(
    <ImageBackground style={{flex: 1,resizeMode: 'cover'}} source={require('../../assets/react.png')} >
     
      <Header innerContainerStyles={{}}
      backgroundColor='orange'
      leftComponent={<Icon name='arrow-left' type='font-awesome' onPress={() => this.props.navigation.navigate('Feed', {Username: this.username})}/>}
      /> 
    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getAllComments}/>}>
      <View style={{width: 350,height: 300,marginLeft: 30, backgroundColor: '#F4F6F6'}}>
        <View style={{height: 40, width: 350, backgroundColor: '#FA8072'}}></View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 10, fontSize: 20, textDecorationLine: 'underline'}}>{this.title} </Text>
            <Text> u/{this.username} </Text>
        </View>    
            <Text> {this.description} </Text>
            
        <View style={{flexDirection: 'row', marginTop: 180}}>
            {editButton}
            {editText}
            {deleteIcon}
            {deleteText}
            <Icon containerStyle={{marginLeft: 68}} name='reply' type='font-awesome' size={20} onPress={() => this.props.navigation.navigate('Comment', {Username: this.username, Title: this.title, Description: this.description, ID: this.theId})}/>
            <Text onPress={() => this.props.navigation.navigate('Comment', {Username: this.username, Title: this.title, Description: this.description, ID: this.theId})}> Reply    </Text>
            <Icon name='exclamation-circle' type='font-awesome' size={20}/>
            <Text> Report</Text>
        </View>
      </View>
 
          <FlatList style={{marginTop:10}}
            data={this.state.data}
            renderItem={({item}) => (
              <View style={{flex: 1, width: 350, border: 1, backgroundColor: '#FFF' ,borderColor: 'black', borderWidth: 1, marginLeft: 30}}>
                <View style={{flexDirection: 'row', backgroundColor: '#F4F6F6', borderBottomColor: '#000000', borderBottomWidth: 1, paddingBottom: 5}}>
                  <Text style={{}}>Posted by u/{item.username} </Text>
                </View>
                <Text> {item.description} </Text>

                <View style={{}}>
                  
                </View>
              </View>
            )}
          />
        </ScrollView>
    </ImageBackground>
        
    );
  }
}