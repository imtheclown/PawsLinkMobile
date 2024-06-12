import {SearchBar } from "@rneui/themed";
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState} from "react";

import { FontFamily, Border, Color } from "../assets/browse_animals/GlobalStyles";

const BrowseAnimalSearchBar = ({onSearch, searchSetter}) =>{
    const [searchKeyWord, setSearchKeyWord] = useState('')
    const [pressed, setPressed] = useState(false)
    const updateSearch = (search) =>{
        setSearchKeyWord(search);
    }
    const searchAnimal = () => {
        if(pressed && (searchKeyWord.length === 0)){
            setPressed(false)
        }
        if(searchKeyWord.length){
            onSearch(searchKeyWord)
        }
        
    }
    const clearSearchBox = () =>{
        setSearchKeyWord('')
    }
    return(
        <View style={[styles.searchBarContainer]}>
            {
                !pressed?
                <Image
                resizeMode="cover"
                source={require("../assets/browse_animals/search1.png")}
                style ={[styles.searchIcon]}
                />: <></>
                
            }
            <TextInput
            onChangeText={updateSearch}
            style={[styles.searchBar, styles.searchBarOccupy]}
            placeholder="search"
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor="#171a1f"
            onSubmitEditing = {searchAnimal}
            value={searchKeyWord}
            onFocus={() => {setPressed(true)
                searchSetter(true);
            }}
            onBlur={() => {
                setPressed(false);
                searchSetter(false);
            }}
            />
            {
                (pressed && searchKeyWord.length)?
                <TouchableOpacity
                onPress={clearSearchBox}
                >
                    <Image
                    source={require("../assets/browse_animals/cancel.png")}
                    resizeMode="cover"
                    style ={[styles.cancelIcon]}
                    />
                </TouchableOpacity>: <></>
            }
        </View>
    )
}

export default BrowseAnimalSearchBar

const styles = StyleSheet.create({
    searchBar: {
        width: 297,
        fontSize: 16,
        fontFamily: FontFamily.interRegular,
        height: 48,
        borderRadius: Border.br_5xs,
        backgroundColor: Color.colorWhite,
        color: "#171a1f"
    },
    searchBarContainer: {
        alignItems:'center',
        width: 297,
        height: 48,
        flexDirection: 'row',
        backgroundColor: Color.colorWhite,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        borderRadius: Border.br_5xs,
    },
    searchBarOccupy: {
        flex: 1
    }, 
    searchIcon: {
        height: 20,
        width: 20,
        marginLeft: 10
    },
    cancelIcon: {
        height: 20,
        width: 20,
        marginRight: 10
    }
})