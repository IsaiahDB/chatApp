import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity, TextInput} from 'react-native';

// Default background image from the assets folder
import BackgroundImage from "../img/Background_Image.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.colors.pink
    };
  }

  //Update background color on Chat Screen for user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };
  // backgroud colors
  colors = {
    lavender: "#CDB4DB",
    orchid_pink: "#FFC8DD",
    nadeshiko: "#FFAFCC",
    lightblue: "#BDE0FE",
    blue: "#1B70A0",
  };

  render() {
    return (
      // Create the color arrays, titles and the app's colors
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chat App!</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="What is your name?"
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.pickColor}>
                {" "}
                Choose background color{" "}
              </Text>
            </View>

            {/* Color changes for background */}
            <View style={styles.colorDisplay}>
              <TouchableOpacity
                style={styles.colorOne}
                onPress={() => this.changeBgColor(this.colors.lavender)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.colorTwo}
                onPress={() => this.changeBgColor(this.colors.orchid_pink)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.colorThree}
                onPress={() => this.changeBgColor(this.colors.nadeshiko)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.colorFour}
                onPress={() => this.changeBgColor(this.colors.lightblue)}
              ></TouchableOpacity>
            </View>

            {/*Button to take users to the chat page */}
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Chat</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Chat app styles sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "40%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  box1: {
    backgroundColor: "#FFFFFF",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "#A2D2FF",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },

  pickColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
  },

  colorDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  colorOne: {
    backgroundColor: "#CDB4DB",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorTwo: {
    backgroundColor: "#FFC8DD",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorThree: {
    backgroundColor: "#FFAFCC",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorFour: {
    backgroundColor: "#BDE0FE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#8093F1",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});