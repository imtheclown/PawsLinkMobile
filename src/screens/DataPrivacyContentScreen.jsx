 import {
    View, 
    Text, 
    Pressable, 
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/consent_form/GlobalStyles"
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import FormButton from "../components/FormButton";
import CheckBox from "@react-native-community/checkbox";
import { useState } from "react";
import axios from "axios";
import { localMachineIPAddress, port, apiStartString } from "../utils/networkConf";
import LoadingModal from "../components/LoadingModal";
const DataPrivacyContentScreen = ({route, navigation}) =>{
    const [isLoading, setIsLoading] = useState(false);
    // perform write operation
    const data = route.params;
    const [agree, setAgree] = useState(false)

    const gotoThanks = () =>{
        navigation.navigate("Thank You For Adoption");
    }

    const goBack = () =>{
        navigation.goBack()
    }

    const generateFormData = () =>{
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        return formData
    }
    const createAdoptionRequest = async() =>{
        setIsLoading(true)
        const formData = generateFormData();
        await axios.post(
            `http://${localMachineIPAddress}:${port}/api/addAdoptionForm`,
            formData,
            {
                headers:{
                    Accept: 'Application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(
            result=>{
                setIsLoading(false);
                gotoThanks();
            }
        ).catch(err =>{
            setIsLoading(false);
            console.log(err.message)
        })
    }
    return(
        <SafeAreaView style ={[styles.flexContainer, styles.mainContainer]}>
            <LoadingModal isLoading={isLoading}/>
            <View style ={[styles.contentContainer]}>
                <Text style ={[styles.titleText]}>
                    {capitalizeFirstLetter(`data privacy consent`)}
                </Text>
                <Text style={[styles.contentText]}>
                    {capitalizeFirstLetter(`By signifying your consent here and by submitting this form, you are allowing Project PAWradise to use, access, and store the information provided for communication, and collaborations for future activities and initiatives.`)}
                </Text>
                <Text style={[styles.contentText]}>
                    {capitalizeFirstLetter(`In accordance with Republic Act 10173, also known as the "Data Privacy Act of 2012," the organization shall maintain the confidentiality of the information you submitted and used it for the purpose of developing a database of our adopters.`)}
                </Text>
                {/* checkbox container */}
                <View style ={[styles.checkBoxContainer]}>
                    <CheckBox
                    tintColors={{true: Color.colorPalevioletred}}
                    value ={agree}
                    onValueChange={() =>{
                        setAgree(!agree)
                    }}
                    />
                    <Text style ={[styles.checkBoxText]}> I understand and agree to the privacy statement above.</Text>
                </View>
                <FormButton
                eventHandler={createAdoptionRequest}
                disable={!agree}
                textlabel={capitalizeFirstLetter("continue")}
                styleButton={styles.continueButton}
                />
                <FormButton
                eventHandler={goBack}
                styleButton={styles.cancelButton}
                textlabel={capitalizeFirstLetter("cancel")}
                styleText={[styles.cancelButtonText]}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1
    },
    mainContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(18, 15, 40, 0.12)",
        shadowRadius: 6,
        elevation: 6,
        width: "100%",
        height: 920,
        overflow: "hidden",
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        backgroundColor: Color.colorWhite,
    },
    contentContainer:{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText :{
        fontSize: 25,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: "#774a7f",
        textAlign: "left",
        lineHeight: 28,
        marginBottom: 10
    },
    contentText :{
        fontSize: 16,
        lineHeight: 26,
        width: 318,
        color: Color.colorGray_100,
        fontFamily: FontFamily.interRegular,
        marginBottom: 10
    },
    checkBoxContainer:{
        width: '90%',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    checkBoxText:{
        textAlign: 'left',
        marginLeft: 5,
        width: '80%'
    },
    cancelButton:{
        borderColor: Color.colorPalevioletred,
        backgroundColor: Color.colorGray_200,
        borderWidth: 1,
        borderStyle: "solid",
    },
    continueButton:{
        backgroundColor: Color.colorPalevioletred
    },
    cancelButtonText:{
        color: Color.colorPalevioletred
    }

})

export default DataPrivacyContentScreen

