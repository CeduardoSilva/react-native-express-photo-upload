import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const SERVER_URL = 'http://localhost:3000';

const UploadButton = () => {
  return (
    <View style={styles.uploadButton}>
      <Text>Select Image</Text>
    </View>
  );
};

const App = () => {

  const [image, setImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      console.log('response', response);
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Photo Uploader</Text>
        <Image
          style={styles.image}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <TouchableOpacity onPress={() => handleChoosePhoto()}>
          <UploadButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 300,
    height: 300,
  },
  uploadButton: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 30,
  },
});

export default App;
