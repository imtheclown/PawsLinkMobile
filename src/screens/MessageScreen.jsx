import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TextInput,
  Text,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { 
    Color, 
    FontSize, 
    FontFamily, 
    Border 
} from "../assets/message_admin/GlobalStyles";

import MessageContainer from "../components/MessageContainer";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useState } from "react";

const MessageAdminScreen = ({route, navigation}) => {
    const [messageContent, setMessageContent] = useState("");

    const updateMessage = (newMessage) => {
        setMessageContent(newMessage);
    }
    const goBack = () =>{
        navigation.goBack()
    }
    return (
        <SafeAreaView style = {[, styles.flexContainer, styles.mainContainer, styles.centerContainer]}>
            <View style ={[styles.headerContainer]}>
                <TouchableOpacity
                onPress={goBack}
                >
                <Image
                    resizeMode="cover"
                    source={require("../assets/message_admin/circle-arrow-left-1.png")}
                    style = {[styles.returnButton]}
                />
                </TouchableOpacity>
                <Image
                    resizeMode="cover"
                    source={require("../assets/message_admin/image-23.png")}
                    style = {[styles.logoIcon]}
                />
                <TouchableOpacity style = {[styles.returnButton]}>

                </TouchableOpacity>
            </View>
            <ScrollView
                centerContent
                style = {[styles.normalScrollView]}
                fadingEdgeLength = {50}
            >
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer isSent={true}/>
                <MessageContainer isSent={false}/>
                <MessageContainer content={`sdfsdfsdfsdfsdfdsf`} dateSent={`just now`} isSent={true}/>
                <MessageContainer isSent={false}/>

            </ScrollView>
            <View style = {[styles.inputTextContainer, styles.centerContainer]}>
                <View style = {[styles.inputTextContentContainer]}>
                    <TextInput
                        value = {messageContent}
                        style = {[styles.textInput]}
                        placeholder={capitalizeFirstLetter('type a message')}
                        placeholderTextColor="#bdc1ca"
                        onChangeText={updateMessage}
                    />
                    {
                        messageContent.length?
                        <TouchableOpacity
                            style = {[styles.sendMessageButton]}
                        >
                            <Image
                                style = {[styles.sendMessage]}
                                resizeMode="cover"
                                source={require("../assets/message_admin/send.png")}
                            />
                        </TouchableOpacity>
                        :
                        <></>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex:1
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer:{
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        alignItems  : 'center',
        justifyContent:"space-between"
    },
    logoIcon:{
        width: 129,
        height: 57,
    },
    returnButton:{
        width: 48,
        height: 48,
    },
    scrollViewContentContainer:{

    },
    normalScrollView:{
        width: '90%',
        height: '80%'
    },
    inputTextContainer:{
        height: '10%',
        width: '100%',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
    },
    inputTextContentContainer:{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        flexDirection: 'row',
        backgroundColor: Color.colorWhitesmoke,
        borderRadius: 18,

    },
    textInput: {
        height: 50,
        width: '90%',
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        color: 'black'
    },
    sendMessageButton:{
        width:'10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    sendMessage:{
        width: 24,
        height: 24,
    }
    
})

export default MessageAdminScreen;