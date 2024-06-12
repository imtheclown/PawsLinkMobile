import { 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    Pressable,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../assets/profile/GlobalStyles";
const SettingsButtonContainer = ({label, icon, withEnd, eventHandler}) => {
    return (
        <TouchableOpacity style = {[style.mainContainer]}
            onPress={eventHandler}
        >
            <View style = {[style.sideImageContainer,style.centerContainer]}>
                <Image
                style ={[style.sideImage]}
                resizeMode="cover"
                source={ icon}
                />
            </View>
            <View style ={[style.labelContainer]}>
                <Text style = {[style.labelText]}>{label}</Text>
            </View>
            <View style ={[style.sideImageContainer, style.centerContainer]}>
                {
                    !withEnd?                 
                    <Image
                    style ={[style.sideImage]}
                    resizeMode="cover"
                    source = {require("../assets/profile/right-arrow-2.png")}
                    />:<>
                    </>
                }
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    mainContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
    },
    sideImageContainer:{
        width: '15%',
        height: 'auto',
    },
    labelContainer:{
        width: '70%',
        justifyContent: 'center'
    },
    sideImage:{
        height: 24,
        width: 24,
    },
    labelText:{
        color: Color.colorGray_100,
        lineHeight: 28,
        fontSize: FontSize.size_base,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
    },

})

export default SettingsButtonContainer