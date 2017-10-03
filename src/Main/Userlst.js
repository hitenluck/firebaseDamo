  import React, { Component } from 'react';
  import {StyleSheet, Text, View, ToastAndroid,ListView, FlatList,Image} from 'react-native';
  import {List, ListItem} from 'react-native-elements'
  import { DrawerNavigator,StackNavigator} from 'react-navigation'
  import ActionSheet from 'react-native-actionsheet'
  import Details from './Details';
  import * as firebase from "firebase";
  import mapLoad from './mapLoad'
  import {Spinner,Container,Content} from 'native-base'
  const CANCEL_INDEX = 0
  const DESTRUCTIVE_INDEX = 4
  const options = [ 'Cancel', <Text style={{color: '#1976D2'}}  >Option1</Text>,  <Text style={{color: '#1976D2'}}>Option2</Text>,  <Text style={{color: '#1976D2'}}>Show Details</Text> ]
  const title = 'Choose Your choice?'

  class Userlst extends Component {

   constructor( props){
     super(props)
     this.state = {
       selected: '',
       dbRef: firebase.database().ref(),  //Getting the reference of firebase RealTime DB

     }
     this.handlePress=this.handlePress.bind(this)
     this._onActionSelected=this._onActionSelected.bind(this)

   }

   componentDidMount() {
     this.listenForItems(this.state.dbRef);
   }


   _onActionSelected () {
    this.ActionSheet.show()
  }

  handlePress(i) {
   this.setState({
     selected: i
   })
   if(this.state.selected==3){
     this.props.navigation.navigate('detail') //navigating to Detail Screen
   }
  }

  listenForItems(itemsRef) {
   itemsRef.on('value', (snap) => {

     // get children as an array
     var items = [];
     snap.forEach((child) => {
       items.push({                       

         name: child.val().uname,
         avatar_url:child.val().imgpath,
         subtitle: child.val().subtitle,

       });
     });

     this.setState({
       data: items,
     });

   });
  }



  render() {
    if (!this.state.data) {
      return(
      <View style={styles.spinner}>
        <Container  >
          <Content >
            <Spinner color='red' />
          </Content>
      </Container>
      </View>
      )
    }
    return (

    <List >
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (<ListItem onPress={this._onActionSelected.bind(this)}
        roundAvatar title={item.name}
        subtitle={item.subtitle}
        avatar={{
          uri: item.avatar_url
          }}/>
      )}
      keyExtractor={item=>item.name}
    />

    <View >
      <ActionSheet
        ref={o => this.ActionSheet = o}
        title={title}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={this.handlePress}/>
    </View>
    </List>
    );
  }
  }

//Stylesheet for UI
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: -10
   },
   spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,

  },
  item: {
    padding: 0,
    fontSize: 18,
    height: 0,
  },
  style_sheet:{
    backgroundColor:'red',
    borderRadius: 20,
    padding:10,
    margin:10,
    shadowColor: '#8e24aa',
  },
  font: {
    fontSize: 18,
    backgroundColor:'red'
  },
  img: {
    height:40,
    width:40,
    margin:10
  },
  })
  Userlst.navigationOptions = {
    title: 'Home',
    headerRight: (<Image source={require('../assets/logo.png')} style={styles.img}/>),
    headerLeft:null,
  };
  Userlst=DrawerNavigator({
    Userlst:{screen:Userlst},
    detail: {screen: Details},
    mapload:{screen:mapLoad}
  });
  export default Userlst
