import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

class ChooseNumbers extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
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
  }

  listNumbers() {
    return this.state.numbers.map((contact)=>{
      return <Text key={contact.recordID || Math.floor(Math.random() * 1000)}>{contact.givenName || contact.phoneNumbers[0].number}</Text>
    })
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity style={{height: 30, width: 70, backgroundColor: "blue"}}
        onPress={()=> {
          this.setState({
            text: '',
            numbers: this.state.numbers.concat([{
              phoneNumbers: [{
                number: this.state.text
              }]
            }])
          })
        }}>
          <Text>Push me</Text>
        </TouchableOpacity>
        <Text>Contacts:</Text>
        {this.listNumbers()}
      </View>
    )
  }
}

export default ChooseNumbers
