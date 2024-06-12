import { KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    Image, 
    View, 
    Text,
    TouchableOpacity,
    Pressable,
    Keyboard
 } from "react-native";
import { useState } from "react";
import { AppProvider, UserProvider, useRealm } from "@realm/react";

import CredentialInputTextBox from "../components/CredentialTextInput";
import PasswordInputField from "../components/PasswordInputField";
import { FontSize, FontFamily, Color } from "../assets/sign_in/GlobalStyles";
import { APP_ID } from "../database/RealmConfig";
import { useEmailPasswordAuth, AuthOperationName } from "@realm/react";

import axios from "axios";
import { localMachineIPAddress, apiStartString, port } from "../utils/networkConf";
import LoadingModal from "../components/LoadingModal";
import { useEffect } from "react";


const SignInScreen = () =>{
    const navigation = useNavigation()
    const realm = useRealm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const {logIn, result} = useEmailPasswordAuth();

    useEffect(()=>{
        if(result.success){
            navigation.navigate("Home")
        }
    },[result])
    // find accounts in registered email
    const findEmail =  async () => {
        const result = await axios.get(`http://${localMachineIPAddress}:${port}/${apiStartString}/findUser?email=${email}`)
        .then(result => {
            return result.data
        }).catch(err =>{
            console.log(err)
            return null
        })
        return result
    }
    

    const onPressLogin = async() =>{
        Keyboard.dismiss();
        setIsLoading(true)
        if(email.length && password.length){
            await findEmail()
            .then(result => {
                console.log(result);
                setErrorMessage("");
                if(result && result.data){
                    const data =result.data;
                    if(data.length){
                        // check password
                        const instance = data[0]
                        const resultPass = instance.realmPassword
                        if(resultPass === password){
                            // realm login
                            logIn({
                                email,
                                password
                            })
                            realm.write(() =>{

                                realm.create(SavedUser,{
                                    username: instance.userName,
                                    email: instance.email,
                                    appPassword: instance.appPassword,
                                    realmPassword: instance.realmPassword,
                                    remembered: true
                                },'modified');
                            });
                            return
                        }else{
                            setErrorMessage("email or password is incorrect")
                        }
                    }else{
                        setErrorMessage("email does not exist, create an account")
                    }
                }else{
                    throw new Error
                }
            })
            .catch(err =>{
                console.log(err)
                setErrorMessage("something went wrong")
            })
        }else{
            if(!(email.length)){
                setEmailError("required")
            }
            if(!(password.length)){
                setPassError("required")
            }
        }
        setIsLoading(false)

    }
    return(
        <SafeAreaView style = {[styles.flexContainer]}>
        <KeyboardAvoidingView style = {[styles.flexContainer]}>
            {/* Top view */}
            <View style = {[styles.flexContainer, styles.topContainer]}>
                <Image 
                style = {[styles.pawsLinkLogo]}
                resizeMode="cover"
                source={require('../assets/logo/pawslink_round.png')}/>
                <Text style = {[styles.welcomeBackText]}>
                welcome back
                </Text>
            </View>
            {/* mid view */}
            <View style = {[styles.flexContainer, styles.midView]}>
                <CredentialInputTextBox 
                errorMessage = {errorMessage.length ? errorMessage: ""}
                name={"email"}
                imageAsset={require('../assets/sign_up/user.png')}
                value={email}
                setValue={setEmail}
                isError={emailError.length? true: false}
                isEmail={true}/>
                <PasswordInputField
                name={"password"}
                imageAsset={require("../assets/sign_up/password.png")}
                value={password}
                setValue={setPassword}
                isError={passError.length? true: false}
                errorMessage={passError.length? passError: ""}
                />
                <TouchableOpacity style = {[styles.logInButton]}
                    onPress={onPressLogin}
                >
                    <Text style={[styles.loginText]}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[styles.forgotPassText]}>
                        forgot password?
                    </Text>
                </TouchableOpacity>
                
            </View>

            {/* bottom view */}
            <View style = {[styles.flexContainer, styles.bottomView]}>
                <View style = {[styles.bottomSubContainer]}>
                    <View>
                        <Text style = {[styles.errorMessageText]}>{errorMessage.length? errorMessage: ""}</Text>
                    </View>
                    <TouchableOpacity>
                    <Text style = {[styles.dontHaveAccountText]}>dont have an account? sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style = {[styles.bottomSubContainer]}>
                    <Text style={[styles.inPartnerShipText]}>
                            in partnership with
                    </Text>
                    <View style = {[styles.bottomLogoContainer]}>
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/upv_logo.png")}
                        />
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/pahinungod_round.png")}
                        />
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/project_pawradise_round.png")}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
        <LoadingModal isLoading={isLoading}/>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer : {
        flex: 1
    },
    topContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    pawsLinkLogo: {
        width: 136,
        height: 136,
    },
    welcomeBackText: {
        fontSize: 42,
        lineHeight: 60,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        fontWeight: 700
    },
    midView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logInButton: {
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 31,
        backgroundColor: "#9032ab",
        height: 61,
        width: 337,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    loginText:{
        fontSize: 18,
        lineHeight: 28,
        fontFamily: FontFamily.interBold,
        color: "#fff",
        fontWeight: 700
    },
    forgotPassText: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular,
        color: Color.colorPlum,
        lineHeight: 24
    },

    bottomView :{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomSubContainer:{
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomLogoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bottomLogo:{
        marginHorizontal: 10,
        height: 75,
        width: 75,
    },
    dontHaveAccountText : {
        textDecorationLine: "underline",
        color: "#424856",
        lineHeight: 24,
        textAlign: "left",
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular
    },
    inPartnerShipText: {
        fontSize: 12,
        fontStyle: "italic",
        fontFamily: FontFamily.interLight,
        color: Color.colorPlum,
        lineHeight: 24
    },
    errorMessageText:{
        color: "red",
        lineHeight: 21,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        fontFamily: FontFamily.interRegular
    }
})

import { RealmProvider } from "@realm/react";
import { SavedUser } from "../database/schemas/SavedUser";
import { useNavigation } from "@react-navigation/native";

const WrappedLoginScreen = () =>{
    return(
        <RealmProvider
            schema={[SavedUser]}
            path="SavedUser.realm"
        >
            <SignInScreen/>
        </RealmProvider>
    )
}

export default WrappedLoginScreen