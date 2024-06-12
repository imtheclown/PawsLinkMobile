import * as React from "react";
import { Image, 
    StyleSheet, 
    Pressable, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity 
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/need_login/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const NeedLoginScreen = () =>{
    const navigation = useNavigation()
    const GotoSignIn = () => {
        navigation.navigate("Sign In")
    }
    const GotoSignUp = () => {
        navigation.navigate("Sign Up")
    }
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            {/* header */}
            <View style = {[styles.headerContainer]}>
                <Image
                style = {[styles.headerIcon]}
                resizeMode="cover"
                source={require('../assets/logo/pawslink_header.png')}
                />
            </View>
            {/* content */}
            <View style = {[styles.contentContainer]}>
                <Text style = {[styles.contentText]}>You need to login to be able to access this page.</Text>
                <TouchableOpacity 
                onPress={GotoSignIn}
                style = {[styles.loginButton]}>
                    <Text style = {[styles.loginText]}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={GotoSignUp} 
                style = {[styles.loginButton ,styles.createAccountButton]}>
                    <Text style = {[styles.loginText]}>
                        create an account
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        alignItems: 'center',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1
    },
    contentContainer: {
        flex: 9,
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon:{
        width: 129,
        height: 57,
    },
    contentText: {
        fontSize: 15,
        lineHeight: 20,
        fontStyle: "italic",
        fontFamily: FontFamily.interLight,
        color: "#171a1f",
        textAlign: "center",
        width: 221,
    },
    loginButton : {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 61,
        width: '90%',
        borderRadius: Border.br_12xl,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        backgroundColor: "#9032ab"
    },
    loginText:{
        textAlign: "left",
        color: Color.colorWhite,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        lineHeight: 28,
        fontSize: FontSize.size_lg,
    },
    createAccountButton:{
        backgroundColor: "#fdd043"
    }
})
export default NeedLoginScreen