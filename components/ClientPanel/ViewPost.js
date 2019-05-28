import * as React from 'react';
import {StyleSheet,FlatList, Text, Alert, View} from 'react-native';
import {Header, Icon, ListItem} from 'react-native-elements';


export default class ViewPost extends React.Component {
  
  constructor(props){
    super(props);

  }
  title = this.props.navigation.getParam('Title');
  description = this.props.navigation.getParam('Description');
  username = this.props.navigation.getParam('Username');

  render() {
    return(
      <View style={styles.header}>
      <Header 
      leftComponent={<Icon name='arrow-left' type='font-awesome' onPress={() => this.props.navigation.navigate('Feed', {Username: this.username})}/>}
      />
        <View style={styles.container}>
            <Text style={{}}> {this.title} </Text>
            <Text> {this.username} </Text>
            <Text> {this.description} </Text>
            <Text><Icon name='exclamation-circle' type='font-awesome'/>Report</Text>
            
            //Clickable texts for the OP
            //Check if user is admin
            <Text>Edit</Text>
            <Text>Delete</Text>
        </View>
          //Sort through the comments with a for loop
          //Note to self, don't use the style sheet as the comment container will need to be dynamically set depending on how much text there is
        </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {

  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
    
  },
});