import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ChoosePhotoButton} from './src/components/ChoosePhotoButton';
import {UploadButton} from './src/components/UploadButton';
import {uploadPhoto} from './src/services/photo-service';
import {PLACEHOLDER_URL} from './src/shared/constants';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [filename, setFilename] = useState('');
  const [photoURL, setPhotoURL] = useState(PLACEHOLDER_URL);

  useEffect(() => {}, [photoURL]);

  const handleUploadPhoto = async () => {
    let newPhotoURL = await uploadPhoto(photo, filename);
    setPhotoURL(newPhotoURL);
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response) {
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
        <View style={styles.btnsContainer}>
          <ChoosePhotoButton handleChoosePhoto={handleChoosePhoto} />
          <UploadButton handleUploadPhoto={handleUploadPhoto} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
    height: '20%',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  image: {
    borderColor: 'dodgerblue',
    borderRadius: 2,
    borderWidth: 2,
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 30,
  },
});

export default App;
