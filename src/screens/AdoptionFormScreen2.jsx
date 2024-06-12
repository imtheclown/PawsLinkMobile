import { View,
    StyleSheet,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormButton from "../components/FormButton";
import FormTextInput from "../components/FormTextInput";
import { useCallback, useState } from "react";
import AddMinusButton from "../components/AddMinusButton";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";
import { splitByDash } from "../utils/TextBasedUtilityFunctions";

const AdoptionFormScreen2 = ({route, navigation}) =>{
    const data = route.params
    const [noOfPets, setCurrentPets] = useState(data.noOfPets ||"0")
    const [yearsOfBeingPetOwner, setPetOwnershipDuration] = useState(data.yearsOfBeingPetOwner ||"0");
    const [ageOfOldestLivingPet, setOldestLivingPetAge] = useState(data.ageOfOldestLivingPet || "0");
    const [neuterOrSpayAwareness, setSterilizationAwareness] = useState(data.neuterOrSpayAwareness || "");
    const [neuterOrSpayWillingness, setWillToSterilize] = useState(data.neuterOrSpayWillingness ||false);
    const [regularVetClinic, setVetClinic] = useState(data.regularVetClinic || "")

    const generateRouteParams = () =>{
        data["noOfPets"] = noOfPets;
        data["yearsOfBeingPetOwner"] = yearsOfBeingPetOwner;
        data["ageOfOldestLivingPet"] = ageOfOldestLivingPet;
        data["neuterOrSpayAwareness"] = neuterOrSpayAwareness;
        data["neuterOrSpayWillingness"] = neuterOrSpayWillingness;
        data["regularVetClinic"] = regularVetClinic
        return data;
    }

    const goToNext = () =>{
        const naviParams = generateRouteParams()
        navigation.navigate({
            name: 'Adoption Form 3',
            params: naviParams
        })
    }
    const goToPreviousPage = () =>{
        navigation.goBack();
    }
    return (
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            {/* contentcontainer */}
            <View style = {[styles.header, styles.centeredContainer]}>
                <Text style = {[styles.headerText]}>
                    {capitalizeFirstLetter("pet history")}
                </Text>
            </View>
                {/* form */}
            <View style = {[styles.formContainer, styles.centeredContainer]}>
                <ScrollView style = {[styles.scrollViewContainer]}>
                    {/* text */}
                    {/* this is present on all of the pages */}
                            {/* add minus button */}
                    <AddMinusButton 
                    value={noOfPets}
                    valueSetter={setCurrentPets}
                    title={capitalizeFirstLetter("do you have pets right now? If yes, how many?")}
                    />

                    <FormTextInput
                    title={capitalizeFirstLetter("how long have you been a pet owner?")}
                    value={yearsOfBeingPetOwner}
                    valueSetter={setPetOwnershipDuration}
                    />
                    <AddMinusButton 
                    value={ageOfOldestLivingPet}
                    valueSetter={setOldestLivingPetAge} 
                    title={capitalizeFirstLetter('how old is your oldest living pet?')}
                    />
                    <RadioButton 
                        valueSetter={setSterilizationAwareness}
                        title={"are you aware of neutering and spaying?"}
                        selectionList={[
                            {id: 1, label:capitalizeFirstLetter(splitByDash("yes_for_both")), value:"yes_for_both"},
                            {id: 2, label:capitalizeFirstLetter(splitByDash("yes_for_neuter_only")), value: "yes_for_neuter_only"},
                            {id: 3, label:capitalizeFirstLetter(splitByDash("yes_for_spaying_only")), value: "yes_for_spaying_only"},
                            {id: 4, label:capitalizeFirstLetter(splitByDash("no_for_both")), value:"no_for_both"}
                        ]}
                    />
                    <RadioButton
                        valueSetter={setWillToSterilize}
                        title={'are you willing to neuter/spay your adopted dog/cat from us?'}
                        selectionList={
                            [
                                {id:1, label: "no", value: 'no'},
                                {id:2, label: "yes", value: 'yes'},
                            ]
                        }
                    />
                    <FormTextInput 
                    value={regularVetClinic}
                    valueSetter={setVetClinic}
                    title={"regular vet clinic"}
                    />
                    <FormButton
                        eventHandler={goToNext}
                        textlabel={"next"}
                        styleButton={styles.nextButton}
                        styleText={styles.nextText}
                    />
                    <FormButton
                        eventHandler={goToPreviousPage}
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

export default AdoptionFormScreen2