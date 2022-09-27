import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export const UploadButton = (props) => {
    const { handleUploadPhoto } = props;

    return (
        <TouchableOpacity onPress={handleUploadPhoto}>
            <View style={styles.uploadButton}>
                <Text>Upload Photo</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    uploadButton: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
    }
});