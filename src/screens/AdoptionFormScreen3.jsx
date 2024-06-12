import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormTextInput from "../components/FormTextInput";
import { capitalizeFirstLetter, splitByDash } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";
import FormButton from "../components/FormButton";
import { useState } from "react";
const AdoptionFormScreen3 =({route, navigation}) =>{
    const data = route.params
    const [adoptedPetFutureAddress, setPlaceToKeep] = useState("")
    const [inDoorOrOutdoor, setLocationInfo] = useState("")
    const [leashOrCaged, setLeashingInfo] = useState("")
    const generateRouteParam = () => {
        data["adoptedPetFutureAddress"] = adoptedPetFutureAddress;
        data["inDoorOrOutdoor"] = inDoorOrOutdoor;
        data["leashOrCaged"] = leashOrCaged;

        return data;
    }
    const goToNext = () =>{
        const naviParams = generateRouteParam()
        navigation.navigate({
            name: "Adoption Form 4",
            params: naviParams
        })
    }
    const goToPreviousScreen = () =>{
        navigation.goBack();
    }
    return (
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            {/* contentcontainer */}
            <View style = {[styles.header, styles.centeredContainer]}>
                <Text style = {[styles.headerText]}>
                    {capitalizeFirstLetter("accommodations")}
                </Text>
            </View>
                {/* form */}
            <View style = {[styles.formContainer, styles.centeredContainer]}>
                <ScrollView style = {[styles.scrollViewContainer]}>
                    <FormTextInput
                    title={"where do you plan to keep the adopted dog/cat?"}
                    value={adoptedPetFutureAddress}
                    valueSetter={setPlaceToKeep}
                    />
                    <RadioButton
                    valueSetter={setLocationInfo}
                    title={"are you planning to keep them indoors only? Indoors with occasional outdoor time? or Strictly outdoor?"}
                    selectionList={[
                        {id: 1, label:capitalizeFirstLetter(splitByDash("indoors_only")), value:"indoors_only"},
                        {id: 2, label:capitalizeFirstLetter(splitByDash("indoors_with occasional_outdoor_time")), value:"indoors_with occasional_outdoor_time"},
                        {id: 3, label:capitalizeFirstLetter(splitByDash("strictly_outdoors")), value:"strictly_outdoors"}
                    ]}
                    />
                    <RadioButton
                    valueSetter={setLeashingInfo}
                    title={"will you keep them leashed or caged? or just when needed?"}
                    selectionList={[
                        {id: 1, label:capitalizeFirstLetter(splitByDash("leashed")), value:"leashed"},
                        {id: 2, label:capitalizeFirstLetter(splitByDash("caged")), value:"caged"},
                        {id: 3, label:capitalizeFirstLetter(splitByDash("leashed_and_caged")), value:"leashed_and_caged"},
                        {id: 4, label:capitalizeFirstLetter(splitByDash("only_when_needed")), value:"only_when_needed"}
                    ]}
                />
                    <FormButton
                        eventHandler={goToNext}
                        textlabel={"next"}
                        styleButton={styles.nextButton}
                        styleText={styles.nextText}
                    />
                    <FormButton
                        eventHandler={goToPreviousScreen}
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
        alignItems: 'center'
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
    // list of checkboxes
    // file picker
    
})

export default AdoptionFormScreen3