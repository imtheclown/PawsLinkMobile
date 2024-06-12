import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { useState } from "react";
import RadioGroup from 'react-native-radio-buttons-group';
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { splitByDash } from "../utils/TextBasedUtilityFunctions";
const RadioButton = ({title, selectionList, valueSetter}) =>{
    const [selectedId, setSelectedId] = useState();

    const selectionHandler = (id) =>{
        setSelectedId(id)
        const selectedButton = selectionList[id-1]
        const value = selectedButton.value
        valueSetter(value)
    }
    return (
    <View style = {styles.checkBoxListContainer}>
            {/* title */}
            <View style={[styles.checkListTitleContainer]}>
                <Text style ={[styles.checkListTitle]}>
                    {capitalizeFirstLetter(title)}
                </Text>
            </View>
            {/* list of checkboxes */}
            <RadioGroup
            containerStyle = {styles.checkBoxListContentContainer}
            labelStyle = {styles.radioLabel}
            radioButtons={selectionList}
            selectedId= {selectedId}
            onPress={id => {selectionHandler(id)}}
            />

    </View>
    )
}
const styles = StyleSheet.create({
    checkBoxListContainer:{
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 10
        
    },
    checkListTitleContainer:{
        marginBottom: 10,
        width:'100%',
        height: 'auto',
        justifyContent:'flex-start'
    },
    checkListTitle:{
        color: Color.colorGray_100,
        lineHeight: 22,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        lineHeight: 22,
        color: Color.colorGray_100,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    checkBoxListContentContainer:{
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        width: '100%',
        height: 'auto',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_9xs,
        backgroundColor: Color.colorWhite,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    radioLabel:{
        fontFamily: FontFamily.interRegular,
        color: Color.colorGray_100,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    }

})

export default RadioButton;