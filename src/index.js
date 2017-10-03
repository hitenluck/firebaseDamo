import React, {Component} from 'react';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {NetInfo} from 'react-native'
import Login from './Login';

import Userlst from './Main'
import * as firebase from "firebase";

//Keys are not Displyed Correctly because of Security reasion
class AppMain extends Component {
    constructor(props) {
        super(props);
        var config = {
     apiKey: "AIzaSyBOFr9xB99DkURKHvdhLfe-*****",
     authDomain: "realtimedb-****.firebaseapp.com",
     databaseURL: "https://realtimedb-****.firebaseio.com",

   };
   if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

   //Whenever you start app this bellow code insert a single record in fireabse DB
   //You can Put this code on your button click or as per your requirments
/*var rootRef = firebase.database().ref();
   rootRef.push({
     imgpath:"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
     subtitle:"IOS developer",
     uname:"Simon"

   })*/
        this.state = {
            isLogin: false
        }
    }
    componentWillUnmount() {
       // stop listening for events
       this.notificationListener.remove();
       this.refreshTokenListener.remove();
   }

    componentDidMount()  {

      NetInfo.isConnected.fetch().then(isOnline => {
        console.log(isOnline);
       });
            FCM.requestPermissions();
            FCM.getFCMToken().then(token => {
              //  console.log("Your token="+token)
               

            });

            this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
           // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
           if(notif.local_notification){
             //this is a local notification
           }
           if(notif.opened_from_tray){
             //app is open/resumed because user clicked banner
           }
           await someAsyncCall();


             //optional
             //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
             //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
             //notif._notificationType is available for iOS platfrom
             switch(notif._notificationType){
               case NotificationType.Remote:
                 notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                 break;
               case NotificationType.NotificationResponse:
                 notif.finish();
                 break;
               case NotificationType.WillPresent:
                 notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                 break;
             }

       });
       this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {

           // fcm token may not be available on first load, catch it here
       });
   }


    render() {
        if (this.state.isLogin === true) {
            return (  <Userlst/>)
        } else {
            return (<Login/>)
        }

    }

}

export default AppMain;
