import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import AnimalProfileBox from "../components/AnimalProfileBox";
import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
import LoadingModal from "../components/LoadingModal";
import { useState, useEffect } from "react";
import UpdateDateSchema from "../database/schemas/UpdateDate";
import { fetch } from "@react-native-community/netinfo";
import axios from "axios";
import { localMachineIPAddress, port } from "../utils/networkConf";
import { Realm } from "realm";
import { Border, Color, FontSize, FontFamily } from "../assets/bottom_tabs/GlobalStyles";
// returns JSX element wrapped in Realm elements
// access to database, both local and synced
import { AnimalSchema } from "../database/schemas/Schema";
import { AnimalProvider, useAnimalObject, useAnimalQuery, useAnimalRealm } from "../context/RealmContext";
import { UpdateDateProvider, useUpdateDateQuery, useUpdateDateRealm } from "../context/RealmContext";
const BrowseAnimalWrapper = () => {
    return (
        <AnimalProvider>
            <UpdateDateProvider>
                <BrowseAnimalMainContent/>
            </UpdateDateProvider>
        </AnimalProvider>
    )
}
export default BrowseAnimalWrapper;

import { useNavigation } from "@react-navigation/native";
import FilterDropDownList from "../components/FilterDropDownList";
import DropDownPicker from 'react-native-dropdown-picker';

const animalTypes = [
    {
        label: 'ALL',
        value: null
    },
    {
        label: 'DOG',
        value: 'dog'
    },
    {
        label: 'CAT',
        value: 'cat'
    }
]


