import { 
    Text, 
    StyleSheet, 
    Pressable, 
    Image, 
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/notification/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useNavigation } from "@react-navigation/native";

const NotificationContainer = ({content, notifType}) =>{
    const navigation = useNavigation();
    const gotoMonthlyUpdate = () =>{
        if(notifType === 1){
            navigation.navigate("Monthly Update")
        }
    }
    return(
        <TouchableOpacity style ={[styles.mainContainer]}
            onPress={gotoMonthlyUpdate}
        >
            {/* image here */}
            <View style ={[styles.flexContainer,styles.centerContainer]}>
                <Image
                style = {[styles.sideImage]}
                source={
                    notifType === 1? require("../assets/notification/pets-1.png"):
                    require('../assets/notification/pets-11.png')
                }
                />
            </View>
            {/* content here */}
            <View style = {[styles.rightContainer]}>
                <Text style = {[styles.contentText]}>{
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...`
                }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex:1
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer:{
        height: 'auto',
        width: '90%',
        flexDirection: 'row',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        borderRadius: Border.br_7xs,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        marginBottom: 10
    },
    rightContainer:{
        flex: 5,
        height: 'auto',
        marginVertical: 10
    },
    sideImage:{
        width: 34,
        height: 34,
    },
    contentText :{
        width: '95%',
        color: Color.colorDarkslategray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 19,
        fontSize: FontSize.size_xs,
        textAlign: "left",
    }
})

export default NotificationContainer