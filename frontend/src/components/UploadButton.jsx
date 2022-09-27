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
                <Text style={styles.btnText}>Upload Photo</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    uploadButton: {
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
        borderRadius: 3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 55,
    }
});