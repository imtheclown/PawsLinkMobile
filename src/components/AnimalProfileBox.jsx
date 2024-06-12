import { View, 
    Pressable, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    Image,
    TouchableOpacity
} from "react-native";
import { Sex } from "../utils/CustomTypes";
import { Border, Color, FontSize, FontFamily } from "../assets/bottom_tabs/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { localMachineIPAddress, port } from "../utils/networkConf";

// capitalize the first letter of each element
function capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).toString();
}
// returns array
const capitalizeElements = (charList) =>{
    const capitalizedStrings = charList.map((element) =>{
        element = element.replace(/\n/g, ', ')
        return capitalizeFirstLetter(element)
    
})
    return capitalizedStrings
}
// capitalizes the first letter of the element of properties of Animal schema with type of array
// combines the element of the properties of type array and seperate each element with ", "
// returns array
const SerializableAnimalInstance = (animalObject) =>{
    const processedTraits = capitalizeElements(animalObject.traitsAndPersonality)
    const processNotes = capitalizeElements(animalObject.notes)
    const processedStatus = capitalizeElements(animalObject.status)
    const processedCoatColor = capitalizeElements(animalObject.coatColor)
    const processedDisabilities = capitalizeElements(animalObject.disabilities)
    const serializedAnimal = {
        _id: animalObject._id.toString(),
        fertilityStatus: animalObject.fertilityStatus,
        mainName: animalObject.mainName,
        location: animalObject.location,
        sex: animalObject.sex,
        status: processedStatus.join(", "),
        coatColor: processedCoatColor.join(", "),
        imgUrl: animalObject.imgUrl,
        notes: processNotes.join(", "),
        species: animalObject.species, 
        traitsAndPersonality: processedTraits.join(", "),
        disabilities: processedDisabilities.join(", "),
        age: animalObject.age > 0? animalObject.age.toString() : "UNKNOWN",
        sterilizationDate: animalObject.sterilizationDate.toString()

    }
    return serializedAnimal
}

export {SerializableAnimalInstance}
// returns JSX element
function AnimalProfileBox({flatListItem}){
    // destructure the props, an object following the animal schema
    // just get the name and the location
    const navigation = useNavigation()
    const queryObject = flatListItem.item;
    const animalObject = SerializableAnimalInstance(queryObject)
    const [displayImageURL, setDisplayImageURL] = useState("")
    const {mainName, location, sex, imgUrl} = animalObject;
    // convert the array to a string of location element seperated with space
    const gotoView = () =>{
        navigation.navigate("View Animal", {animalObject: animalObject})
    }

    useEffect(() =>{
        if(imgUrl && imgUrl.length){
            getImageURL();
        } 
    },[]);

    const getImageURL = async() => {
        await axios.get(`http://${localMachineIPAddress}:${port}/api/getImageUrl?objectKey=${imgUrl}`)
        .then(result =>{
            if(result && result.data && result.data.data){
                setDisplayImageURL(result.data.data);
            }else{
                setDisplayImageURL(result.data.data)
            }
        }).catch(err =>{
            console.log(err);
        })
    }
    return(
        <TouchableOpacity style={[styles.animalInstanceBoxContainer]} onPress={gotoView}>
            <View style= {[styles.topContainer]} >
                {/* image part */}
                <Image
                    style={styles.animalInstanceImage}
                    resizeMode="cover"
                    source={displayImageURL.length?{uri:displayImageURL}: require("../assets/browse_animals/image82.png")}
                />
            </View>
            <View style = {[styles.sectionContainer, styles.bottomContainer]}>
                {/* contains the name, location and gender */}
                <View style = {[ styles.bottomLeftContainer]}>
                    <Text style={styles.instanceBoxNameText}>{mainName}</Text>
                    <View style ={[styles.sectionContainer, styles.bottomContainer]}>
                        <Image
                            style = {styles.locationIcon}
                            resizeMode="cover"
                            source={require("../assets/browse_animals/love-heart-pin-1.png")}
                        />
                        {/* group the location and the location tag */}
                        <Text numberOfLines={1} ellipsizeMode="tail" style = {styles.locationText}>{location}</Text>
                    </View>
                </View>
                <View style ={[styles.sectionContainer, styles.bottomRightContainer]}>
                    <Image
                    style = {styles.genderIcon}
                    resizeMode="cover"
                    source={sex[0].toUpperCase() === Sex.FEMALE? require("../assets/general/woman-21-1.png") : require("../assets/general/man-20-1.png")}
                    />
                </View>
            </View>
      </TouchableOpacity>
    )
}
export default AnimalProfileBox

const styles = StyleSheet.create({
    animalInstanceBoxContainer: {
        height: '100%',
        width: '48%',
        borderRadius: Border.br_5xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        flexDirection: 'column',
    },
    instanceBoxNameText: {
        left: 8,
        fontSize: FontSize.size_xs,
        color: Color.colorGray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    animalInstanceImage: {
        width:'90%',
        height: 140,
        marginTop: 10

    },
    genderIcon: {
        width: 18,
        height: 18,
        overflow: "hidden",
        alignContent: 'flex-end'
    },
    sectionContainer: {
        flex: 1
    },
    locationText:{
        fontSize: FontSize.size_3xs,
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    },
    bottomContainer: {
        margin: 5,
        flexDirection: 'row',
    },
    bottomLeftContainer:{
        flex: 3,
        flexDirection: 'column',
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationIcon:{
        width: 12,
        height: 12,
        overflow: "hidden",
    },
    bottomRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    
})