import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { fetch } from "@react-native-community/netinfo";

import BrowseAnimalWrapper from "../screens/BrowseAnimals";
import AnimalQRCodeScanner from "../screens/AnimalQRCodeScanner";
import { ConnectionContext } from "./ConnectionContext";
import NeedLoginScreen from "../screens/NeedLogInScreen";
import EventsScreen from "../screens/EventsScreen";
import ProfileScreen from "../screens/ProfileScreen";

// tab screens
import WrappedForumScreen from "../screens/ForumScreen";
// one time check if device has internet connection
const internetConnectivity = async () =>{
  const connection = await fetch().then(state => {
    return state.isConnected
  }).catch(err => {
    throw err
  })
}

const Tab = createBottomTabNavigator();

const BottomTabs = () =>{
  const isConnected = internetConnectivity()
  return(
    // create a global context for internet connection
    <ConnectionContext.Provider value={isConnected}>
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          shadowColor: "rgba(23, 26, 31, 0.12)",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 2,
          elevation: 2,
          shadowOpacity: 1,
          height: 84,
          }
      }}
      >
        <Tab.Screen
          name="Browse Animals"
          component={BrowseAnimalWrapper}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source = {require('../assets/bottom_tabs/paw-1.png')}
                  resizeMode = "contain"
                  style = {
                    [{
                      tintColor: focused? "#774a7f" : "#171a1f"
                    }, styles.tabIconSize]
                  }
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source = {require('../assets/bottom_tabs/calendar-event-1.png')}
                resizeMode="contain"
                style = {
                  [{
                    tintColor: focused? "#774a7f" : "#171a1f"
                  }, styles.tabIconSize]
                }
              />
            </View>
          )
        }}
        />
        <Tab.Screen
          name="QR Code Scanner"
          component={AnimalQRCodeScanner}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source = {require('../assets/bottom_tabs/aperture-1.png')}
                  style = {
                    [{
                      tintColor: focused? "#774a7f" : "#171a1f",
                      width: 45,
                      height: 45,
                    }]
                  }
                />
              </View>
            ),
            tabBarButton: (props) => (
              <ScanButton {...props}></ScanButton>
            )
          }}
        />
        <Tab.Screen
          name="Forums"
          component={
            WrappedForumScreen
          }
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source = {require('../assets/bottom_tabs/comments-1.png')}
                  style = {
                    [{
                      tintColor: focused? "#774a7f" : "#171a1f"
                    }, styles.tabIconSize]
                  }
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source = {require('../assets/bottom_tabs/profile-1.png')}
                  style = {
                    [{
                      tintColor: focused? "#774a7f" : "#171a1f"
                    }, styles.tabIconSize]
                  }
                />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </ConnectionContext.Provider>
  )
}
// icon for the scan tab
const ScanButton = ({children, onPress}) => (
    <TouchableOpacity
    onPress={onPress}
    style = {{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <View style = {{
      height: 90,
      width: 90,
      borderRadius: 35,
    }}
    >
        {children}
      </View>
    </TouchableOpacity>
)

export default BottomTabs
const styles = StyleSheet.create({
    tabIconSize: {
      width: 30,
      height: 30
    }
  })