import React from 'react';
import Expo from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';

import { SMS, Font } from 'expo';
import PictureLibrary from './PictureLibrary';
import Communications from 'react-native-communications';
import { Button, Icon } from 'react-native-elements';
import { Location, Permissions, MapView } from 'expo';

import { createStackNavigator } from 'react-navigation';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomContact: null,
      ph: null,
      nameCall: null,
      joke: null,
      image: '',
      radomImage: '',
      location: null,
      presentAddress: '',
      name: '',
      city: '',
      street: '',
      country: '',
      latitude: 60.1995, //null
      longitude: 24.9342, //null
    };
  }
  static navigationOptions = {
    title: 'Call Or Text A Lucky Number',
  };

  _getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    //console.log(status)=granted or denied;
    if (status !== 'granted') {
      console.error('Location permission not granted!');
      return;
    }
    let location = await Expo.Location.getCurrentPositionAsync({});
    //console.log(location)= gives the coordination of the current position of the phone;
    let presentAddress = (await Expo.Location.reverseGeocodeAsync(
      location.coords
    ))[0];
    //console.log(presentAddress)= takes location with coordinations as parameters to be tracked back;
    this.setState({
      location,
      presentAddress,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      name: ' ' + presentAddress.name,
      country: presentAddress.country + ' ',
      street: 'Current Place ' + presentAddress.street,
      city: presentAddress.city,
    });
  };
  //Requesting for permission asynchronously to use the phone CONTACTS
  getRandomContacts = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (status !== 'granted') {
      console.error('Permission denied!');
      return;
    }
    let contacts = await Expo.Contacts.getContactsAsync({
      pageSize: 100,
      offset: 0,
      fields: [Expo.Contacts.PHONE_NUMBERS],
    });
    //console.log(contacts)=returns total contacts and data array with objects for individual phones saved in phone;
    let { total } = contacts;
    //console.log(total)=total contacts;
    let n = Math.floor(Math.random() * total);
    //console.log(contacts)=generating random numbers from start to end of the numbers of phone;
    let randomContact = await Expo.Contacts.getContactsAsync({
      pageSize: total,
      offset: n, //The RANDOM number of contacts to skip before gathering contacts.
      fields: [Expo.Contacts.PHONE_NUMBERS], //returns any fields we defie here, e.g. email, phone etc.
    });
    let { data } = randomContact;
    let c = data[n];
    this.setState({
      randomContact: c, //this sets the state of random phone number
    });
    let phon = this.state.randomContact.phoneNumbers[0].number; //exact phone number, below, setting to state
    let callPerson = this.state.randomContact.name; //exact name of that phone number, below, setting to state
    this.setState({
      ph: phon + ' ',
      nameCall: callPerson.toUpperCase(),
    });
  };

  ///use of api to get random quotes:

  _isAvailable = async () => {
    const isAvailable = await Expo.SMS.isAvailableAsync();
  };
  getRandomPics = () => {
    fetch(
      'https://api.unsplash.com/photos/?client_id=e203e16b0be7662ece22c51b0c82029bba27513ec1d257736dc5b78b3d697cc0'
    )
      .then(response => response.json())
      .then(responseJson => {
        let n = Math.floor(Math.random() * 10);
        this.setState({
          radomImage: responseJson[n].urls.full,
        });
      });
  };
  //fetching random joke and setting it as sms to be sent to a random number
  _handleSMS = async () => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson.icon_url);
        this.setState({
          joke: responseJson.value,
        });
      });
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.SMS);
    if (status !== 'granted') {
      console.error('Permission denied!');
      return;
    }
    const { smsValue } = await Expo.SMS.sendSMSAsync(
      [this.state.ph],
      this.state.joke
    );
    //console.log(smsValue);
  };

  //using lat lan to get weather info on this app
  getWeather = () => {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
        this.state.latitude +
        '&lon=' +
        this.state.longitude +
        '&units=metric&APPID=a318e7cbd34562aff0648d5ef8c0d022'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          temperature: responseJson.main.temp + ' \u2103',
          image: responseJson.weather[0].icon,
          description: responseJson.weather[0].description + ' ',
        });
      });
  };
  componentDidMount() {
    this.getWeather();
    this._getLocationAsync();
    this.getRandomContacts();
    this.getRandomPics();
  }

  render() {
    const url = 'http://openweathermap.org/img/w/' + this.state.image + '.png';
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginLeft: -100 }}>
          <View style={{ marginLeft: -25 }}>
            <Button onPress={() => navigate('About')} title="About" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{
                width: 200,
                height: 80,
                marginBottom: 5,
                marginRight: -20,
                alignItems: 'stretch',
              }}
              source={{ uri: this.state.radomImage }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => Communications.phonecall(this.state.ph, true)}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '3c5b76' }}>{this.state.nameCall}</Text>
              <Text style={{ color: '3c5b76' }}>{this.state.ph}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="picture-in-picture-alt"
            size={70}
            onPress={() => {
              this.getRandomPics();
            }}
          />

          <Icon
            name="contact-phone"
            size={70}
            onPress={() => {
              this.getRandomContacts();
            }}
          />

          <Icon
            name="sms"
            size={70}
            onPress={() => {
              this._handleSMS();
            }}
          />
        </View>

        <View
          style={{
            width: 150,
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 1,
          }}>
          <Text style={{ color: '#3c5b76' }}>
            {this.state.description}
            {this.state.temperature}
          </Text>
          <Image
            style={{
              width: 70,
              height: 20,
            }}
            source={{ uri: url }}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Icon name="location-on" size={20} />
          <TouchableOpacity onPress={this.getWeather}>
            <Button
              onPress={() => {
                this.getWeather();
              }}
              title={this.state.street}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: 150, flexDirection: 'row', marginBottom: 10 }}>
          <Text
            style={{
              cocolor: '#3c5b76',

              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {this.state.country}
            {this.state.city}
            {this.state.name}
          </Text>
        </View>
        <PictureLibrary />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(114, 110, 248,0.5)',
  },
});
