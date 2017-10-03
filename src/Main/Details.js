import React, { Component } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';

import { DrawerNavigator,StackNavigator} from 'react-navigation'
import ActionSheet from 'react-native-actionsheet'
import { List, ListItem,Container, Header,Right, Content,
  Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import * as firebase from "firebase";

const image = require('../assets/logo.png')

 class Details extends Component {


constructor(props){
  super(props);
  this.state={
    dbRef: firebase.database().ref(),
    data:[]
  }
}

componentDidMount() {
    this.listenForItemOfCard(this.state.dbRef);
  }

  listenForItemOfCard(itemsRef){
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({

          name: child.val().uname,
          avatar_url:child.val().imgpath,
          subtitle: child.val().subtitle,
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        data: items,

      });

    });
  }


  render() {
    
    return (

      <Container>
                      <Content>
                      {//Getting data from RealDB and Bind it to CardItem to Create
                        //Cards using looping 
                      }
                          <List>
                            {
              this.state.data.map((item, index)=>{
                 return (
                   <Card key={index}>
                                 <CardItem>
                                   <Left>
                                     <Thumbnail source={{
                                 uri: item.avatar_url
                                }} />
                                     <Body>
                                       <Text>{item.name}</Text>
                                       <Text note>{item.subtitle}</Text>
                                     </Body>
                                   </Left>
                                 </CardItem>
                                 <CardItem cardBody style={{justifyContent: 'center',
                                 alignItems: 'center',}}>

                                   <Image source={{
                                 uri: item.avatar_url
                                }} style={styles.imagestyle}/>
                                 </CardItem>
                                 <CardItem>
                                   <Left>
                                     <Button transparent>
                                       <Icon active name="thumbs-up" />
                                       <Text>12 Likes</Text>
                                     </Button>
                                   </Left>
                                   <Body>
                                     <Button transparent>
                                       <Icon active name="chatbubbles" />
                                       <Text>4 Comments</Text>
                                     </Button>
                                   </Body>
                                   <Right>
                                     <Text>11h ago</Text>
                                   </Right>
                                 </CardItem>
                               </Card>
                             )
                          })
                        } 

                          </List>
                      </Content>
                  </Container>









    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: -10
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
    padding: 10,
    fontSize: 18,

      backgroundColor:'red'

  },
  imagestyle: {
        width: 200,
        height: 200,
  },
})


Details.navigationOptions = {
  title: 'Detail',

};
export default Details
