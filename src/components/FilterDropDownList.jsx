import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
  } from "react-native";

import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { Border, Color, FontSize, FontFamily } from "../assets/bottom_tabs/GlobalStyles";
const FilterDropDownList = ({value, valueSetter, filterList, placeholder}) =>{
    const [focus, setFocus] = useState(false);
    const changeValue = (newValue) =>{
        valueSetter(newValue);
    }
    return (
        <View style = {[styles.dropDownContentContainer]}>
            <Dropdown
            mode="modal"
            data={filterList}
            valueField= "value"
            labelField= "label"
            placeholder={placeholder}
            value={value}
            onChange={changeValue}
            selectedTextStyle = {[styles.dropdownButtonText, styles.selectedText]}
            placeholderStyle = {[styles.dropdownButtonText, styles.placeholderText]}
            itemTextStyle = {[styles.dropdownButtonText, styles.dropDownItemText]}
            containerStyle = {[styles.dropDownListContainer]}
            style ={[styles.dropdownpicker, focus&&{borderColor: "#d2628a",}]}
            activeColor= {Color.colorGainsboro}
            onFocus={() =>{
                setFocus(true);
            }}
            onBlur={() =>{
                setFocus(false);
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    dropdownpicker: {
        width: '95%',
        height: 30,
        borderColor: Color.colorLightslategray,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        borderRadius: 10,
    },
    dropdownButtonText: {
        marginLeft: 10,
        fontSize: 10,
        fontFamily: "Inter-Regular",
    },
    placeholderText:{
        width: '100%',
        color: "#bdc1ca",
    },
    selectedText:{
        color: Color.colorDarkslateblue,
        lineHeight: 35,
    },
    dropDownContentContainer:{
        flex: 1
    },
    dropDownListContainer:{
        width: 200,
        elevation: 10,
        borderColor: "#d2628a"
    },
    dropDownItemText:{
        color: 'black'
    }
})

export default FilterDropDownList;