import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import { splitByDash } from "../utils/TextBasedUtilityFunctions";
import CheckBox from '@react-native-community/checkbox';
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
const CheckBoxWithText = ({option}) =>{
    // keys are : optionTitle, value and valueSetter
    return (
        <View style={[styles.checkBoxWithText]}>
            <CheckBox 
                value = {option.value}
            />
            <Text style ={[styles.descriptionText]}>
                {capitalizeFirstLetter(splitByDash(option.optionTitle))}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    checkBoxWithText:{
        flexDirection: 'row',
        width: "100%",
        height: 22,
        backgroundColor: Color.colorGray_200,
        justifyContent: "flex-start",
        alignItems: 'center',
        marginVertical: 10
    },
    descriptionText:{
        fontFamily: FontFamily.interRegular,
        color: Color.colorGray_100,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textAlign: "left"
    }
})

export default CheckBoxWithText;