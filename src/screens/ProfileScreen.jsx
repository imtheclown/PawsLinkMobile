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
import FormButton from "../components/FormButton";
import { Avatar } from "@rneui/base";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import SettingsButtonContainer from "../components/SettingsButtonContainer";
import { useNavigation } from "@react-navigation/native";
import { createRealmContext } from "@realm/react";
import { SavedUser } from "../database/schemas/SavedUser";

const profileContext = createRealmContext({
    schema: [SavedUser],
    path:"SavedUser.realm"
})

const {RealmProvider: ProfileProvider,
useRealm: useProfileRealm,
useQuery: useProfileQuery
} = profileContext;

const ProfileScreenWrapper = () => {
    return (
        <ProfileProvider>
            <ProfileScreen/>
        </ProfileProvider>
    )
}

const ProfileScreen = () => {
    const navigation = useNavigation();

    const user = useProfileQuery(SavedUser);
    const gotoEditProfile = () =>{
        navigation.navigate("Edit Profile")
    }

    const gotoVerifyUser = () =>{
        navigation.navigate('Adoption Form 1')
    }

    const gotoNotifications = () =>{
        navigation.navigate("Notification");
    }
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer, styles.centerContainer]}>
            {/* Top container */}
            <View style = {[styles.topContainer]}>
                {/* profile container */}
                <View style ={[styles.profileContainer]}>
                    {/* avatar */}
                    <View style ={[styles.flexContainer , styles.centerContainer]}>
                        <Avatar
                        size={100}
                        source={require("../assets/profile/avatar-7.png")}
                        />
                    </View>
                    {/* side text */}
                    <View style = {[styles.profileTextContainer, styles.flexContainer, styles.flexStart]}>
                        {/* username text */}
                        <Text style = {[styles.userNameText]}>
                            {`username`}
                        </Text>
                        {/* username email */}
                        <Text style = {[styles.emailText]}>
                            {'email'}
                        </Text>
                    </View>
                </View>
                <FormButton
                eventHandler={gotoEditProfile}
                textlabel={`edit profile`}
                styleText={styles.editProfileText}
                styleButton={styles.editProfileButton}
                />
            </View>
            {/* options container */}
            <View style = {[styles.middleContainer]}> 

                <SettingsButtonContainer
                eventHandler={gotoNotifications}
                label={capitalizeFirstLetter(`notifications`)}
                icon={require("../assets/profile/circle-09-3.png")}
                />

                <SettingsButtonContainer
                eventHandler = {gotoVerifyUser}
                label={capitalizeFirstLetter(`verify profile for adoption`)}
                icon={require("../assets/profile/settings-gear-1.png")}
                />

                <SettingsButtonContainer
                label={capitalizeFirstLetter(`terms of service`)}
                icon={require("../assets/profile/delete-30-1.png")}
                />
                <SettingsButtonContainer
                label={capitalizeFirstLetter(`about us`)}
                icon={require("../assets/profile/delete-30-11.png")}
                />
                <SettingsButtonContainer
                label={capitalizeFirstLetter(`log out`)}
                icon={require("../assets/profile/arrow-right-1.png")}
                withEnd={true}
                />
            </View>
            {/* buttons */}
            <View style = {[styles.bottomContainer]}>
                <FormButton
                textlabel= {`donate`}
                styleButton={styles.donateButton}
                styleText={styles.donateText}
                />
                <FormButton
                styleButton={[styles.contactUsButton]}
                styleText={styles.contactUsText}
                textlabel ={`contact us`}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexStart:{
        justifyContent: 'flex-start'
    },
    flexContainer: {
        flex: 1
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer:{
        overflow: "hidden",
        backgroundColor: Color.colorWhite,

    },
    topContainer:{
        height: '30%',
        width: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    profileContainer:{
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userNameText:{
        fontSize: 25,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: "#774a7f",
        textAlign: "left",
        lineHeight: 28,
    },
    emailText:{
        color: "#424856",
        lineHeight: 26,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_base,
    },
    profileTextContainer:{
        flexDirection: 'column',
        height: 'auto'
    },
    editProfileText:{
        color: Color.colorWhite,
        lineHeight: 26,
        fontSize: FontSize.size_base,
    },
    editProfileButton:{
        backgroundColor: Color.colorPalevioletred,
    },

    // middle part
    middleContainer:{
        height: '40%',
        width: '90%'
    },
    bottomContainer:{
        height: '30%',
        width: '90%'
    },
    donateButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    contactUsButton:{
        backgroundColor: "#fcf3f6"
    },
    donateText:{
        color: Color.colorWhite,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        lineHeight: 28,
    },
    contactUsText:{
        color: Color.colorPalevioletred,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
    }
  

})

export default ProfileScreenWrapper