import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { StackNavigator, ScrollView } from 'react-navigation';
import { Icon, Header, Card } from 'react-native-elements';
import { Footer } from 'native-base';
export default class About extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Header
            centerComponent={{
              text: 'Random Call Automatic Joke SMS',
              style: { color: '#fff' },
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <Text>
              This app is a complete package for recreation. Primary purpose of
              this app is to entertain you by fetching any random but lucky
              phone number from your contact list. You can call them just by
              touching the nuber or name. You can even send a random joke as a
              text message. This app is a complete package for recreation.
              Primary purpose of this app is to entertain you by fetching any
              random but lucky phone number from your contact list. You can call
              them just by touching the nuber or name. You can even send a
              random joke as a text message.
            </Text>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card>
            <Icon
              raised
              name="camera"
              type="font-awesome"
              color="#f50"
              size={8}
            />
            <Text>
              By clicking this button you will visit your camera library where
              you just pick any picture of your interest.{' '}
            </Text>
          </Card>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card>
            <Icon
              raised
              name="save"
              type="font-awesome"
              color="#f50"
              size={8}
            />
            <Text>
              By clicking this button, you will save the recently picked picture
              into your own gallery on the bottom of this app screen.
            </Text>
          </Card>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Card>
            <ScrollView>
              <Icon
                raised
                name="bars"
                type="font-awesome"
                color="#f50"
                size={8}
              />
              <Text>
                This button will display all the pictures you have chosen on a
                degined screen size, in scrollable view. Again, if you are in a
                location unknown, you can check the current location, its
                weather.If you are doubtful of the location, just click the
                location button that gives you the exact location. Fun part is
                that,if you are really lost somewhere and if you want to test
                who is going to be your savior, just press the random number
                call button and touch the name or number. This is all fun!!
              </Text>
            </ScrollView>
          </Card>
        </View>

        <Footer>
          <Text style={{ marginTop: 15 }}>
            {'\u00A9'}
            Khem Raj Neupane{' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() =>
                Linking.openURL('https://github.com/khemrajneupane')
              }>
              Github{' '}
            </Text>
            <Text
              style={{ color: 'blue' }}
              onPress={() =>
                Linking.openURL('https://twitter.com/khemraj_neupane')
              }>
              Twitter{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() =>
                  Linking.openURL(
                    'https://www.linkedin.com/in/khem-raj-neupane-3a3172176/'
                  )
                }>
                linkedin
              </Text>
            </Text>
          </Text>
        </Footer>
      </View>
    );
  }
}