function BrowseAnimalMainContent(){
    const navigation = useNavigation();
    const animalQuery = useAnimalQuery(AnimalSchema);
    const updateDateQuery = useUpdateDateQuery(UpdateDateSchema);
    const animalRealm = useAnimalRealm();
    const updateDateRealm = useUpdateDateRealm();
    // create an array from the query as it has type of Result<Animal> which is not equivalent to primitive array
    const animals = Array.from(animalQuery)
    // all animals upon the opening of the up

    const[isConnected, setIsconnected] = useState(false);
    const [animalList, setAnimalList] = useState([]);

    // filterlist
    const [locationList, setLocationList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [statusList, setStatusList] = useState([])

    // filter values

    const [animalType, setAnimalType] = useState(null);
    const [colorFilter, setColorFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null)

    const [isSearching, setIsSearching] = useState(false);

    const [isLoading, setIsloading] = useState(false);
    const [newLoad, setNewLoad] = useState(true);

    // loading variables
    const [loadingText, setLoadingText] = useState("");

    useEffect(() =>{
        checkInternetConnection();
        if(isConnected){
            updateAnimalCollection();
        }
        if(newLoad){
            getUniqueColors();
            getUniqueLocation();
            getUniqueStatus();
            setNewLoad(false);
        }
        if(!isSearching){
            filterAnimals();
        }
    }, [animalType, colorFilter, locationFilter, statusFilter, isConnected, animalQuery])

    const filterAnimals = () =>{
        var newAnimalList = animals;
        if(animalType && animalType.value){
            newAnimalList = newAnimalList.filter(animal => {
                return animal.species.toLowerCase() === animalType.value
            });
        }
        if(locationFilter && locationFilter.value){
            newAnimalList = newAnimalList.filter(animal => animal.location.toLowerCase() === locationFilter.value);
        }
        if(statusFilter && statusFilter.value){
            newAnimalList = newAnimalList.filter(animal => animal.status.some(stat => stat.toLowerCase() === statusFilter.value));
        }
        if(colorFilter && colorFilter.value){
            newAnimalList = newAnimalList.filter(animal => animal.coatColor.some(color => color.torLowerCase() === colorFilter.value))
        }
        console.log(animalType, locationFilter, colorFilter, statusFilter)
        setAnimalList(newAnimalList);
    }

    // check this later
    const updateAnimalCollection = async() =>{
        var updates;
        if(updateDateQuery.length){
            // non empty
            // there is a previous update

            // store only one instance of updateDate
            const lastUpdate = updateDateQuery[0];
            updates = await getUpdates(`&_id=${lastUpdate._id}`);
        }else{
            updates = await getUpdates("");
        }
        setLoadingText('updating');
        console.log(updates);
        setIsloading(true);
        await write(updates);
        setIsloading(false);
    }

    const write = async (updates) =>{
        for(var i = 0; i < updates.length; i++){
            console.log(i);
            console.log(updates[i].mainName);
            try{
                var result =  await axios.get(`http://${localMachineIPAddress}:${port}/api/getanimals?_id=${updates[i].documentId}`)
                .then(result =>{
                    if(result && result.data && result.data.data){
                        return result.data.data;
                    }else{
                        return result.data;
                    }
                }).catch(err=>{
                    console.log(err);
                    throw new Error(err);
                });
                
                if(result.length){
                    const animal = result[0];
                    console.log(animal.mainName);
                    animal["_id"] = newId = Realm.BSON.ObjectID(animal._id);
                    await animalRealm.write(async ()=>{
                        await animalRealm.create(AnimalSchema, animal, 'modified')
                    })
                    .then(()=>{
                        console.log(`successfully wrote animal with name ${animal.mainName}`);
                        updateDateRealm.write(async() =>{
                            const updateData = {
                                documentId: updates[i].documentId,
                                lastUpdate: new Date()
                            }
                            if(updateDateQuery.length){
                                updateData["_id"] = updateDateQuery[0]._id
                            }else{
                                updateData["_id"] = new Realm.BSON.ObjectId();
                            }
                            updateDateRealm.create(UpdateDateSchema, updateData,'modified')
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        throw new Error(`failed to write animal with name ${animal.mainName}`);
                    });
                }
            }catch(err){
                console.log(err);
                // break for data consistency
                break;
            }
        }

    }

    const checkInternetConnection = async () =>{
        await fetch()
        .then(result =>{
            if(result.isConnected){
                setIsconnected(true);
            }else{
                setIsconnected(false);
            }
        }).catch(err =>{
            console.log(err);
            setIsconnected(false);
        })
    }
    const getUpdates = async (idParams) =>{
        console.log("getting updates")
        setIsloading(true);
        setLoadingText("getting updates")
        const updates = await axios.get(`http://${localMachineIPAddress}:${port}/api/getAdminLog?collectionName=animals${idParams}`)
        .then(result =>{
            if(result && result.data){
                return result.data
            }
            return []
        }).catch(err =>{
            console.log(err)
        })
        setIsloading(false);
        return updates;
        
    }

    const getUniqueColors = () =>{
        if(animalQuery.length){
            const colorSet = new Set();
            animalQuery.forEach(animal => {
                const {coatColor} = animal;
                coatColor.forEach(color =>{
                    colorSet.add(color);
                })
            });
            const newColorList = [];
            newColorList.push({
                label: "ALL",
                value: null
            })
            colorSet.forEach(color =>{
                const item = {
                    value: color.toLowerCase(),
                    label: color.toUpperCase()
                }
                newColorList.append(item)
            })
            setColorList(newColorList);
        }
    }

    const getUniqueStatus = () =>{
        if(animalQuery.length){
            const statList = new Set()
            animalQuery.forEach(animal =>{
                const {status} = animal;
                status.forEach(stat =>{
                    statList.add(stat);
                })
            });
            const newStatList = [];
            newStatList.push({
                label: 'ALL',
                value: null
            })
            statList.forEach(stat =>{
                const item ={
                    value: stat.toLowerCase(),
                    label: stat.toUpperCase()
                };
                newStatList.push(item);
            })
            setStatusList(newStatList);
        }
    }

    const getUniqueLocation = () =>{
        if(animalQuery.length){
            const locList = new Set()
            animalQuery.forEach(animal =>{
                const {location} = animal;
                locList.add(location);
            });
            const newLocList = [];
            newLocList.push({
                label: "ALL",
                value: null
            })
            locList.forEach(loc =>{
                const item ={
                    value: loc.toLowerCase(),
                    label: loc.toUpperCase()
                };
                newLocList.push(item);
            })
            setLocationList(newLocList);
        }
    }

    const searchAnimal = (searchString) =>{
        resetFilters();
        const regex = new RegExp(searchString, 'i');
        const searchedArray = animals.filter(animal => regex.test(animal.mainName));
        setAnimalList(searchedArray);

    }

    const resetFilters = () =>{
        setAnimalType(null);
        setColorFilter(null);
        setLocationFilter(null);
        setStatusFilter(null)
    }
    const gotoAdminMessage = () =>{
        navigation.navigate("Message Admin")
    }
    return (
        <SafeAreaView
            style={styles.mainContainer}
        >
            {/* this is the top view
                includes: logo
                search bar and notif bar
                tags
                title */}
            <LoadingModal 
            textTitle={loadingText}
            isLoading={isLoading}
            />
            <View style ={ styles.topContainer}>
                <View>
                    {/* for the PawsLink logo */}
                    <Image
                        style={styles.pawsLinkLogo}
                        resizeMode="cover"
                        source={require("../assets/browse_animals/image-23.png")}
                    />
                </View>
                <View style = {[ styles.searchBarNotifContainer]} >
                    {/* for the search bar and the notif bar */}
                    <View>
                        <BrowseAnimalSearchBar onSearch={searchAnimal} searchSetter = {setIsSearching}/>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress = {gotoAdminMessage}
                        >
                            <Image 
                            style = {styles.notifIcon}
                            resizeMode="cover"
                            source={require("../assets/browse_animals/container-72.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style ={[styles.sectionContainer]}>
                    <View>
                        <Text style={styles.browseAnimalTitle} >
                            browse animals
                        </Text>
                        <View style = {[styles.dropDownContainer]}>
                            {/* this is for the dropdown filters */}
                            <FilterDropDownList
                                filterList={animalTypes}
                                value={animalType}
                                valueSetter={setAnimalType}
                                placeholder={"Type"}
                            />
                            <FilterDropDownList
                                filterList={colorList}
                                value={colorFilter}
                                valueSetter={setColorFilter}
                                placeholder={"Color"}
                            />
                            <FilterDropDownList
                                filterList={statusList}
                                value={statusFilter}
                                valueSetter={setStatusFilter}
                                placeholder={"Status"}
                            />
                            <FilterDropDownList
                                filterList={locationList}
                                value={locationFilter}
                                valueSetter={setLocationFilter}
                                placeholder={"Location"}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style = {styles.boxContainer}>
                {/* for the pressable boxes */}
                {animalList.length?
                <FlatList
                contentContainerStyle = {[styles.seperateComponents]}
                columnWrapperStyle = {styles.row}
                key={2}
                keyExtractor={(item) => item._id.toString()}
                data={animalList}
                horizontal = {false}
                numColumns={2}
                renderItem={(item) => {
                    return (
                        <AnimalProfileBox key={item.item._id.toString()}
                        flatListItem = {item}
                        >
                        </AnimalProfileBox>
                    )
                }}
                >
                </FlatList>
                :<Text style ={{color: Color.colorDarkslateblue}}>NO ANIMAL FOUND</Text>
                }
            </View>
        </SafeAreaView>
    );
}

const sortAnimals = (a, b) =>{
    return a.mainName.localeCompare(b.mainName)
}
const styles = StyleSheet.create({
    flexContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20
    }, 
    topContainer:{
        height: 'auto'
    },
    boxContainer: {
        width: '100%',
        height: '70%'
    },
    pawsLinkLogo: {
        width: 129,
        height: 57,
    },
    searchBarNotifContainer: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    notifIcon: {
        height: 48,
        width: 48
    },
    browseAnimalTitle: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#d2628a",
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100',
        height: '100'
    },
    dropDownContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
})