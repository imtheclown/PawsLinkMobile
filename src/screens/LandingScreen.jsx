import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView, 
  TouchableOpacity
} from "react-native";
import { LinearProgress } from "@rneui/themed";
import { Color, FontFamily, FontSize } from "../assets/landing_page/GlobalStyles";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import NetInfo, {fetch} from '@react-native-community/netinfo';

const LandingPageScreen = () =>{
    const [isLoading, setIsloading] = useState(false)
    const [connected, setConnected] = useState(false);
    const [percent, setPercent] = useState("0");
    const navigation = useNavigation();

    useEffect(() =>{
        setIsloading(true);
        checkInternetConnection();
        setPercent(String(((parseInt(percent) + 1)/1)) * 100);
        setIsloading(false);
    },[])

    const checkInternetConnection = async () =>{
        await fetch()
        .then(result =>{
            if(result.isConnected){
                
                setConnected(true);
            }else{
                setConnected(false);
            }
        }).catch(err =>{
            console.log(err);
            setConnected(false);
        })
    }
    const GotoHome = () => {
        navigation.navigate("Home");
    }

    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            <View style = {[styles.contentContainer]}>
                {/* logo and image container */}
                <View style = {[styles.flexContainer, styles.pawsLinkLogoContainer]}>
                    <Image
                        style = {[styles.pawslinklogo]} 
                        resizeMode="cover"
                        source={require("../assets/landing_page/image29.png")}
                    />
                    <Text style = {[styles.inPartnerShipText]}>
                        in partnership with
                    </Text>
                </View>
                {/* partner logo container */}
                <View style = {[styles.flexContainer, styles.logoContainer]}>
                    <Image
                    style = {[styles.logoStyle]}
                    resizeMode="cover"
                    source = {require("../assets/logo/upv_logo.png")}
                    />
                    <Image
                    style = {[styles.logoStyle]}
                    resizeMode="cover"
                    source = {require("../assets/logo/pahinungod_round.png")}
                    />
                    <Image
                    style = {[styles.logoStyle]}
                    resizeMode="cover"
                    source = {require("../assets/logo/project_pawradise_round.png")}
                    />
                </View>
                {/* loading icon container */}

                {isLoading? 
                    <View style = {[styles.loadingSliderContainer]}>
                        <Text style={[styles.percentageText]}>{`${percent}%`}</Text>
                        <LinearProgress
                            style={styles.loadingSlider}
                            animation={true}
                            value={1}
                            variant="determinate"
                            color="#dac7de"
                            trackColor="rgba(0, 0, 0, 0)"
                        />
                            <Text style={[styles.downloadingAssetsText]}>
                                downloading assets...
                            </Text>
                    </View>
                    :
                    <TouchableOpacity style={[styles.getStartedButton]}
                    onPress={GotoHome}>
                        <Text style = {[styles.getStartedTxt]}>
                            get started
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#d2628a",
        shadowColor: "rgba(18, 15, 40, 0.12)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        overflow: "hidden",
    },
    contentContainer:{
        width: '80%',
        height: '70%',
    },
    pawsLinkLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pawslinklogo: {
        width: 217,
        height: 217,
    },
    inPartnerShipText:{
        fontFamily: FontFamily.interLight,
        fontStyle: "italic",
        lineHeight: 24,
        fontSize: FontSize.size_xs,
        color: Color.colorWhite,
    },
    logoStyle:{
        height: 75,
        width: 75,
    },
    logoContainer:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    loadingSliderContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    loadingSlider:{
        width: '90%'
    },
    downloadingAssetsText:{
        fontFamily: FontFamily.interLight,
        fontStyle: "italic",
        lineHeight: 24,
        fontSize: FontSize.size_xs,
        color: Color.colorWhite,
    },
    percentageText: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: FontFamily.interRegular,
        width: 41,
        height: 31,
        color: Color.colorWhite,
    },
    getStartedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        borderRadius: 31,
        backgroundColor: "#f6d25e",
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowRadius: 2,
        elevation: 2,
        width: '100%',
        height: 61,
    },
    getStartedTxt:{
        fontSize: 18,
        lineHeight: 28,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: "#774a7f",
    }


})

export default LandingPageScreen