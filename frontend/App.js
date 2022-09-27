import React, { useEffect, useState } from 'react';
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

const createFormData = (photo, body = {}, filename) => {
  const data = new FormData();

  data.append('upload', {
    name: filename,
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
  const [filename, setFilename] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    console.log('Rerendering for photo url update: ', photoURL);
  }, [photoURL]);

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(image, { userId: '123' }, filename),
    })
      .then((response) => {
        let responseJson = response.json();
        setPhotoURL(`https://ceduardods-bucket.fra1.digitaloceanspaces.com/${filename}`)
        return responseJson
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
        console.log(response.assets[0].fileName);
        setImage(response.assets[0]);
        setFilename(response.assets[0].fileName);
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
            uri: photoURL,
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
