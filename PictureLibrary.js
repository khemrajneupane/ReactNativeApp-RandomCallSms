import * as React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Expo from 'expo';

// or any pure javascript modules available in npm
import { Card, Icon } from 'react-native-elements'; // 0.19.1

export default class PictureLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, data: [], randomImage: null };
  }

  getRandomPics = async () => {
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA_ROLL
    );

    if (status !== 'granted') {
      console.log('taking photo is not allowed!');
      return;
    }
    let img = await Expo.ImagePicker.launchImageLibraryAsync();
    console.log(img.uri);
    this.setState({
      randomImage: img.uri,
    });
  };

  saveData = () => {
    let myArray = {
      randomImage: this.state.randomImage,
    };
    AsyncStorage.setItem('myArray', JSON.stringify(myArray));

    //alert(this.state.randomImage);
  };
  showData = async () => {
    let myArray = await AsyncStorage.getItem('myArray');
    let dat = JSON.parse(myArray);

    this.setState({
      data: [...this.state.data, dat],
    });
  };

  render() {
    let element = this.state.data.map((val, index) => {
      return (
        <Image
          source={{ uri: val.randomImage }}
          style={{ height: 350, width: 300 }}
        />
      );
    });
    if (!element) {
      return(<ScrollView>
          <Image source={require('./khem.jpg')} />
          </ScrollView>)
    }
    return (
      <View style={styles.container}>
        <ScrollView>{element}</ScrollView>
 
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              this.getRandomPics();
            }}>
            <Icon raised name="camera" type="font-awesome" color="#f50" />
            <Text>LIBRARY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.saveData();
            }}>
            <Icon raised name="save" type="font-awesome" color="#f50" />
            <Text style={{ marginLeft: 15 }}>SAVE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.showData();
            }}>
            <Icon raised name="bars" type="font-awesome" color="#f50" />
            <Text style={{ marginLeft: 15 }}>VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'rgba(114, 110, 248,0.1)',
    width: 310,
  },
});
