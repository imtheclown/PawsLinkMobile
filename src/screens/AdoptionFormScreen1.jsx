import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import { useEffect, useState } from "react";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormButton from "../components/FormButton";
import FormTextInput from "../components/FormTextInput";
import CheckBox from "@react-native-community/checkbox";
import { 
    AdoptionRequestProvider, 
    useAdoptionRequestObject, 
    useAdoptionRequestRealm, 
    useAdoptionRequestQuery,
    SavedUserProvider,
    useSavedUserObject,
    useSavedUserQuery,
    useSavedUserRealm
} from "../context/RealmContext";
import AdoptionFormSchema from "../database/schemas/AdoptionRequest";
import { SavedUser } from "../database/schemas/SavedUser";
const AdoptionFormScreen1 = ({route, navigation}) => {
    return(
        <SavedUserProvider>
            <AdoptionRequestProvider>
                <AdoptionFormScreen route={route} navigation={navigation}/>
            </AdoptionRequestProvider>
        </SavedUserProvider>
    )
}

const AdoptionFormScreen = ({route, navigation}) =>{
    console.log("top")
    const adoptionRequestData = useAdoptionRequestQuery(AdoptionFormSchema);
    const registeredUser = useSavedUserQuery(SavedUser)
    console.log("bot")
    const [fname, setFirstName] = useState("")
    const [lname, setLastName] = useState("")
    const [age, setAge] = useState("0")
    const [isStudent, setIsStudent] = useState(true)
    const [contactNumber, setContactNumber] = useState("")
    const [emailAdd, setEmailAdd] = useState("")
    const [faceBookLink, setFacebookLink] = useState("")
    const [completeHomeAddress, setCompleteHomeAdd] = useState("")
    const [currentHomeAddress, setCurrentHomeAdd] = useState("")

    useEffect(() =>{
        if(adoptionRequestData.length){
            const savedData = adoptionRequestData[0];
            console.log(savedData);
            setFirstName(savedData.fname);
            setLastName(savedData.lname);
            setAge(savedData.age);
            setIsStudent(savedData.isStudent);
            setContactNumber(savedData.contactNumber);;
            setFacebookLink(savedData.faceBookLink);
            setCompleteHomeAdd(savedData.completeHomeAddress);
            setCurrentHomeAdd(savedData.currentHomeAddress);
        };
        if(registeredUser.length){
            setEmailAdd(registeredUser[0].email);
        }
    })
    const generateCurrentFormDataObject = () =>{
        var data = {};
        if(adoptionRequestData.length > 0 ){
            data = adoptionRequestData[0];
        }
        data["fname"] = fname;
        data["lname"] = lname;
        data["age"] = age;
        data["isStudent"] = isStudent;
        data["contactNumber"] = contactNumber;
        data["emailAdd"] = emailAdd;
        data["faceBookLink"] = faceBookLink;
        data["completeHomeAddress"] = completeHomeAddress;
        data["currentHomeAddress"] = currentHomeAddress;
        data["animalId"] = route.params.animalId;
        data["userEmail"] = registeredUser[0].email
        return data
    }
    const gotoNext = () =>{
        // generate params here
        const naviParams = generateCurrentFormDataObject()
        navigation.navigate(
            {name: 'Adoption Form 2',
            params: naviParams
            });
    }

    const returnToPrevious = () =>{
        navigation.goBack();
    }
    const updateAge = (newAge) =>{
        setAge(newAge);
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
                <FormTextInput title={'first name'}
                value={fname}
                valueSetter={setFirstName}
                />
                <FormTextInput title={'last name'}
                value={lname}
                valueSetter={setLastName}
                />
                <View style={[styles.ageStudentContainer]}>
                    {/* age */}
                    <View style = {[styles.ageContainer]}>
                        <Text style={[styles.ageText]}>age</Text>
                        <TextInput
                            value={age}
                            onChangeText={newAge =>{
                                updateAge(newAge);
                            }}
                            style={[styles.ageInputText]}
                            placeholder="Input number"
                            keyboardType="number-pad"
                            placeholderTextColor="#bdc1ca"
                        />
                    </View>
                    {/* checkboxes */}
                    <View style = {[styles.studentContainer]}>
                        {/* title */}
                        <Text style = {[styles.studentText]}>student</Text>
                        {/* checkboxes */}
                        <View style = {[styles.checkBoxContainer]}>
                            <View style = {[styles.indivCheckBoxContainer]}>
                                <CheckBox
                                tintColors={{true: Color.colorPalevioletred}}
                                onValueChange={() =>{
                                    setIsStudent(true)
                                }}
                                value = {isStudent}/>
                                <Text style = {[styles.checkBoxLabel]}>yes</Text>
                            </View>
                            <View style = {[styles.indivCheckBoxContainer]}>
                                <CheckBox
                                    tintColors={{true: Color.colorPalevioletred}}
                                    onValueChange={() =>{
                                        setIsStudent(false)
                                    }}
                                    value ={!isStudent}
                                />
                                <Text style = {styles.checkBoxLabel}>no</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FormTextInput title={'contact number'}
                value={contactNumber}
                valueSetter={setContactNumber}
                />
                <FormTextInput title={'email address'}
                value={emailAdd}
                valueSetter={setEmailAdd}
                />
                <FormTextInput title={'facebook link'}
                value={faceBookLink}
                valueSetter={setFacebookLink}
                />
                <FormTextInput title={'complete home address'}
                value={completeHomeAddress}
                valueSetter={setCompleteHomeAdd}
                />
                <FormTextInput title={'complete current address'}
                value={currentHomeAddress}
                valueSetter={setCurrentHomeAdd}
                />
                <FormButton
                    eventHandler={gotoNext}
                    textlabel={"next"}
                    styleButton={styles.nextButton}
                    styleText={styles.nextText}
                />
                <FormButton
                    eventHandler={returnToPrevious}
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
    ageStudentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Color.colorGray_200,
        width: '100%',
        height: 80,
    },
    ageContainer:{
        width: '50%',
        height: '100%'
    },
    ageText:{
        lineHeight: 22,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
        textAlign: "left",
    },
    ageInputText:{
        color: 'black',
        borderRadius: Border.br_9xs,
        backgroundColor: Color.colorWhite,
        borderStyle: "solid",
        borderColor: Color.colorLightslategray,
        borderWidth: 1,
        fontFamily: FontFamily.interRegular,
    },
    studentContainer: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    studentText:{
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
    },
    checkBoxContainer:{
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
        indivCheckBoxContainer:{
        width: '50%',
        height: '100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    checkBoxLabel:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        color: Color.colorGray_100,
    },
})

export default AdoptionFormScreen1