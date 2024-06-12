import { 
    Text, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    SafeAreaView,
    Image,
    Keyboard,
    Alert
} from "react-native";
import { Border, FontSize, FontFamily, Color } from "../assets/enter_code/GlobalStyles";
import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useEmailPasswordAuth, AuthOperationName, useRealm, useQuery} from "@realm/react";
import { localMachineIPAddress } from "../utils/networkConf";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
const EnterCodeScreen = ({route, navigation}) => {
    const savedUsers = useQuery(SavedUser);
    const realm = useRealm();
    const {register, result, logIn} = useEmailPasswordAuth()
    const {confirmationNumber, userObject} = route.params;
    const {email, userName, password} = userObject
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (result.success && result.operation === AuthOperationName.Register) {
          logIn({email, password})
          .them(() =>{
            navigation.navigate("Home");
          })
          .catch(() =>{
            navigation.navigate("Sign In")
          })
        }
    }, [result]);

    const setCodeValue = (value) =>{
        setCode(value)
    }
    const checkCode = async() =>{
        if(code.length <=6 && code.length !== 0){
            if(code === confirmationNumber){
                setIsLoading(true)
                await axios.post(`http://${localMachineIPAddress}:3030/api/signup`,{
                    userName,
                    email,
                    password
                });
                await realm.write(() =>{
                    for(const i = 0; i < savedUsers.length; i++){

                        savedUsers[i].remembered = false;
                    }
                }).catch(err => {
                    console.log(err)
                })
                await realm.write(() =>{
                    realm.create(SavedUser, {
                        remembered: true,
                        username: userName,
                        email,
                        appPassword: password,
                        realmPassword: password
                    })
                }).catch(err => {
                    console.log(err)
                })
                await register({
                    email,
                    password
                })
                .then(result => {
                    console.log(result);
                    return result;
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else{
                setIsLoading(false);
                return(
                    Alert.alert('INVALID CODE', 'please check email', [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ])
                )
            }
        }
    }
    const goBack = () =>{
        navigation.navigate("Home")
    }
    const removeKeyBoardFromView = () =>{
        Keyboard.dismiss()

    }
    return(
        <SafeAreaView style = {[styles.flexContainer, styles.centerContainer]}>
            <LoadingModal
            isLoading={isLoading}/>
            <TouchableWithoutFeedback onPress={removeKeyBoardFromView}>
                <View style = {[ styles.flexContainer,styles.contentContainer, styles.centerContainer]}>
                    <Text style = {[styles.labelText]}>
                        {capitalizeFirstLetter('enter the code we sent')}
                    </Text>
                    <TextInput
                        onChangeText={setCodeValue}
                        style = {[styles.textInputContainer]}
                        placeholder={capitalizeFirstLetter('enter code')}
                        placeholderTextColor="#bdc1ca"
                        value={code}
                        keyboardType="numeric"
                    />
                    <View style = {[styles.buttonContainer]}>
                        <TouchableOpacity
                        onPress={goBack}
                        style = {[styles.backButton, styles.button, styles.centerContainer]}>
                            <Text
                            style = {[styles.backText]}
                            >
                                {capitalizeFirstLetter('back')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.submitButton, styles.button, styles.centerContainer]}
                        onPress={checkCode}   
                        disabled = {code.length === 6? false: true}
                        >
                            <Text
                             style = {[styles.buttonText]}
                            >
                                {capitalizeFirstLetter('submit')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer:{
        width: '90%',
        height: 'auto',
    },
    labelText:{
        fontSize: 24,
        lineHeight: 60,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
    },
    textInputContainer:{
        flexDirection: 'row',
        width: '90%',
        height: 'auto',
        borderColor: "#9095a1",
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        borderRadius: Border.br_9xs,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        height: 'auto'
    },
    backButton:{
        borderColor: Color.colorPalevioletred,
        width: 56,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        height: 36,
        
    },
    button:{
        borderRadius: Border.br_9xs,
        marginVertical: 10,
        marginHorizontal: 5
    },
    submitButton:{
        height: 36,
        width: 56,
        backgroundColor: Color.colorPalevioletred,
    },
    backText:{
        color: Color.colorPalevioletred,
    },
    buttonText: {
        color: Color.colorWhite,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    }
})

import { RealmProvider } from "@realm/react";
import { SavedUser } from "../database/schemas/SavedUser";

const WrappedEnterCodeScreen = ({route, navigation}) =>{
    return (
        <RealmProvider
            schema={[SavedUser]}
            path="SavedUser.realm"
        >
            <EnterCodeScreen route ={route} navigation={navigation}/>
        </RealmProvider>
    )
}

export default WrappedEnterCodeScreen