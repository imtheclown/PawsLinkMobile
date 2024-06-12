import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from "react-native";

import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormButton from "../components/FormButton";
import { useState } from "react";
import FormTextInput from "../components/FormTextInput";
import { capitalizeFirstLetter, splitByDash } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";

const AdoptionFormScreen4 = ({route, navigation}) => {
    const data = route.params;
    const [basicNecessities, setBasicNecessities] = useState("")
    const [ enrichmentActivity, setEnrichmentAct] = useState("")
    const [hearAboutUs, setAwarenessSource] = useState("")

    const generateRouteParam = () =>{
        data["basicNecessities"] = basicNecessities;
        data["enrichmentActivity"] = enrichmentActivity;
        data['hearAboutUs'] = hearAboutUs;
        return data;
    }
    const goToNext = () => {
        const naviParams = generateRouteParam()
        navigation.navigate({
            name:"ID Verification",
            params: naviParams
        })
    }
    const returnToPreviousPage = () =>{
        navigation.goBack()
    }
    return (
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            {/* contentcontainer */}
            <View style = {[styles.header, styles.centeredContainer]}>
                <Text style = {[styles.headerText]}>
                    {capitalizeFirstLetter("other questions")}
                </Text>
            </View>
                {/* form */}
            <View style = {[styles.formContainer, styles.centeredContainer]}>
                <ScrollView style = {[styles.scrollViewContainer]}>
                    <FormTextInput
                    value={basicNecessities}
                    valueSetter={setBasicNecessities}
                    title={"name five (5) basic necessities for dogs/cats?"}
                        numLines={5}
                    />
                    <FormTextInput
                        value={enrichmentActivity}
                        valueSetter={setEnrichmentAct}
                        title={"name one (1) enrichment activity for dog/cat?"}
                    />
                    <RadioButton
                        valueSetter={setAwarenessSource}
                        title={"how did you hear about us?"}
                        selectionList={[
                            {id: 1, label: capitalizeFirstLetter(splitByDash("social_media")), value: "social_media"},
                            {id: 2, label: capitalizeFirstLetter(splitByDash("Friends/Acquaintances/Family")), value: "Friends/Acquaintances/Family"},
                            {id: 3, label: capitalizeFirstLetter(splitByDash("classmates")), value: "classmates"},
                            {id: 4, label: capitalizeFirstLetter(splitByDash("posters")), value: "posters"},
                        ]}
                    />
                    <FormButton
                        eventHandler={goToNext}
                        textlabel={"next"}
                        styleButton={styles.nextButton}
                        styleText={styles.nextText}
                    />
                    <FormButton
                        eventHandler={returnToPreviousPage}
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

})

export default AdoptionFormScreen4