import React from "react";
import Realm, { User } from "realm";
import { AppProvider, UserProvider,useApp, RealmProvider, useApp } from "@realm/react";
import { APP_ID } from "../database/RealmConfig";
import { Button } from "react-native";
function CopySyncedDataToLocal(){
    return (
        <AppProvider id={APP_ID}>
            <UserProvider fallback={LogIn}>
            </UserProvider>
        </AppProvider>
    )
}

function LogIn(){
    const APP = useApp();

    async function logInAnonymous(){
        await APP.logIn(Realm.Credentials.anonymous);
    }

    return (
        <Button title="Log In"
        onPress={logInAnonymous}>
        
        </Button>
    )
}

function createLocalRealm(){
    
}