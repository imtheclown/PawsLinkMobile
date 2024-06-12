import {
    Image,
    StyleSheet,
    Pressable,
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    ScrollView
  } from "react-native";
import { Color, FontFamily, FontSize } from "../assets/events/GlobalStyles";
import EventPostContainer from "../components/EventPostContainer";
import axios from "axios";
import { useState,useEffect } from "react";
import { localMachineIPAddress, port, apiStartString } from "../utils/networkConf";
import LoadingModal from "../components/LoadingModal";
const EventsScreen = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getEvents = async () =>{
        setIsLoading(true)
        await axios.get(`http:${localMachineIPAddress}:${port}/${apiStartString}/getEvent?all=true`)
        .then(
            result =>{
                if(result && result.data && result.data.data){
                    setEvents(result.data.data);
                }else{
                    setEvents(result.data)
                }
                setIsLoading(false);
            }
        ).catch(err =>{
            console.log(err);
            setIsLoading(false);
        })
    }
    useEffect(() =>{
        getEvents();
    }, []);
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            <LoadingModal isLoading={isLoading}></LoadingModal>
            {/* header */}
            <View style={[styles.headerContainer]}
            >
                <Image
                style= {[styles.headerLogoStyle]}
                resizeMode="cover"
                source={require("../assets/logo/pawslink_header.png")}/>
                <Text style={[styles.eventText]} >events</Text>
            </View>

            {/* content */}
            <ScrollView 
            style ={[styles.eventContainer]}
            >
                {events.length?
                    events.map((item, index) => 
                        <EventPostContainer event={item} key={index}/>
                    ):
                    <Text style ={[styles.flexContainer, styles.eventText]}>no events</Text>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLogoStyle: {
        width: 129,
        height: 57,
    },
    headerContainer: {
        flexDirection: 'column',
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    eventText:{
        fontSize: 24,
        textAlign: "left",
        color: Color.colorPalevioletred,
        fontFamily: FontFamily.epilogueBold,
        fontWeight: "700",
        lineHeight: 32,
        textTransform: 'capitalize',
        paddingLeft: 10
    },
    eventContainer:{
        width: '90%',
        height: '80%'
    },
    eventContentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    // event container component
})

export default EventsScreen