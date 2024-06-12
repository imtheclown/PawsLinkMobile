import { View,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormButton from "../components/FormButton";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormTextInput from "../components/FormTextInput";
import CheckBox from '@react-native-community/checkbox';
import { useCallback, useState } from "react";

const AdoptionForm1 = ({}) =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("0")
    const [isStudent, setIsStudent] = useState(true)
    const [contactNumber, setContactNumber] = useState("")
    const [emailAdd, setEmailAdd] = useState("")
    const [faceBookLink, setFacebookLink] = useState("")
    const [completeHomeAddress, setCompleteHomeAdd] = useState("")
    const [currentHomeAddress, setCurrentHomeAdd] = useState("")
    return (
        <>
        <FormTextInput title={'first name'}
        value={firstName}
        valueSetter={setFirstName}
        />
        <FormTextInput title={'last name'}
        value={lastName}
        valueSetter={setLastName}
        />
        <View style={[styles.ageStudentContainer]}>
            {/* age */}
            <View style = {[styles.ageContainer]}>
                <Text style={[styles.ageText]}>age</Text>
                <TextInput
                    value={age}
                    onChange={newAge => {
                        setAge(newAge)
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
                        onValueChange={() =>{
                            setIsStudent(true)
                        }}
                        value = {isStudent}/>
                        <Text style = {[styles.checkBoxLabel]}>yes</Text>
                    </View>
                    <View style = {[styles.indivCheckBoxContainer]}>
                        <CheckBox
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
    </>
    )
}

const styles = StyleSheet.create({
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

export default AdoptionForm1