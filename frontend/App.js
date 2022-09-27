import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadPhoto} from './src/services/photo-service';

const UploadButton = () => {
  return (
    <View style={styles.uploadButton}>
      <Text>Upload Photo</Text>
    </View>
  );
};

const ChoosePhotoButton = () => {
  return (
    <View style={styles.uploadButton}>
      <Text>Select Photo</Text>
    </View>
  );
};

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [filename, setFilename] = useState('');
  const [photoURL, setPhotoURL] = useState('https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ=w480-h960-rw');

  useEffect(() => {
    console.log('Re-rendering for photo url update: ', photoURL);
  }, [photoURL]);

  const handleUploadPhoto = async () => {
    let newPhotoURL = await uploadPhoto(photo, filename);
    console.log(`New photo url: ${newPhotoURL}` )
    setPhotoURL(newPhotoURL);
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response) {
        console.log(response.assets[0].fileName);
        setPhoto(response.assets[0]);
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
 