import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
const FormButton = ({textlabel, styleButton, styleText, eventHandler, disable}) => {
    const buttonColor = () =>{
        if(disable){
            return styles.disabled
        }else{
            return styleButton
        }
    }
    return(
        <TouchableOpacity style = {[styles.defaultButton, buttonColor()]}
        onPress={eventHandler}
        disabled ={!disable? false: true}
        >
        {/* return button */}
            <Text style = {[styles.defaultText, styleText]}>
                {capitalizeFirstLetter(textlabel)}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    defaultButton:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 2,
        elevation: 2,
        width: '100%',
        height: 52,
        borderRadius: Border.br_7xl,
        overflow: "hidden",
        marginBottom: 10,
    },
    defaultText: {
        fontSize: FontSize.size_lg,
        lineHeight: 28,
        fontFamily: FontFamily.interRegular,
    },
    disabled:{
        backgroundColor:Color.colorLightslategray
    }
})

export default FormButton;