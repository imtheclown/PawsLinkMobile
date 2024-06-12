import { View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
 } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/forum/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiStartString, localMachineIPAddress, port } from "../utils/networkConf";
import { useState, useEffect } from "react";
import { convertToMDY } from "../utils/DateBasedUtilityFunctions";
import { Avatar } from "@rneui/base";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";

const PostContainer = ({_id, username, email, content, postImage, hasImage, title, commentNum, datePosted }) =>{
    const navigation = useNavigation();
    const [imgUrl, setImageUrl] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const gotoViewPost = () =>{
        navigation.navigate("Post Screen",
            {
                username,
                email,
                content,
                imgUrl,
                title,
                commentNum,
                datePosted: datePosted.toString(),
                profilePictureURL,
                postId: _id
            }
        )
    }

    useEffect(() =>{
        if(hasImage){
            getImage(postImage);
        }
        if(!(profilePictureURL.length)){
            getUser();
        }
    }, []);

    const getUser = async() =>{
        try{
            const user = await axios.get(`http:${localMachineIPAddress}:${port}/${apiStartString}/findUser?email=${email}`)
            .then(result =>{
                if(result && result.data && result.data.data ){
                    return result.data.data;
                }else{
                    return result.data;
                }
                // set the profileimage url
            })
            .catch(err =>{
                console.log(err);
                return null
            })
            if(user && user.profilePictureURL && user.profilePictureURL.length){
                await axios.get(`http://${localMachineIPAddress}:${port}/api/getImageUrl?objectKey=${user.profilePictureURL}`)
                .then(result =>{
                    if(result && result.data && result.data.data){
                        setProfilePictureURL(result.data.data);
                    }else{
                        setProfilePictureURL(result.data);
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
            }
        }catch(err){
            console.log(err);
        }
    }
    const getImage = (objectKey) =>{
        axios.get(`http://${localMachineIPAddress}:${port}/api/getImageUrl?objectKey=${objectKey}`)
        .then(result =>{
            if(result && result.data){
                setImageUrl(result.data.data);
            }
            throw new Error("no url found");
        }).catch(
            err=>{
                console.log(err);
            }
        )
    }
    return (
        <SafeAreaView>
            <TouchableOpacity style = {[styles.postContainer]}
            onPress={gotoViewPost}
            >
                {/* top container */}
                <View style = {[styles.postTopContainer]}>
                    <View style = {[styles.profileContainer]}>
                        {/* profile picture */}
                        <Avatar
                            size={50}
                            rounded
                            // title="Rd"
                            containerStyle={{ backgroundColor: Color.colorPalevioletred}}
                            title ={capitalizeFirstLetter(username[0])}
                            source={profilePictureURL.length? {uri:profilePictureURL} : null}
                        />
                        {/* username */}
                        <Text style={[styles.username]}>{username}</Text>
                    </View>
                    {/* content */}
                    <View style = {[styles.contentContainer]}>
                        {/* title */}
                        <Text style = {[styles.postTitle]}>{title}</Text>
                        {/* content */}
                        <Text numberOfLines={3} style = {[styles.contentText]}>
                        {content}
                        </Text>
                    </View>
                </View>
                {/* image part */}
                {
                    imgUrl.length?
                    <View style={[styles.postImageContainer]}>
                        <View style = {[styles.contentImageContainer]}>
                            <Image
                            style = {[styles.postImage]}
                            resizeMode="cover"
                            source={{uri:imgUrl}}
                            />
                        </View>
                    </View>: <></>
                }
                {/* bottom part */}
                <View  style = {[styles.bottomContainer]}>
                    {/* comment stuff */}
                    <View style = {[styles.bottomContentContainer]}>
                        <View style={[styles.flexContainer, styles.commentSection]}>
                            <Image
                            style = {[styles.commentIcon]}
                            source={require("../assets/forum/comment-2.png")}
                            />
                            <Text style={[styles.username]}>{commentNum} comments</Text>
                        </View>
                        <View style = {[styles.flexContainer, styles.commentSection]}>
                            <Text style={[styles.username]}>{convertToMDY(datePosted)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer:{
        flex:1
    },
    postContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_3xs,
        left: 19,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        backgroundColor: Color.colorWhite,
        width: '90%',
        marginBottom:10
    },
    postTopContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 90,
    },
    profileContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer:{
        flex: 3,
    },
    profilePicture:{
        borderRadius: 24,
        width: 48,
        height: 48,
        overflow: "hidden",
    },
    username:{
        color: Color.colorLightslategray,
        lineHeight: 18,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_3xs,
    },
    contentText:{
        lineHeight: 14,
        color: Color.colorSilver,
        width: 260,
        fontSize: FontSize.size_3xs,
        textAlign: "left",
        fontFamily: FontFamily.interRegular
    },
    postTitle:{
        fontSize: FontSize.size_2xs,
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslateblue,
        fontWeight: "700",
        lineHeight: 18,
        textAlign: "left",
    },
    postImageContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contentImageContainer:{
        width: '75%',
        justifyContent: 'flex-start',
        flexDirection:'row'
    },
    postImage:{
        width: '95%',
        maxHeight: 247,
        minHeight: 270
    },
    bottomContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 35,
        maxHeight: 35,
    },
    bottomContentContainer:
    {
        flexDirection: 'row',
        width: "90%"
    },
    commentSection:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    commentIcon:{
        height: 12,
        width: 12,
        overflow: 'hidden'
    }
})
export default PostContainer