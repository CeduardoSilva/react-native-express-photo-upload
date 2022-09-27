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
                <Text style={styles.btnText}>Choose Photo</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnText: {
        fontSize: 20,
    },
    choosePhotoButton: {
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
        backgroundColor: 'white',
        borderColor: 'dodgerblue',
        borderRadius: 3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 55,
    }
});
