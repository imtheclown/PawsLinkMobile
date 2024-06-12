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
const AddMinusButton = ({title, value, valueSetter}) => {
    const addOne = () =>{
        var newValue = parseInt(value)
        valueSetter(String(newValue + 1))
    }
    const minusOne = () =>{
        var newValue = parseInt(value)
        if(newValue !== 0){
            valueSetter(String(newValue - 1))
        }
    }
    return (
    <View style ={[styles.addMinusButtonContainer]}>
        <View style ={[styles.textContainer]} >
            <Text style={[styles.titleText]}>
                {title}
            </Text>
        </View>
        <View style = {[styles.addMinusContentContainer]}>
            <View style = {[styles.addMinusMainContentContainer]}>
                <TouchableOpacity style = {[styles.flexContainer, styles.addMinusButton, styles.minusButton]}
                    onPress={minusOne}
                >
                    <Image
                    resizeMode="cover"
                    source={require("../assets/adoption_form/minus.png")}
                    />
                </TouchableOpacity>
                <View style = {[styles.flexContainer,styles.valueTextContainer]}>
                    <TextInput
                    value={value}
                    style = {[styles.flexContainer,styles.valueText]}
                    />
                </View>
                <TouchableOpacity
                style = {[styles.flexContainer, styles.addMinusButton, styles.addButton]}
                    onPress={addOne}
                >
                    <Image
                    resizeMode="cover"
                    source={require("../assets/adoption_form/add.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({

    flexContainer:{
        flex: 1,
    },
    addMinusButtonContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        marginBottom: 10,
    },
    addMinusContentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: '35%',
        borderColor: Color.colorGainsboro,
        borderRadius: Border.br_9xs,
        borderWidth: 1,
        borderStyle: "solid",
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
    },
    addMinusMainContentContainer:{
        flexDirection: 'row',
        width: "95%",
        height: "85%",
    },
    addMinusButton:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: Border.br_9xs,
    },
    addButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    minusButton : {
        backgroundColor: Color.colorWhitesmoke
    },
    valueTextContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    valueText:{
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: FontFamily.interRegular,
        color: Color.colorGray_100,
    },
    textContainer:{
        marginBottom: 10,
    },
    titleText:{
        color: Color.colorGray_100,
        lineHeight: 22,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        lineHeight: 22,
        color: Color.colorGray_100,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    }
})

export default AddMinusButton