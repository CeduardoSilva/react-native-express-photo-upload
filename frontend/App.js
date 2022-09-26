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

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('upload', {
    name: 'uploaded_image',
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const UploadButton = () => {
  return (
    <View style={styles.uploadButton}>
      <Text>Upload Image</Text>
    </View>
  );
};

const ChoosePhotoButton = () => {
  return (
    <View style={styles.uploadButton}>
      <Text>Select Image</Text>
    </View>
  );
};

const App = () => {

  const [image, setImage] = useState(null);

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(image, { userId: '123' }),
    })
      .then((response) => {
        let responseJson = response.json();
        return responseJson
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response) {
        setImage(response.assets[0]);
      }
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
          <ChoosePhotoButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUploadPhoto()}>
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
