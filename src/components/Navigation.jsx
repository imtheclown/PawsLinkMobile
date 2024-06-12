
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./BottomTabs";
import ViewAnimal from "../screens/ViewAnimal";
import WrappedLoginScreen from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import WrappedCreatePost from "../screens/CreatePostScreen";
import LandingPageScreen from "../screens/LandingScreen";
import NeedLoginScreen from "../screens/NeedLogInScreen";
import LoadingScreen from "../screens/Loading";
import EventsScreen from "../screens/EventsScreen";
import AdoptionFormScreen1 from "../screens/AdoptionFormScreen1";
import AdoptionFormScreen2 from "../screens/AdoptionFormScreen2";
import AdoptionFormScreen3 from "../screens/AdoptionFormScreen3";
import AdoptionFormScreen4 from "../screens/AdoptionFormScreen4";
import IdVerificationScreen from "../screens/IdVerificationScreen";
import DataPrivacyContentScreen from "../screens/DataPrivacyContentScreen";
import ThankYouForAdoptionScreen from "../screens/ThankYouForAdoptionScreen";
import ViewPostScreen from "../screens/ViewPostScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import WrappedEnterCodeScreen from "../screens/EnterCodeScreen";
import { AppProvider } from "@realm/react";
import { APP_ID } from "../database/RealmConfig";
import MessageAdminScreen from "../screens/MessageScreen";
import MonthlyUpdateScreen from "../screens/MonthlyUpdatesScreen";
const AppStack = createNativeStackNavigator();

const AppNavigationStack = () =>{
    return(
        <AppStack.Navigator>
            <AppStack.Screen
            name="Landing Page"
            component={LandingPageScreen}
            options={{
              headerShown : false
            }}/>
            <AppStack.Screen
            name="Home" 
            component={BottomTabs}
            options={{
              headerShown: false
              }
            }/>
            <AppStack.Screen 
            name="View Animal" 
            component={ViewAnimal}
            options={{
              headerShown: false
              }
            }/>
            <AppStack.Screen
            name="Sign In"
            component={WrappedLoginScreen}
            options={{
              headerShown: false
              }
            }
            />
            <AppStack.Screen
            name="Sign Up"
            component={SignUp}
            options={{
              headerShown: false
              }
            }
            />
            <AppStack.Screen
            name="Adoption Form 1"
            component={AdoptionFormScreen1}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Adoption Form 2"
            component={AdoptionFormScreen2}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Adoption Form 3"
            component={AdoptionFormScreen3}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Adoption Form 4"
            component = {AdoptionFormScreen4}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name = "ID Verification"
            component ={IdVerificationScreen}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name = "Data Privacy Consent"
            component ={DataPrivacyContentScreen}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Thank You For Adoption"
            component={ThankYouForAdoptionScreen}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Enter Code Screen"
            component={WrappedEnterCodeScreen}
            options={{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Message Admin"
            component={MessageAdminScreen}
            options={{
              headerShown:false
            }}
            />
            <AppStack.Screen
            name="Post Screen"
            component={ViewPostScreen}
            options={{
              headerShown:false
            }}
            />
            <AppStack.Screen
            name="Edit Profile"
            component={EditProfileScreen}
            options={{
              headerShown:false
            }}
            />
            <AppStack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              headerShown: false
            }}/>
            <AppStack.Screen
            name="Monthly Update"
            component={MonthlyUpdateScreen}
            options = {{
              headerShown: false
            }}
            />
            <AppStack.Screen
            name="Create Post"
            component ={WrappedCreatePost}
            options={{
              headerShown: false
            }}
            />
        </AppStack.Navigator>
    )
}
const NavigationWrapper = () => {
    return(
      <AppProvider id={APP_ID}>
          <NavigationContainer>
            <AppNavigationStack/>
          </NavigationContainer>
      </AppProvider>
    )
}

export default NavigationWrapper;