import { 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    Pressable,
    TextInput,
    SafeAreaView, 
    TouchableOpacity
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../assets/edit_profile/GlobalStyles";
import { Avatar, Accessory } from "@rneui/base";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import EditProfileTextInput from "../components/EditProfileTextInput";
import FormButton from "../components/FormButton";
import { pickImage } from "../utils/FileBasedUtils";
import { useState } from "react";
const EditProfileScreen = ({route, navigation}) => {
    const [fileName, setFileName] = useState("");
    const [uri, setUri] = useState("");
    const [type, setType] = useState("")
    const goBack = () =>{
        navigation.goBack();
    }

    const onPressPickImage = async () =>{
        const {uri, name, type, size} = await pickImage();
        if(uri && name && type){
            setImageFilename(name)
            setImageType(type)
            setImageUri(uri)
        }
    }
    return (
        <SafeAreaView style ={[styles.flexContainer, styles.mainContainer]}>
            {/* header */}
            <View style = {[styles.headerContainer,]}>
                <Text style = {[styles.headerText]}>
                    {capitalizeFirstLetter('edit profile')}
                </Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={onPressPickImage}
                >
                    <Avatar
                    size={100}
                    rounded
                    source={require("../assets/edit_profile/avatar-8.png")}>
                        <Avatar.Accessory
                        style={[styles.editIcon]}
                        size={24}
                        source={require("../assets/edit_profile/edit.png")}
                        />
                    </Avatar>
                </TouchableOpacity>
            </View>
            <EditProfileTextInput
                label={`name`}
                isPassword={false}
            />
            <EditProfileTextInput
                label={`phone number`}
                keyboard={'numeric'}
                isPassword={false}
            />
            <EditProfileTextInput
                label={`email`}
                keyboard={'email-address'}
                isPassword={false}
            />
            <EditProfileTextInput
                label={`password`}
                isPassword={true}
            />
            <View style = {[styles.formContainer, styles.centerContainer]}>
                <FormButton
                textlabel={'save changes'}
                styleButton={styles.saveChangesButton}
                />
                <FormButton
                styleButton={styles.cancelButton}
                styleText={styles.cancelText}
                textlabel={'cancel'}
                eventHandler={goBack}
                />

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    flexContainer:{
        flex: 1
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer:{
        width: '90%',
        height: '10%',
        justifyContent: 'center',
    },
    headerText:{
        fontSize: 24,
        lineHeight: 32,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
        alignItems: 'center'
    },
    editIcon:{
        backgroundColor: Color.colorPalevioletred,
    },
    formContainer:{
        marginTop: 40,
        width: '100%',
        height: 'auto'
    },
    saveChangesButton:{
        backgroundColor: Color.colorPalevioletred,
        width: '90%',
    },
    cancelButton:{
        width: '90%',
        borderRadius: 26,
        borderStyle: "solid",
        borderColor: Color.colorPalevioletred,
        borderWidth: 1,
    },
    cancelText:{
        lineHeight: 28,
        color: Color.colorPalevioletred,
    }
})

export default EditProfileScreen