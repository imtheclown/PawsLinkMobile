import { StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import { FontFamily, Color, Border, FontSize } from "../assets/sign_up/GlobalStyles";
import { useState } from "react";
const PasswordInputField = ({imageAsset, name, setValue, isError, errorMessage, value}) =>{
    const [isHidden, setIsHidden] = useState(true)
    const normalTextFieldStyle = [styles.credentialBoxContainer]
    const errorTextFieldStyle = [styles.credentialBoxContainer, styles.errorBorder]
    const hideCharIcon = require("../assets/sign_up/clarity_eye-hide-solid.png")
    const showCharIcon = require("../assets/sign_up/clarity_eye-solid.png")
    return(
        <View style = {[styles.textInputContainer]}>
            <View style = {isError? errorTextFieldStyle: normalTextFieldStyle}>
                <View style = {[styles.credentialBoxStyle]}>
                    <Image
                    style = {[styles.sideImage]}
                    resizeMode="cover" 
                    source={imageAsset}/>
                    <TextInput
                    style={[styles.passwordCredentialTextInput]}
                    placeholder={name}
                    placeholderTextColor="#424856"
                    secureTextEntry={isHidden}
                    value={value}
                    onChangeText={text => {setValue(text)}}
                    />
                    <Pressable
                    onPress={()=>{setIsHidden(!isHidden)}}>
                        <Image
                        style= {[styles.sideImage]}
                        resizeMode="cover"
                        source={isHidden? showCharIcon: hideCharIcon}/>
                    </Pressable>
                </View>
            </View>
            <View>
                {isError?<Text style={[styles.errorText]}>{errorMessage}</Text>: <></> }
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer:{
        flexDirection: 'column',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // height: 100,
        margin:5,
        overflow: 'hidden'
    },
    credentialBoxContainer: {
        fontFamily: FontFamily.interRegular,
        width: '100%',
        height: 66,
        backgroundColor: Color.colorLavender,
        borderRadius: Border.br_14xl,
        fontSize: FontSize.size_base,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    credentialBoxStyle:{
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#424856"
    },
    sideImage:{
        width: 25,
        height: 25,
        marginRight: 5
    },
    passwordCredentialTextInput:{
        width: '80%',
        color: "#424856"
    },
    errorText:{
        color: Color.colorRed,
        lineHeight: 21,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        fontFamily: FontFamily.interRegular
    },
    errorBorder:{
        borderWidth: 1,
        borderColor: 'red'
    }

})

export default PasswordInputField;