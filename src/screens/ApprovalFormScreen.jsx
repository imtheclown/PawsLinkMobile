import DateTimePicker from 'react-native-ui-datepicker';
import { 
    Text, 
    StyleSheet, 
    TextInput, 
    View, 
    Pressable,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Alert
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { Color, FontSize, FontFamily, Border } from "../assets/approval_form/GlobalStyles";
import { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/TextBasedUtilityFunctions';
import { formatDate } from '../utils/DateBasedUtilityFunctions';
import FormButton from '../components/FormButton';
const ApprovalFormScreen = () =>{
    const [date, setDate] = useState(null)
    const [open, setOpen] = useState(false)

    const [updates, SetUpdates] = useState(false);
    const [care, setCare] = useState(false);
    const [aware, setAware] = useState(false);

    const startDate = new Date();
    const updateDate = (newDate) =>{
        setDate(newDate.date);
        console.log(date)
    }

    const closeDatePicker =() =>{
        setOpen(false)
    }
    const openDatePicker = () =>{
        setOpen(true)
    }

    const toggleUpdates = () =>{
        SetUpdates(!updates);
    }

    const toggleAware = () =>{
        setAware(!aware);
    }
    
    const toggleCare = () =>{
        setCare(!care);
    }

    const handleSubmit = () =>{
        if(date && updates && aware && care){
            // handle submit
        }else{
            return(
                Alert.alert('Failed to Proceed', 'Please complete the form', [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ])
            )
        }
    }
    return (
        <SafeAreaView
        style = {[styles.flexContainer, styles.mainContainer]}
        >
            <View style = {[styles.headerContainer, styles.centerContainer]}>
                <Text style = {[styles.headerText]}>
                    {capitalizeFirstLetter(`approval form`)}
                </Text>
            </View>
            <View style ={[styles.textInputContainer]}>
                <Text style = {[styles.textInputContainerFirstText]}>
                    {capitalizeFirstLetter(`please input new name of animal`)}
                </Text>
                <Text style = {[styles.textInputContainerSecondText]}>
                    {capitalizeFirstLetter(`put the name as is if it will remain unchanged`)}
                </Text>
                <View
                style = {[styles.textInputContentContainer, styles.centerContainer]}>
                    <TextInput 
                        style = {[styles.textInput]}
                        placeholder=""
                        placeholderTextColor="#bdc1ca">
                    </TextInput>
                </View>
            </View>
            {/* make a component out of this */}
            <View style = {styles.datePickerContainer}>
                <View>
                    <Text style = {[styles.datePickerTitle]}>
                        {capitalizeFirstLetter(`date adopted`)}
                    </Text>
                </View>
                <TouchableOpacity style ={[styles.updateDateButton, styles.centerContainer]}
                onPress={openDatePicker}
                >
                        <Text style ={[styles.dateButtonTextStyle]}>
                            {date?formatDate(date) : '-- -- --'}
                        </Text>
                </TouchableOpacity>
                <Modal
                visible ={open}
                animationType='slide'
                >
                    <View style ={[styles.datePickerContentContainer, styles.centerContainer]}>
                        <DateTimePicker
                            startDate={startDate}
                            headerTextStyle={[styles.datePickerText]}
                            calendarTextStyle={{color:Color.colorPlum}}
                            selectedItemColor={Color.colorPalevioletred}
                            weekDaysTextStyle={{color:Color.colorPalevioletred}}
                            mode="single"
                            date={date? date: undefined}
                            onChange={updateDate}
                        />
                        <TouchableOpacity style={[styles.updateDateButton, styles.centerContainer]}
                            onPress={closeDatePicker}
                        >
                            <Text style ={[styles.dateButtonTextStyle]}>{`OK`}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View style ={[styles.checkBoxContainer, styles.centerContainer]}>
                <View style = {[styles.checkBoxContainerHeaderContainer, styles.centerContainer]}>
                    <Text style ={[styles.datePickerTitle]}>
                        {capitalizeFirstLetter(`adoption pledge`)}
                    </Text>
                </View>
                <View style = {[styles.checkBoxContentContainer]}>
                    <CheckBox
                        value = {updates}
                        onChange={toggleUpdates}
                        tintColors={{true: Color.colorPalevioletred}}
                    />
                    <Text style ={[styles.checkBoxContentText]}>
                        {capitalizeFirstLetter(`provide regular monthly updates via PawsLink`)}
                    </Text>
                </View>
                <View style ={[styles.checkBoxContentContainer]}>
                    <CheckBox
                        value ={care}
                        onChange={toggleCare}
                        tintColors={{true: Color.colorPalevioletred}}
                    />
                    <Text style = {[styles.checkBoxContentText]}>
                        {capitalizeFirstLetter(`provide outmost care to the animal I adopted`)}
                    </Text>
                </View>
                <View style = {[styles.checkBoxContentContainer]}>
                    <CheckBox
                        value ={aware}
                        onChange={toggleAware}
                        tintColors={{true: Color.colorPalevioletred}}
                    />
                    <Text style ={[styles.checkBoxContentText]}>
                        {capitalizeFirstLetter(`and I am aware of "The Animal Welfare Act of 1998 and Responsible Pet Owner Act", thus, I will abide with what were stated in these acts.`)}
                    </Text>
                </View>
            </View>
            <FormButton
                textlabel={capitalizeFirstLetter(`submit form`)}
                styleButton={styles.submitButtonStyle}
                styleText={styles.buttonTextLabel}
                eventHandler={handleSubmit}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex:1
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerContainer:{
        width: '100%',
        height: '10%'
    },
    headerText:{
        fontSize: 25,
        color: "#774a7f",
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textAlign: "left",
        lineHeight: 28,
    },
    textInputContainer:{
        width: '90%',
        height: 'auto',
        flexDirection: 'column'
    },
    textInputContainerFirstText:{
        color: Color.colorPlum,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
    },
    textInputContainerSecondText:{
        fontSize: 7,
        fontStyle: "italic",
        fontFamily: FontFamily.interLight,
        color: "#9095a1",
        lineHeight: 22,
    },
    textInputContentContainer:{
        borderRadius: 24,
        borderColor: "#9095a0",
        width: '100%',
        height: 'auto',
        borderWidth: 1,
        borderStyle: "solid",
        fontFamily: FontFamily.interRegular,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        fontSize: FontSize.size_sm,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        fontFamily: FontFamily.interRegular,
        marginBottom: 20
        
    },
    textInput:{
        width: '90%',
        height: 48,
        color: 'black'
    },
    datePickerContainer:{
        width: '90%',
        justifyContent:'center',
        alignItems: 'flex-start',
    },
    datePickerTitle:{
        color: Color.colorPlum,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
    },
    datePickerText:{
        fontFamily: "Inter-Regular",
        color: Color.colorPalevioletred,
        fontSize: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        color:'black'
    },
    updateDateButton:{
        width:'50%',
        height: 48,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.colorPalevioletred
    },
    dateButtonTextStyle:{
        color :'black'
    },
    datePickerContentContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column'
    },
    checkBoxContainer:{
        marginVertical: 10,
        width: '90%',
        height: 'auto',
        flexDirection: 'column',
        borderRadius: 4,
        backgroundColor: Color.colorWhite,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        elevation: 2,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    checkBoxContainerHeaderContainer:{
        width: '100%',
        height: 40
    },
    checkBoxContentContainer:{
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    checkBoxContentText:{
        width: '90%',
        color: 'black'
    },
    submitButtonStyle:{
        width: '90%',
        backgroundColor: Color.colorPalevioletred,
        marginTop: 30
    },
    buttonTextLabel:{
        color: Color.colorWhite
    }
})

export default ApprovalFormScreen