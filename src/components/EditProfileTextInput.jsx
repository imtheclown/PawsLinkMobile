import { 
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { Color, FontFamily, FontSize, Border } from "../assets/edit_profile/GlobalStyles";
import { useState } from "react";


const EditProfileTextInput = ({label, value, valueSetter, isPassword, keyboard}) => {
    const [shown, setShown] = useState(false)
    const hideIcon = require("../assets/edit_profile/hide.png")
    const showIcon = require("../assets/sign_up/clarity_eye-solid.png")

    const toggleShown = () => {
        setShown(!shown)
    }
    return (
        <View style = {[styles.mainContainer]}>
            <Text style = {[styles.labelText]}>
                {capitalizeFirstLetter(label)}
            </Text>
            <View style ={[styles.textInputContainer]}>
                <TextInput
                keyboardType={keyboard}
                secureTextEntry ={!shown}
                style ={isPassword?[styles.texInputPassword, styles.textInputFontStyle]: [styles.textInput, styles.textInputFontStyle]}>
                </TextInput>
                {isPassword?
                <TouchableOpacity style ={[styles.imageContainer]}
                onPress={toggleShown}
                >
                    <Image
                    style ={[styles.hideIcon]}
                    resizeMode="cover"
                    source = {!shown? showIcon: hideIcon}
                />
                </TouchableOpacity>
                : <></>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1
    },
    mainContainer:{
        width: '90%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    labelText:{
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
        fontWeight: "700",
    },
    textInputContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: Color.colorWhitesmoke,
        borderRadius: Border.br_3xl,
        width: '100%',
        height: 'auto'
    },
    hideIcon:{
        width: 20,
        height: 20,
    },
    texInputPassword:{
        width: '80%'
    },
    textInput:{
        width: '90%'
    },
    imageContainer:{
        width: '10%'
    },
    textInputFontStyle:{
        color: Color.colorGray_100,
        fontFamily: FontFamily.interRegular,
    }
})

export default EditProfileTextInput