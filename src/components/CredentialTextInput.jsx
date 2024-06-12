import { StyleSheet, View, Image, Text, TextInput,  } from "react-native"
import { FontFamily, Color, Border, FontSize } from "../assets/sign_up/GlobalStyles";
const CredentialInputTextBox = ({imageAsset, name, setValue, isError, errorMessage, value, isEmail}) => {
    const normalTextFieldStyle = [styles.credentialBoxContainer]
    const errorTextFieldStyle = [styles.credentialBoxContainer, styles.errorBorder]
    return (
        <View style = {[styles.textInputContainer]}>
            <View style = {isError? errorTextFieldStyle: normalTextFieldStyle}>
                <View style = {[styles.credentialBoxStyle]}>
                    <Image
                    style = {[styles.sideImage]}
                    resizeMode="cover" 
                    source={imageAsset}/>
                    <TextInput
                    style={[styles.credentialBoxTextInput]}
                    placeholder={name}
                    placeholderTextColor="#424856"
                    secureTextEntry={false}
                    value={value}
                    onChangeText={text => {setValue(text)}}
                    keyboardType= {isEmail? "email-address": 'default'}
                    />
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
        justifyContent: 'center'
    },
    sideImage:{
        width: 25,
        height: 25,
        marginRight: 5
    },
    credentialBoxTextInput:{
        width: '90%',
        color: "#424856"
    },
    passwordCredentialTextInput:{
        width: '80%'
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

export default CredentialInputTextBox;