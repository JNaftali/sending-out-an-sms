/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Linking
} from 'react-native'

import { text } from 'react-native-communications'
import ChooseNumbers from './ChooseNumbers'

class SendingOutAnSMS extends Component {
  constructor() {
    super()
    this.state = {
      myPosition: 'unknown',
      lat: 'unknown',
      long: 'unknown',
      numbers: [
        {
          givenName: 'Josh Marantz',
          phoneNumbers: [
            {
              number: '7324257681'
            }
          ]
        }
      ]
    }
    this.addNumber = this.addNumber.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      (position) => {
        let myPosition = JSON.stringify(position);
        let cords = position.coords;
        let lat = cords.latitude;
        let long = cords.longitude;
        this.setState({myPosition, lat, long});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  _onPressButton(link) {
  const nums = this.state.numbers.reduce((string, contact) => {return string + contact.phoneNumbers[0].number + ', '}, '')

  Linking.openURL(`sms:1234567890,7324257681,3012521180&body=${link}`)
  // text(nums, link)
}

  addNumber(number) {
    this.setState({
      numbers: this.state.numbers.concat([{
        phoneNumbers: [{
          number: number
        }]
      }])
    })
  }

  render() {
    let link = `http://maps.google.com/maps?z=17%26t=m%26q=loc:${this.state.lat}+${this.state.long}`
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Find Me
        </Text>
        <Text style={styles.instructions}>
          Click the button to text your contact a Google map with your current location.{'\n'}

        </Text>
        <TouchableHighlight style={styles.button} onPress={() => this._onPressButton(link)}>
          <Text style={styles.instructions}>SEND</Text>
        </TouchableHighlight>
        <ChooseNumbers numbers={this.state.numbers} handlePress={this.addNumber}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#00bfff',
    marginBottom: 5,
    marginTop: 5,
    padding: 15,
    borderWidth: 4,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderRadius: 15,
}
});

AppRegistry.registerComponent('SendingOutAnSMS', () => SendingOutAnSMS);
