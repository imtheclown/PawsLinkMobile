import * as React from "react";
import { 
    Text, 
    StyleSheet, 
    View, 
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Modal
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/forum/GlobalStyles";
import PostContainer from "../components/PostContainer";
import { useNavigation } from "@react-navigation/native";
import NeedLoginScreen from "./NeedLogInScreen";
import LoadingScreen from "./Loading";
import { useState, useEffect } from "react";
import { useQuery, useContext } from "@realm/react";
import { SavedUser } from "../database/schemas/SavedUser";
import CreatePostScreen from "./CreatePostScreen";

const ForumScreen = () =>{
    const[create, setCreate] = useState(false);
    const data = useQuery(ForumEntry);
    console.log(data);
    const navigation = useNavigation();
    const gotoCreatePost = () => {
        navigation.navigate("Create Post")
    }

    const toggleCreate = () =>{
        setCreate(!create);
    }
    return(
        <SafeAreaView style = {[styles.flexContainer]}>
            {/* main container */}
            <View style = {[styles.flexContainer, styles.mainContainer]}>
                {/* top container */}
                <View style = {[styles.topContainer]}>
                    <View style = {[styles.topContentContainer]}>
                        <View style = {[styles.topTextContainer]}>
                            <Text style={[styles.hiUserText]}>
                                hi, user
                            </Text>
                            <Text style={[styles.haveSomethingText]}>
                                have something to share?
                            </Text>
                        </View>
                        <TouchableOpacity style= {[styles.addPostButton]}
                        onPress={gotoCreatePost}
                        >
                            <Text style ={[styles.addPostText]}>
                                + add a post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* bottom container */}
                <ScrollView
                style = {[styles.scrollViewStyle]}>
                    {
                        data.map((post) =>{
                            return(
                                <PostContainer
                                key={post._id}
                                username={post.username}
                                content={post.content}
                                email={post.email}
                                title={post.title}
                                commentNum={post.commentNum}
                                hasImage={post.entryImageURL.length? true: false}
                                datePosted={post.datePosted}
                                postImage={post.entryImageURL}
                                _id ={post._id}
                                />
                            )

                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    mainContainer: {
        alignItems: 'center',
    },
    topContainer: {
        width: '100%',
        height: '20%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContentContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
        width: '90%',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_9xs,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        borderRadius: Border.br_9xs
    },
    topTextContainer:{
        justifyContent:'flex-start',
        width: '95%'
    },
    hiUserText:{
        fontSize: 24,
        lineHeight: 32,
        fontFamily: FontFamily.epilogueBold,
        color: Color.colorPalevioletred,
        fontWeight: "700",
        textAlign: 'left'
    },
    haveSomethingText:{
        fontSize: 12,
        lineHeight: 26,
        color: "#424856",
        fontFamily: FontFamily.interRegular,
    },
    addPostButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorPalevioletred,
        height: 36,
        width: '100%',
        borderRadius: Border.br_9xs,
        overflow: "hidden",
        left: 0,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    addPostText:{
        fontSize: 14,
        lineHeight: 22,
        color: Color.colorWhite,
        fontFamily: FontFamily.interRegular
    },
    scrollViewStyle:{
        width: '100%',
        height: '80%'
    },
    // post container styles
})

// imports for the realm wrappers

import {UserProvider, RealmProvider, useRealm } from "@realm/react";
import { ForumEntry } from "../database/schemas/ForumEntry";
import { ForumRealmProvider, useForumRealmProvider } from "../database/REALM/realmContext";

const WrappedForumScreen = () => {
    return (
      <UserProvider fallback={NeedLoginScreen}>
        <RealmProvider schema={[ForumEntry]}
        path="forum.realm" fallback={LoadingScreen}
        sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(ForumEntry));
              },
            },
          }}>
            <ForumScreen/>
        </RealmProvider>
      </UserProvider>
    )
  }
export default WrappedForumScreen

