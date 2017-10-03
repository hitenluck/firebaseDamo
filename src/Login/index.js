    import React, {Component} from 'react';
    import {
        AppRegistry,
        StyleSheet,
        Text,
        TouchableOpacity,
        ToastAndroid,
        ToolbarAndroid,
        Image,
        NetInfo,
        TextInput,
        View
    } from 'react-native';
    import {Actions} from 'react-native-router-flux';
    import { StackNavigator, Drawernavigator,TabNavigator,NavigationActions} from 'react-navigation'
    import Userlst from '../Main/Userlst'
    import Details from '../Main/Details'
    const image = require('../assets/logo.png')
    import * as firebase from "firebase";
    import {Content,Container,Spinner} from 'native-base';

    class Login extends Component {

        //Constructor for initialization
        constructor() {
            super()
            //Setting up the state for data
            this.state = {
                username: "",
                Password: "",
                //error:""
                loading:false,

            }
           
        }

    //This function is for avoiding to go back on login activity 
        resetNavigation(targetRoute){
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: targetRoute }),
              ],
          });
            this.props.navigation.dispatch(resetAction);
        }


    //Function for firebase User Authentication, You can authenticate your users from firebase
    userValidationFromServer(){
      this.setState({
          loading: true
      });
      firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.Password
          ).then((userData) =>
          {

            this.resetNavigation('Userlst')

        }
        ).catch((error) =>
        {
            this.setState({
              loading: false
          });
            alert('Login Failed. Please try again '+error);
        });

    }


    //This is static mathod to validate user , if you want to use it call it on onPress o button
    _validateUser() {

        email = this.state.username
        password = this.state.Password
        if (email == "Hiten" && password == "12345") {
            ToastAndroid.show("Login Sucessfully", ToastAndroid.SHORT),
            this.props.navigation.navigate('Userlst', {name:email})

        } else {
            ToastAndroid.show("Invalid Username or Password", ToastAndroid.SHORT)
        }

    }
    render() {
      if (this.state.loading) {
          return(

            <Container  >

            <Content >

            <Spinner color='red' />
            </Content>
            </Container>

            )
      }
            // const { navigate } = this.props.navigation;
            return (

                <View style={styles.container}>
                <View>
                <View source={image} style={styles.viewCircle}>
                <Text style={styles.Logintext}>
                Simple Login
                </Text>
                </View>
                </View>

                <TextInput onChangeText={(text) => this.setState({username: text})} placeholder="Enter your Email" style={styles.inputText}/>
                <TextInput onChangeText={(text) => this.setState({Password: text})} secureTextEntry={true} placeholder="Enter your Password" style={styles.inputText}/>
                <TouchableOpacity style={styles.button} onPress={this.userValidationFromServer.bind(this)}>
                <Text style={styles.mytext}>Login Here</Text>
                </TouchableOpacity>

                </View>

                );
        }
    }

    const styles = StyleSheet.create({
        parentContainer: {
            flex: 1
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: "#4a148c",
            fontWeight: 'bold'
        },
        viewCircle:{
            height:200,
            width:200,
            borderRadius:200/2,
            backgroundColor:'#76a6ef',
            justifyContent:'center',
            alignItems:'center'
        },
        Logintext:{
            color:'white',
            fontWeight: 'bold',
            fontSize:20,

        },
        mytext: {
            fontStyle: 'italic',
            color: 'white',
            textAlign: 'center'
        },
        button: {
            backgroundColor: '#76a6ef',
            borderRadius: 10,
            padding: 10,
            margin: 10,

            shadowColor: '#8e24aa',
            width: '90%',
            shadowRadius: 10,
            shadowOpacity: 0.5
        },
        inputText: {

            padding: 10,
            margin: 10,
            width: '80%',
            shadowRadius: 10
        },
        Toolbar: {
            height: 56,
            backgroundColor: '#4a148c'
        },


    });
        //Navigation from one page to another
        Login.navigationOptions = {
          title: 'Login Page',
          header: null ,
      };
      Login = StackNavigator({

          Home: {screen: Login},
          Userlst:{screen:Userlst},


      });

      export default Login
