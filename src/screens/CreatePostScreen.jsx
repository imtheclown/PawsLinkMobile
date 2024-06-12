import { SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Border, Color } from "../assets/create_post/GlobalStyles";
import { useState } from "react";
import { pickImage } from "../utils/FileBasedUtils";
import { useForumRealmProvider } from "../database/REALM/realmContext";
import axios from "axios";
import { generate32BitHex } from "../utils/TextBasedUtilityFunctions";
import { localMachineIPAddress, port, apiStartString } from "../utils/networkConf";
import { Realm, useQuery, useRealm } from "@realm/react";
import { SavedUser } from "../database/schemas/SavedUser";
import LoadingModal from "../components/LoadingModal";
const CreatePostScreen = ({route, navigation}) =>{
    const query = useQuery(SavedUser);
    const attachFile = 'attach file';
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [imageFilename, setImageFilename] = useState("");
    const [imageType, setImageType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const GoBackToPreviousScreen = () =>{
        navigation.goBack()
    }

    const getuserCreds = () =>{
        for(const i= 0; i < query.length; i ++){
            if(query[i].remembered){
                return {username, email} = query[0]
            }
        }
        
        
    }
    const createPost = async (data) => {
        setIsLoading(true);
        await axios.post(`http://${localMachineIPAddress}:${port}/${apiStartString}/createPost`,
        data,
        {
            headers:{
                Accept: 'Application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    const createPostHandler = () =>{
        const {username, email} = getuserCreds();
        console.log(content, title)
        if(content.length && title.length){
            const data = new FormData()
            if(imageUri.length){
                key = generate32BitHex()
                data.append('image', {
                    uri: imageUri,
                    name: imageFilename,
                    type: imageType
                })
                data.append('key', key)
            }
            data.append("title", title);
            data.append("content", content);
            data.append("username", username);
            data.append("email", email);
            createPost(data)
            .then(
                result =>{
                    setIsLoading(false)
                    navigation.goBack();
                }
                
            )
            .catch(
                err =>{
                    setIsLoading(false);
                    console.log(err);
                }
            )
        }
    }
    const onPressPickImage = async () =>{
        const {uri, name, type, size} = await pickImage();
        if(uri && name && type){
            setImageFilename(name)
            setImageType(type)
            setImageUri(uri)
        }
    }

    const updateTitle = (newtitle) =>{
        setTitle(newtitle);
    }

    const updatedContent = (updateContent) =>{
        setContent(updateContent);
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
                <LoadingModal isLoading={isLoading}/>
            {/* header */}
            <View style = {[styles.headerContainer]}>
                <Text style = {[styles.createPostText]}>
                create a post
                </Text>
            </View>
            {/* create post */}
            <View style = {[styles.creatPostContainer]}>
                <TextInput
                    style = {[styles.createPostTextInput]}
                    placeholder="Add a title..."
                    placeholderTextColor="#9095a1"
                    onChangeText={updateTitle}
                />
                <TextInput
                numberOfLines={6}
                multiline={true}
                textAlignVertical="top"
                style = {[styles.createContentTextInput]}
                placeholder="Write text here..."
                placeholderTextColor="#9095a1"
                returnKeyType="done"
                onChangeText={updatedContent}
                />
                <View>
                    <TouchableOpacity style={[styles.attachFileButton]}
                        onPress={onPressPickImage}
                    >
                        <Image
                        style={[styles.attachmentIcon]}
                        resizeMode="cover"
                        source={require("../assets/create_post/attachment.png")}
                        />
                        <Text style={[styles.attachButtonText]}>{imageFilename.length? imageFilename: attachFile}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buttons */}
            <View style = {[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.postButton]}
                    onPress={createPostHandler}
                >
                    <Text style = {[styles.postButtonText]}>post</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.cancelButton]}
                onPress={GoBackToPreviousScreen}
                >
                    <Text style = {[styles.cancelText]}>cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
    },
    headerContainer:{
        width: '90%',
        height: '10%',
        flexDirection:'column',
        justifyContent: 'flex-end'
    },
    createPostText:{
        fontSize: 21,
        lineHeight: 32,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
        marginVertical: 20
    },
    creatPostContainer:{
        width: '90%',
        height: "50%",
    },
    createPostTextInput:{
        height: 45,
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.size_lg,
        width: '100%',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        borderRadius: Border.br_9xs,
        fontWeight: "700",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        marginBottom: 10,
        color: 'black'
    },
    createContentTextInput:{
        width: '100%',
        borderRadius: Border.br_9xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        fontFamily: FontFamily.interRegular,
        paddingBottom: 20,
        fontSize: 25,
        color: 'black'
    },
    attachFileButton:{
        flexDirection: 'row',
        height: 36,
        backgroundColor: Color.colorPalevioletred,
        overflow: "hidden",
        borderRadius: Border.br_9xs,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attachButtonText:{
        lineHeight: 22,
        color: Color.colorWhite,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        textAlign: "left"
    },
    attachmentIcon:{
        width: 16,
        height: 16,
        overflow: "hidden",
    },
    buttonContainer:{
        width: '90%',
        flexDirection: 'column',
        alignItems:'center',
    },
    postButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorPalevioletred,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        height: 52,
        width: '100%',
        borderRadius: Border.br_7xl,
        overflow: "hidden",
    },
    postButtonText :{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        textAlign: "left",
        color: Color.colorWhite,
    },
    cancelButton:{
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderStyle: "solid",
        borderColor: Color.colorPalevioletred,
        borderWidth: 1,
        height: 52,
        width: '100%',
        borderRadius: Border.br_7xl,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelText:{
        color: Color.colorPalevioletred,
    }
})

import { RealmProvider } from "@realm/react";
import { FaceDetector } from "react-native-camera";
const WrappedCreatePost = ({route, navigation}) =>{
    return(
        <RealmProvider
        schema={[SavedUser]}
        path="SavedUser.realm"
        >
            <CreatePostScreen route={route} navigation = {navigation}/>
        </RealmProvider>
    )
}
export default WrappedCreatePost