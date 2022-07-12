import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { ImageBackground, StyleSheet, View, Platform, KeyboardAvoidingView} from 'react-native';


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        name: "",
      },
      image: null,
    };
  };
 

  componentDidMount() {

    const name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name});

    this.setState({
      messages: [
        {
          _id: 1,
          text: ` Welcome ${ name }`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: name,
            avatar: 'https://placeimg.com/140/140/any',
          }
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  } 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
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