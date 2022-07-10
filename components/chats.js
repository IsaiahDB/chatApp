import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View} from 'react-native';


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      user: {
        name: "",
      },
      image: null,
    };

 
  };
 

  componentDidMount() {

    const name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name});
  } 

  //display component
  render() {
    //background color for Start screen
    const { bgColor } = this.props.route.params;
    return (
      <View style={[styles.chatView,  {backgroundColor: bgColor}]}></View>
    )
  }
}

const styles = StyleSheet.create({
  chatView: {
    flex: 1,
  }


})