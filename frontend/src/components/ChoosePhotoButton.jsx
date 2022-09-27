import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export const ChoosePhotoButton = (props) => {
    const { handleChoosePhoto } = props;

    return (
        <TouchableOpacity onPress={handleChoosePhoto}>
            <View style={styles.choosePhotoButton}>
                <Text>Select Photo</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    choosePhotoButton: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
    }
});
