import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { ImageBackground, StyleSheet, View, Platform, KeyboardAvoidingView} from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: ""
      },
      image: null,
      isConnected: null,
    };
    if (!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyB4eW930ogcbtipLp8Tbodsw-djveaK6No",
        authDomain: "chatapp-85515.firebaseapp.com",
        projectId: "chatapp-85515",
        storageBucket: "chatapp-85515.appspot.com",
        messagingSenderId: "766307957099",
        appId: "1:766307957099:web:e7eca968d1950d12a9f42e"
      })
    }
    
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessagesUser= null;
  };

  componentDidMount() {
    
    let { name} = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
      },
      });
      this.referenceMessagesUser = firebase.firestore().collection("messages").where("uid", '==', this.state.uid);

      this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc") 
    });
  }
 
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        image: data.image
      });
    });
    this.setState({
      messages: messages,
    });
  };

  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: this.state.user
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),() => {
      
      this.addMessages();
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }


  //display component
  render() {
    //background color for Start screen
    const { bgColor } = this.props.route.params;
    return (
      <View style={[styles.chatView,  {backgroundColor: bgColor}]}>
        <GiftedChat
          style={styles.chatBubble}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chatView: {
    flex: 1,
  },
  chatBubble: {
    paddingLeft: 50,
    flex: 1
  }
})