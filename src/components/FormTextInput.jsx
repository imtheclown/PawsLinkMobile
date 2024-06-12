import { 
    View,
    Text,
    TextInput,
    StyleSheet, 
    KeyboardAvoidingView
} from "react-native"
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useEffect, useState } from "react";
const FormTextInput = ({title, numLines, valueSetter, value, isError}) => {
    // make the form border red if error
    return (
        <KeyboardAvoidingView>
            <View style = {[styles.textInputContainer]}>
                <Text style = {[styles.textInputTitle]}>
                    {capitalizeFirstLetter(title)}
                </Text>
                <TextInput
                multiline = {numLines? true: false}
                numberOfLines={numLines? numLines: 1}
                style = {[styles.textInputBox]}
                textAlignVertical="top"
                value={value}
                onChangeText={newValue => {
                    valueSetter(newValue)
                }}
                >
                </TextInput>
                {isError?               
                <Text>
                    error text here
                </Text>
                : <></>}
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textInputContainer:{
        height:'auto',
        width: '100%',
        marginBottom: 10
    },
    textInputTitle:{
        lineHeight: 22,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
        textAlign: "left",
        fontSize: FontSize.size_sm,
        marginBottom: 10
    },
    textInputBox:{
        borderRadius: Border.br_9xs,
        backgroundColor: Color.colorWhite,
        borderStyle: "solid",
        borderColor: Color.colorDarkslateblue,
        borderWidth: 1,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        color: "#424856"
    }
})

export default FormTextInput