import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: '',
      city: '',
      icon: '',
      city_display: '',
      main: '',


    }
  }

  getData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=3acd73f044aa44db0d5e60846c50dc55`)
      .then((response) => {
        // handle success
        this.setState(
          {
            data: response.data,
            temp: (response.data.main.temp - 273.15).toFixed(2) + ' C',
            city_display: response.data.name,
            icon: response.data.weather[0].icon,
            main: response.data.weather[0].main,
          }
        )





        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchboxview}>
          <TextInput style={styles.searchbox} placeholder="Search" onChangeText={(text) => { this.setState({ city: text }) }}></TextInput>
          <TouchableOpacity>
            <FontAwesome size={20} style={styles.searchicon} name="search" color="#333" onPress={this.getData.bind(this)} />
          </TouchableOpacity>
        </View>

        <View style={styles.weatherboxmain}>
          <View style={styles.weatherholderview}>
            <Image style={styles.weatherimage} source={{ uri: 'http://openweathermap.org/img/w/' + this.state.icon + '.png' }} />
            <View>
              <Text style={{ fontSize: 24, color: '#333' }}>{this.state.temp}</Text>
              <Text style={{ fontSize: 18, color: '#333' }}>{this.state.city_display}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default App


const styles = StyleSheet.create({
  searchboxview: {
    flexDirection: 'row',
    marginTop: "10%",
    height: "25%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchbox: {
    borderRadius: 5,
    width: "80%",
    height: "55%",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#333"
  },
  searchicon: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  weatherboxmain: {
    height: "35%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  weatherholderview: {
    height: "80%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    padding: 10
  },
  weatherimage: {
    height: 80,
    width: 80
  }
});
