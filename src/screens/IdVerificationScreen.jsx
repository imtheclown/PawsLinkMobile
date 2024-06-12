import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";

import { Border, Color, FontFamily, FontSize } from "../assets/forms/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import FormButton from "../components/FormButton";
import { useState } from "react";
import { generate32BitHex } from "../utils/TextBasedUtilityFunctions";
import { localMachineIPAddress } from "../utils/networkConf";
import { pickImage } from "../utils/FileBasedUtils";
import axios from "axios";
import RNFS from "react-native-fs"
const IdVerificationScreen = ({route, navigation}) => {
    const data = route.params;
    const attachFile = "attach file";
    const availableFormat = "supported format: PNG, JPG";
    const [uri, setUri] = useState("");
    const [filename, setFilename] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const onPressPickDocument = async () =>{
        const {name, type, uri, size} = await pickImage()
        if(name ||type ||uri){
            setFilename(name);
            setType(type);
            setUri(uri);
        }
    }
    const deselectImage = () => {
        setUri("");
        setFilename("");
        setType("");
    }

    const goBack = () => {
        navigation.goBack();
    }

    const generateRouteParams = () => {
        if(uri.length){
            data["image"] = {
                uri,
                name: filename,
                type
            }
        }
    }
    const gotoDataPrivacy = () =>{
        generateRouteParams()
        navigation.navigate({
            name: "Data Privacy Consent",
            params: data
        });
    }
    return (
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
        {/* contentcontainer */}
        <View style = {[styles.header, styles.centeredContainer]}>
            <Text style = {[styles.headerText]}>verify for adoption</Text>
        </View>
            {/* form */}
        <View style = {[styles.formContainer, styles.centeredContainer]}>
            <ScrollView style = {[styles.scrollViewContainer]}>
                <View style = {[styles.filePickerContainer]}>
                    <View>
                        <Text style ={[styles.verificationText]}>
                        {`Please attach a copy of your ID for us to verify your identity.`}
                        </Text>
                    </View>
                    {/* selection */}
                    <View style ={[styles.idVerificationContentContainer]}>
                        {/* top view */}
                        <View style ={[styles.flexContainer, styles.idVerTopContainer]}>
                            <View style ={[styles.idVerTopContentContainer]}>
                                <Text style ={[styles.idVerTopContainerText]}>
                                id photo
                                </Text>
                                <TouchableOpacity onPress={deselectImage}>
                                    <Image
                                    style ={[styles.removeButton]}
                                    resizeMode="cover"
                                    source={require("../assets/id_verification/e-remove-2.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* mid view */}
                        <TouchableOpacity style ={[styles.flexContainer, styles.idVertMidContainer]}
                            onPress={onPressPickDocument}
                        >
                                <Text style ={[styles.idVerTopContainerText]}>
                                    {filename.length > 0 ? capitalizeFirstLetter(filename): capitalizeFirstLetter("attach file")}
                                </Text>
                                <Text style ={[styles.supportedFormatText]}>
                                    {type.length > 0? capitalizeFirstLetter(type): capitalizeFirstLetter("supported format: PNG, JPG")}
                                </Text>
                        </TouchableOpacity>
                        {/* bot view */}
                    </View>
                </View>
                <FormButton
                    eventHandler={gotoDataPrivacy}
                    textlabel={"next"}
                    styleButton={styles.nextButton}
                    styleText={styles.nextText}
                />
                <FormButton
                    eventHandler={goBack}
                    textlabel={"return to previous page"}
                    styleButton={styles.returnButton}
                    styleText={styles.returnText}
                />
            </ScrollView>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
    },
    centeredContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
    },
    mainContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header:{
        flex: 1,
        width: '100%'
    },
    formContainer:{
        flex: 9,
        width: '100%'
    },

    headerText:{
        textTransform: 'capitalize',
        fontSize: 25,
        lineHeight: 28,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslateblue,
        textAlign: "left",
    },
    scrollViewContainer:{
        width: '90%',
        height: '100%'
    },
    bottomContentContainer:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'column',
    },
    returnButton:
    {
        backgroundColor: Color.colorGray_200,
        borderColor: Color.colorPalevioletred,
        borderStyle: "solid",
        borderWidth: 1,
    },
    nextButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    returnText: {
        color: Color.colorPalevioletred,
    },
    nextText:{
        color: Color.colorWhite,
    },
    filePickerContainer:{
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    verificationText:{
        color: Color.colorGray_100,
        lineHeight: 26,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    },
    idVerificationContentContainer:{
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 230,
        borderRadius: Border.br_7xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    idVerTopContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '90%'
    },
    idVerTopContentContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    idVerTopContainerText:{
        fontFamily: FontFamily.epilogueRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        color: Color.colorGray_100,
        textAlign: "left",
    },
    removeButton:{
        width: 28,
        height: 28
    },
    idVertMidContainer:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '100%',
        backgroundColor: "#fafafb",
        borderStyle: "dashed",
        borderColor: "#bdc1ca",
        borderWidth: 2,
        borderRadius: Border.br_7xs,
    },
    supportedFormatText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorSlategray,
    },
    idVertBottomContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    idVertButton:{
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: Border.br_9xs,
        width: 82,
        height: 36,
    },
    idverUploadButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    idVerButtonText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
    },
    idVerUploadText:{
        color: Color.colorWhite,
    },
    idVerCancelText:{
        color: "#9095a1",
    }
})

export default IdVerificationScreen