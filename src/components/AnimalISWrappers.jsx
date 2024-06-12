// This component is used to create a connection between the mongoDB application and the mobile app
// This is for animal informatin system only
// Initial data is loaded from the realm
// Data is synced in background

import React from "react";
import { AppProvider, RealmProvider, UserProvider} from "@realm/react";
import { Animal } from "../database/schemas/Schema";
import { APP_ID } from "../database/RealmConfig";
// copies the realm files to the device
// used to prepopulated the realm database


// will be used if device has history of being connected to the internet
function AnimalISSyncWrapper({children}){
    console.log(APP_ID)
    return (
        // insert app id here
        <AppProvider id = {APP_ID}>
            {/* insert function here to authenticate user if there is no existing user */}
            <UserProvider fallback={""}>
                <RealmProvider
                schema={[Animal]}
                // enables flexible and offline sync
                sync={{
                    flexible:true,
                    initialSubscriptions:{
                        update(subs, realm){
                            subs.add(realm.objects(Animal))
                        }
                    }
                }}
                path="PawsLinkSync.realm"
                >
                    {/* the components that needs to access the database */}
                    {children}
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    )
}

function Login(){
    
}

// this is only when the app is newly installed and there is no internet connection
function AnimalISLocalWrapper({children})
{
    console.log(APP_ID)
    return (
        <RealmProvider 
        schema={[Animal]}
        path="PawsLinkLocal.realm"
        >
            {children}
        </RealmProvider>
    )
}

export {AnimalISLocalWrapper, AnimalISSyncWrapper}


