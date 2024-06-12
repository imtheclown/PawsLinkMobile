import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { FontSize, Color, FontFamily, Border } from "../assets/monthly_updates/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import FormButton from "../components/FormButton";
import { pickImage } from "../utils/FileBasedUtils";

const MonthlyUpdateScreen = ({route, navigation}) =>{
    const attach = `attach file`;
    const supportedType = `supported format: PNG, JPG`;
    const [checked, setChecked] = useState(false)
    const [imageUri, setImageUri] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageType, setImageType] = useState("");
    const [content, setContent] = useState("")
    const toggleCheck = () => {
        setChecked(!checked);
    }

    const onPressSelectImage =async () =>{
        const {
            name, 
            uri,
            type
        } = await pickImage();
        setImageUri(uri);
        setImageName(name);
        setImageType(type);
    }

    const checkFieldValidity = () => {
        if(content.length && imageName.length &&checked){
            gotoHome();
        }else{
            return(
                Alert.alert('Failed to Proceed', 'Please complete the form', [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ])
            )
        }
    }

    const gotoHome = () => {
        navigation.navigate("Home");
    }

    const updateContent = (newValue) => {
        setContent(newValue);
    }

    const disselectImage = () =>{
        setImageName("");
        setImageType("");
        setImageUri("");
    }
    return(
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            <View style = {[styles.headerTextContainer, styles.centerContainer]}>
                <Text style = {[styles.monthlyUpdateText]}>
                    {capitalizeFirstLetter(`monthly update`)}
                </Text>
            </View>
            <View style = {[styles.textInputContainer, styles.centerContainer]}>
                <Text style = {[styles.textInputTitle]}>
                    {capitalizeFirstLetter(`please provide a short update`)}
                </Text>
                <TextInput
                multiline = {true}
                numberOfLines={6}
                textAlignVertical="top"
                placeholder="Enter answer here..."
                placeholderTextColor="#bdc1ca"
                style = {
                    [styles.textInput]
                }
                value={content}
                onChangeText={updateContent}
                />
            </View>
            <View style = {[styles.textInputContainer, styles.photoUpdateContainer, styles.centerContainer]}>
                <View style = {[styles.updateHeaderContainer]}>
                    <Text style ={[styles.updatePhotoText]}>
                        {capitalizeFirstLetter(`photo update`)}
                    </Text>
                    <TouchableOpacity
                    onPress={disselectImage}
                    style = {[styles.removePickImageButton,styles.centerContainer]}
                    >
                        <Image
                            resizeMode="cover"
                            source={require("../assets/monthly_updates/e-remove-2.png")}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {[styles.selectImageButton, styles.centerContainer]}
                    onPress={onPressSelectImage}
                >
                    <Text 
                    style ={[styles.attachFileText]}>
                        {imageName.length?capitalizeFirstLetter(imageName):capitalizeFirstLetter(attach)}
                    </Text>
                    <Text
                    style ={[styles.supportedFormatText]}
                    >
                        {imageType.length?capitalizeFirstLetter(imageType):capitalizeFirstLetter(supportedType)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style ={[styles.checkBoxContainer, styles.centerContainer]}>
                <View style = {[styles.checkBoxContentContainer]}>
                <CheckBox
                    onValueChange={toggleCheck}
                    value ={checked}
                    tintColors={{true: Color.colorPalevioletred}}
                    />
                    <Text style = {[styles.agreementText]}>{`I understand that this process is to ensure the health and well-being of my pet animal.`}
                    </Text>
                </View>
            </View>
            <FormButton
            textlabel={'submit'}
            styleButton={styles.submitButtonStyle}
            styleText={styles.buttonTextStyle}
            eventHandler={checkFieldValidity}
            />
            {/*  */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    monthlyUpdateText:{
        fontSize: 25,
        color: "#774a7f",
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textAlign: "left",
        lineHeight: 28,
    },
    headerTextContainer:{
        height: '10%',
        width: '100%'
    },
    textInputContainer:{
        width: '90%',
        height: 'auto',
    },
    textInputTitle:{
        color: "#a778c2",
        lineHeight: 22,
        textAlign: "left",
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        fontSize: FontSize.size_sm,
        alignSelf: 'flex-start'
        
    },
    textInput:{
        borderColor: "#9095a0",
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        width: '100%',
        borderWidth: 1,
        borderStyle: "solid",
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_11xs,
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        backgroundColor: Color.colorWhite,
        color: "black",
        marginBottom:10
    },
    photoUpdateContainer:{
        borderRadius: Border.br_7xs,
        width: '90%',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        height: 'auto',
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        backgroundColor: Color.colorWhite,
    },
    updateHeaderContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 'auto',
        alignItems: 'center'
    },
    removePickImageButton:{
        width: 20,
        height: 20,
        marginVertical: 20
    },
    updatePhotoText:{
        color: Color.colorGray_100,
        textAlign: "left",
        fontFamily: FontFamily.epilogueRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
    },
    selectImageButton:{
        width: '90%',
        height: 'auto',
        backgroundColor: "#fafafb",
        borderStyle: "dashed",
        borderColor: "#bdc1ca",
        borderWidth: 2,
        borderRadius: Border.br_7xs,
        marginBottom: 20
    },
    attachFileText:{
        color: Color.colorGray_100,
        fontFamily: FontFamily.epilogueRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
    },
    supportedFormatText:{
        height: 26,
        lineHeight: 22,
        fontSize: FontSize.size_sm,    color: Color.colorSlategray,
        fontFamily: FontFamily.interRegular,
    },
    checkBoxContainer:{
        marginVertical: 10,
        width: '90%',
        height: 'auto',
        borderRadius: Border.br_9xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, .12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    checkBoxContentContainer:{
        width: '90%',
        height: 'auto',
        marginVertical: 10,
        flexDirection: 'row'
    },
    agreementText:{
        width: '90%',
        fontSize: 12,
        lineHeight: 20,
        color: Color.colorGray_100,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
    },
    submitButtonStyle:{
        backgroundColor: Color.colorPalevioletred,
        width: '90%'
    },
    buttonTextStyle:{
        color: Color.colorWhite,
        fontFamily: FontFamily.interRegular,
    }

})

export default MonthlyUpdateScreen