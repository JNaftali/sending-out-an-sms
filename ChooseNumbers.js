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
      text: ''
    }
  }

  listNumbers() {
    return this.props.numbers.map((contact)=>{
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
          this.props.handlePress(this.state.text)
          this.setState({
            text: ''
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
