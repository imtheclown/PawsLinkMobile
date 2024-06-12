import { 
    View,
    StyleSheet,
    Image,
    Text
 } from "react-native";
 import { Avatar } from "@rneui/base";
 import { 
    Color, 
    FontSize, 
    FontFamily, 
    Border 
} from "../assets/message_admin/GlobalStyles";
 const MessageContainer = ({content,imageUrl,dateSent,isSent}) =>{
    // fetch the image url 
    return (
        <View style ={[styles.mainContainer, isSent?styles.isSent: styles.isNotSent]}>
            <View style = {[styles.contentContainer]}>
                {
                    !isSent?
                    <Avatar
                    size = 'medium'
                    title='PW'
                    rounded
                    source={{uri:'data:image/png;base64,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'}}
                    />
                    :
                    <></>

                }
                <View style ={[styles.messageContentContainer]}>
                    <View style ={[styles.contentTextContainer, isSent? styles.sentMessage: styles.recievedImage]}>
                        <Text style = {[styles.messageContentText]}>
                           {content}
                        </Text>
                    </View>
                    <Text style = {[styles.timeText]}>
                        {dateSent}
                    </Text>
                </View>
            </View>
        </View>
    )
 }

 const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    isSent:{
        alignItems: "flex-end"
    },
    isNotSent : {
        alignItems: 'flex-start'
    },
    contentContainer:{
        maxWidth: '90%',
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    messageContentContainer:{
        marginLeft: 5,
        maxWidth: '80%',
        width: 'auto',
        height: 'auto',
    },
    contentTextContainer:{
        maxWidth: '100%',
        width: 'auto',
        height: 'auto'
    },
    messageContentText:{
        width: '90%',
        fontFamily: FontFamily.epilogueRegular,
        color: Color.colorGray_100,
        textAlign: "left",
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        margin: 10
    },
    sentMessage:{
        backgroundColor: Color.colorWhitesmoke,
        borderTopLeftRadius: Border.br_5xs,
        borderTopLeftRadius: Border.br_5xs,
        borderBottomLeftRadius: Border.br_5xs,
        borderBottomRightRadius: Border.br_5xs,
    },
    recievedImage:{
        borderTopRightRadius: Border.br_5xs,
        backgroundColor: "#f1cfdb",
        borderBottomLeftRadius: Border.br_5xs,
        borderBottomRightRadius: Border.br_5xs,
    },
    timeText:{
        color: Color.colorLightslategray,
        lineHeight: 20,
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.epilogueRegular,
    },

 })

export default MessageContainer