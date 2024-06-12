import { 
    StyleSheet, 
    View, 
    Pressable, 
    Text, 
    Image, 
    SafeAreaView 
} from "react-native";
import { FontFamily, Color } from "../assets/thanks_for_adoption/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import FormButton from "../components/FormButton";

const ThankYouForAdoptionScreen = ({route, navigation}) =>{

    const gotoHome = () =>{
        navigation.navigate("Home");
    }
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer, styles.centerContainer]}>
            <View style ={[styles.topContainer, styles.centerContainer]}>
                <Image
                style={[styles.headerImage]}
                resizeMode="cover"
                source={require("../assets/thanks_for_adoption/image-155.png")}
                />
            </View>
            <View style ={[styles.contentContainer]}>
                <Image
                style = {[styles.contentImage]}
                resizeMode="cover"
                source={require("../assets/thanks_for_adoption/image-156.png")}
                />
                <Text style ={[styles.contentText]}>
                    {capitalizeFirstLetter("thank you for your interest in adopting! you'll hear back from us soon.")}
                </Text>
                <FormButton
                eventHandler={gotoHome}
                textlabel={`back to home`}
                styleButton={styles.returToHomeButton}
                styleText={styles.returnToHomeText}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centerContainer:{
        justifyContent:'center',
        alignItems: 'center'
    },
    flexContainer:{
        flex: 1
    },
    mainContainer:{
        backgroundColor: Color.colorPalevioletred,
        shadowColor: "rgba(18, 15, 40, 0.12)",
        shadowRadius: 6,
        elevation: 6,
        flex: 1,
        overflow: "hidden",
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        overflow: "hidden",
    },
    topContainer:{
        flex: 1
    },
    contentContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        flex: 4
    },
    headerImage:{
        width: 188,
        height: 188,
    },
    contentImage:{
        borderRadius: 96,
        width: 288,
        height: 192,
        marginBottom: 20
    },
    contentText:{
        fontSize: 20,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorWhite,
        textAlign: "center",
        width: 333,
        height: 112,
    },
    returToHomeButton:{
        backgroundColor: Color.colorWhite,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowRadius: 2,
        elevation: 2,
        borderStyle: "solid",
        borderColor: Color.colorPalevioletred,
        borderWidth: 1,
    },
    returnToHomeText:{
        fontSize: 18,
        fontFamily: FontFamily.interRegular,
        color: Color.colorPalevioletred,
    }
})

export default ThankYouForAdoptionScreen