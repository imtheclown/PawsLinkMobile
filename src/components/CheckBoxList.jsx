import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import CheckBoxWithText from "./CheckBoxWithText";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useState } from "react";

// checkBoxParams format
// keys: title, options, value
// options: list of options 
// options keys: optionTitle, value, valueSetter
const CheckBoxList =({checkBoxParams}) => {
    const title = checkBoxParams.title
    const options = checkBoxParams.options
    return (
        <View style = {styles.checkBoxListContainer}>
            {/* title */}
            <View style={[styles.checkListTitleContainer]}>
                <Text style ={[styles.checkListTitle]}>
                    {capitalizeFirstLetter(title)}
                </Text>
            </View>
            {/* list of checkboxes */}
            <View style = {[styles.checkBoxListContentContainer]}>
                {/* checkbox container */}
                {options.map((item, index) =>{
                    return <CheckBoxWithText key={index} option ={item}/>
                })}
            </View>
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

})

export default CheckBoxList;