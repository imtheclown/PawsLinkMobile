import * as React from "react";
import { Pressable, Text, StyleSheet, View, Image, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import { Color, FontFamily, FontSize } from "../assets/view_animal/GlobalStyles"
import { Sex } from "../utils/CustomTypes";
import { convertToMDY } from "../utils/DateBasedUtilityFunctions";
import { useState, useEffect } from "react";
import axios from "axios";
import { localMachineIPAddress, port, apiStartString } from "../utils/networkConf";
import { SavedUser } from "../database/schemas/SavedUser";
import { SavedUserProvider, useSavedUserObject, useSavedUserRealm, useSavedUserQuery } from "../context/RealmContext";

// placeholders for nows
const lastVaccination = {
    title: 'VACCINATED LAST:',
    value: 'NA'
}

const lastDeworm= {
    title: 'DEWORMED LAST:',
    value: 'NA'
}



// generates an object
const boxContentGenerator = (title, value) =>{
    return{
        title: title,
        value: value
    }
}
// creates small boxes component
const SmallBoxes = ({title, value}) => {
    return (
        <View style = {[styles.boxContainer]}>
            <Text style={[styles.titleStyle]}>{title.toUpperCase()}</Text>
            <Text style = {[styles.valueStyle]}>{value.toUpperCase()}</Text>
        </View>
    )
}

const ViewAnimal = ({route, navigation}) =>{
    return (
        <SavedUserProvider>
            <ViewAnimalContent route={route} navigation={navigation}/>
        </SavedUserProvider>
    )
}
const ViewAnimalContent = ({route, navigation}) =>{
    const user = useSavedUserQuery(SavedUser);
    const num = user.length;
    const {animalObject} = route.params
    const [animalImgUrl, setImageUrl] = useState("")
    const {age, mainName, status, location, traitsAndPersonality, notes, imgUrl, sex, sterilizationDate, _id} = animalObject
    const newAge = boxContentGenerator("age", age)
    const newStatus = boxContentGenerator("status", status)
    const sterilizationDateInfo = boxContentGenerator("sterilization date", convertToMDY(sterilizationDate))

    const boxes = [newAge, newStatus, lastVaccination, lastDeworm, sterilizationDateInfo]
    const goBackToBrowse = () =>{
        navigation.goBack();
    }
    const gotoForms = () =>{
        navigation.navigate({name:'Adoption Form 1', params: {animalId: _id}})
    }

    const gotoSignIn = () =>{
        navigation.navigate({name: 'Sign In'})
    }
    const buttonPressHandler = () =>{
        if(num){
            gotoForms();
        }else{
            Alert.alert('Cannot Proceed', 'You are not signed in', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Sign In', onPress: () => gotoSignIn()},
              ]);
        }
    }
    const getImageURL = async() => {
        await axios.get(`http://${localMachineIPAddress}:${port}/api/getImageUrl?objectKey=${imgUrl}`)
        .then(result =>{
            if(result && result.data && result.data.data){
                setImageUrl(result.data.data);
            }else{
                setImageUrl(result.data.data)
            }
        }).catch(err =>{
            console.log(err);
        })
    }
    useEffect(() =>{
        getImageURL();
    }, [])
    return(
        <SafeAreaView 
        style = {[styles.mainContainer, styles.sectionContainer]}>
            {/* return Button */}
            <View style = {[styles.sectionContainer, styles.backButtonContainer]}>
                <Pressable style={styles.backButton} onPress={goBackToBrowse}>
                    <Image
                    style={[styles.backButton]}
                    resizeMode="cover"
                    source={require("../assets/view_animal/circle-arrow-left-1.png")}
                    />
                </Pressable>
            </View>
            <SafeAreaView style = {[styles.scrollViewContainer]}>
                <ScrollView
                contentContainerStyle = {[styles.scrollViewStyle]}>
                {/* animal image*/}
                    <View style = {[styles.imageContainer]}>
                        <Image
                            style={styles.animalImage}
                            resizeMode="cover"
                            source={animalImgUrl .length?{uri:animalImgUrl}:require("../assets/view_animal/image-82.png")}
                        />
                    </View>
                    {/* animal name, sex and location */}
                    <View style = {[styles.nameLocationContainer]}>
                        {/* name and gender icon */}
                        <View style = {[styles.name]}>
                            <Text style = {[styles.nameText]}>
                                {mainName}
                            </Text>
                            <Image
                                    style={styles.genderIcon}
                                    resizeMode="cover"
                                    source={sex[0].toUpperCase() === Sex.FEMALE ?require("../assets/general/woman-21-1.png"):require("../assets/general/man-20-1.png")}
                            />
                        </View>
                        {/* location */}
                        <View style = {[styles.location]}>
                            <Text style={styles.locationText}>
                                {location}
                            </Text>
                        </View>
                    </View>
                    {/* age, status and medical records */}
                    <View style= {[styles.smallBoxesContainer]}>
                        <View style = {[styles.smallBoxesStyle]}>
                            {
                                boxes.map((item, index) =>(
                                    <SmallBoxes key={index} title={item.title} value={item.value}/>
                                ))
                            }
                        </View>
                    </View>
                    {/* traits and personality */}
                    <View  style = {[styles.longBoxContentContainer]}>
                        <View style = {[styles.longBoxIndivContainer]}>
                            <Text style={[styles.longBoxTitle]}>
                                TRAITS AND PERSONALITY
                            </Text>
                            <Text style={[styles.longBoxContent]}>   
                                {traitsAndPersonality}
                            </Text>
                        </View>
                        {/* other information */}
                        {
                            notes.length?
                            <View style = {[styles.longBoxIndivContainer]}>
                                <Text style={[styles.longBoxTitle]}>
                                    OTHER INFORMATION
                                </Text>
                                <Text style={[styles.longBoxContent]}>   
                                    {notes}
                                </Text>
                            </View>: <></>
                        }
                    </View>
                    {/* adopt me button */}
                    <View style = {[styles.adoptButtonContainer]}>
                        <Pressable
                            style={[styles.adoptMeButton]}
                            onPress={buttonPressHandler}
                        >
                            <Text style={styles.adoptButtonText}>adopt me</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default ViewAnimal

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection : 'column',
        flex: 1,
        backgroundColor: Color.colorWhite,
    },
    sectionContainer: {
        flex: 1
    },
    backButtonContainer: {
        justifyContent: 'flex start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButton: {
        width: 34,
        height: 34,
        marginLeft: 15
    },
    scrollViewContainer: {
        height: '92%',
        flexDirection: 'column',
    }, 
    scrollViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    animalImage: {
        width: 339,
        height: 229,
    },
    imageContainer: {
        height: 229,
        alignItems: 'center'
    },
    nameLocationContainer:{
        marginTop: 3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    name: {
        flexDirection: 'row',
        width: 345,
        alignItems: 'center'
    },
    nameText: {
        fontSize: 24,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        fontWeight: "700",
    },
    genderIcon:  {
        width: 22,
        height: 22,
        overflow: "hidden",
        marginLeft: 10
    },
    location: {
        flexDirection: 'row',
        width: 345,
        alignItems: 'center'
    },
    locationText: {
        lineHeight: 24,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    smallBoxesContainer:{
        marginTop: 10,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallBoxesStyle:{
        alignItems:'center',
        justifyContent: 'flex-start',
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxContainer :{
        justifyContent:'center',
        width: '50%',
        marginTop: 15,
    },
    titleStyle:{
        fontSize: FontSize.size_xs,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    valueStyle: {
        fontSize: FontSize.size_base,
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
        lineHeight: 26,
    },
    longBoxContent: {
        width: 350,
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    longBoxTitle: {
        fontSize: FontSize.size_xs,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    longBoxContentContainer:{
        alignItems: 'center'
    },
    longBoxIndivContainer:{
        marginTop: 20
    },
    adoptMeButton: {
        borderRadius: 34,
        backgroundColor: "#f6d25e",
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowRadius: 2,
        elevation: 2,
        width: 344,
        height: 68,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    adoptButtonText:{
        fontSize: 18,
        fontFamily: FontFamily.interBold,
        color: Color.colorWhite,
        textAlign: "left",
        fontWeight: "700",
        lineHeight: 26,
    },
    adoptButtonContainer: {
        alignItems:'center',
        marginVertical: 20
    }
})