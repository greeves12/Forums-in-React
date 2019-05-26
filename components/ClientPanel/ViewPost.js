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
        <Text>{this.title}</Text>
        <Text>{this.description}</Text>
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
    marginTop: 50
  },

});