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
import AdoptionForm1 from "../components/AdoptionForm1";
import AdoptionForm2 from "../components/AdoptionForm2";
import AdoptionForm3 from "../components/AdoptionForm3";
import AdoptionForm4 from "../components/AdoptionForm4";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";


const AdoptionFormScreen = () =>{

    // header will just change in terms of name
    // scrollview forms will be the one to change per press of buttons
    // create states for this
    const show = false;
    const [formNumber, setFormNumber] = useState(1)

    const GoToNextForm = () =>{
        if(formNumber < 4){
            setFormNumber(formNumber + 1)
        }
    }
    const GoBackToPreviousForm = () =>{
        if(formNumber > 1){
            setFormNumber(formNumber -1)
        }
    }
    return(
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            {/* contentcontainer */}
            <View style = {[styles.header, styles.centeredContainer]}>
                <Text style = {[styles.headerText]}>verify for adoption</Text>
            </View>
                {/* form */}
            <View style = {[styles.formContainer, styles.centeredContainer]}>
                <ScrollView style = {[styles.scrollViewContainer]}>
                    {/* text */}
                    {/* this is present on all of the pages */}
                    <AdoptionForm1/>
                    <FormButton
                        eventHandler={GoToNextForm}
                        textlabel={"next"}
                        styleButton={styles.nextButton}
                        styleText={styles.nextText}
                    />
                    <FormButton
                        eventHandler={GoBackToPreviousForm}
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

export default AdoptionFormScreen