import {
    Text,
    StyleSheet,
    Image,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    TouchableOpacity
  } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/view_post/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import ViewPostContainer from "../components/ViewPostContainer";
import { getMonth } from "../utils/DateBasedUtilityFunctions";
import ReplyContainer from "../components/ReplyContainer";
import { useState, useEffect } from "react";
import { convertToMDY } from "../utils/DateBasedUtilityFunctions";
import axios from "axios";
import { localMachineIPAddress, port, apiStartString } from "../utils/networkConf";
const ViewPostScreen = ({route, navigation}) => {
  const {
    username, 
    content, 
    title, 
    commentNum, 
    datePosted,
    imgUrl,
    profilePictureURL,
    postId
  } = route.params;
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() =>{
    getComments();
  }, [])
  const updateReplyText = (newValue) =>{
    setReplyText(newValue)
  }

  const getComments = async () =>{
    await axios.get(`http:${localMachineIPAddress}:${port}/${apiStartString}/getComment?forumEntryId=${postId}`)
    .then(result =>{
      if(result.data.data){
        setComments(result.data.data);
      }else{
        setComments(result.data);
      }
    })
  }

  const goBack = () => {
    navigation.goBack();
  }
  return(
    <SafeAreaView style ={[styles.flexContainer,styles.mainContainer, styles.centerContainer]}>
      {/* header */}
      <View style ={[styles.topContainer]}>
        <TouchableOpacity
        onPress={goBack}
        >
        <Image
          style = {[styles.returnButton]}
          resizeMode="cover"
          source={require("../assets/view_post/keyboard-backspace-1.png")}
          />
        </TouchableOpacity>
        <Text style ={[styles.viewPostText]}>{capitalizeFirstLetter(`view post`)}
        </Text>
      </View>
      <ScrollView style = {[styles.contentContainer]}
      contentContainerStyle ={[styles.centerContainer]}
      >
        {/* first is the post */}
        <ViewPostContainer 
        contentObject={
          {
            username,
            profilePictureLink : profilePictureURL,
            durationOfPost : convertToMDY(datePosted),
            title,
            contentText : content,
            imageLinkList : imgUrl
          }
        }
        />
        <View style = {[styles.replyTextContainer]}>
          <Text style ={[styles.repliesText]}>
            {capitalizeFirstLetter(`replies`) + `(${commentNum})`}
          </Text>
        </View>
        {
          comments.length?
          comments.map(comment =>{
            return <ReplyContainer
              commentObject = {
                {...comment}

              }
            />
          })
          :<Text>No Comments</Text>
        }
      </ScrollView>
      {/* the typebox */}
      {/* implement this */}
      <KeyboardAvoidingView style = {[styles.textBoxContainer]}>
        <View style = {[styles.textBoxContentContainer]}>
          {/* attachment button */}
          <TouchableOpacity style = {[styles.sideImage,styles.centerContainer]}>
            {/* get attachment button */}
            <Image
              resizeMode="cover"
              source={require("../assets/view_post/attachment.png")}
            />
          </TouchableOpacity>
          {/* the text input field */}
          <TextInput style ={[styles.textInputContainer]}
          value={replyText}
          onChangeText={updateReplyText}
          placeholder= {capitalizeFirstLetter('type here')}
          />
          {/* send button */}
          <TouchableOpacity style ={[styles.sideImage,styles.centerContainer]}>
            {/* send button */}
            <Image
            resizeMode="cover"
            source={require("../assets/view_post/send_message.png")}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexContainer:{
    flex: 1,
  },
  centerContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContainer:{
    height: 838,
    backgroundColor: Color.colorWhite,
    width: "100%",
  },
  topContainer:{
    flexDirection : "row",
    justifyContent: 'flex-start',
    alignItems:'center',
    width: '90%',
    height: '10%',
  },
  returnButton:{
    width: 35,
    height: 35,
    marginRight: 20
  },
  viewPostText :{
    color: "#774a7f",
    fontFamily: FontFamily.epilogueBold,
    fontWeight: "700",
    lineHeight: 32,
    fontSize: FontSize.size_2xl,
    textAlign: "left",
  },
  contentContainer:{
    width: '100%',
    height: '80%'
  },
  textBoxContainer:{
    width: '90%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBoxContentContainer:{
    flexDirection: 'row',
    width: '100%',
    height: '70%',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainer:{
    width: '70%',
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray
  },
  sideImage:{
    width: '15%'
  },
  repliesText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#171a1f",
    fontFamily: FontFamily.interRegular,
  },
  replyTextContainer:{
    width: '90%',
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }

})

export default ViewPostScreen;

