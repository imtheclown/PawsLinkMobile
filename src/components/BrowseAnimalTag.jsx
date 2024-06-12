import { Text, View, Pressable, StyleSheet } from "react-native"
import {FontFamily, FontSize, Border,} from "../assets/browse_animals/GlobalStyles"
const Tag = (props) =>{
    const {tagName, currentFilter, onPress} = props
    const handleClick = () =>{
        onPress(tagName)
    }
    return(
        <Pressable
        onPress={handleClick}
        >
            <Text
            style ={[{
                backgroundColor: tagName === currentFilter? "#774a7f" : "#d9d9d9",
                color: tagName === currentFilter? "#FFF" : "#171A1F"
            }, styles.tagsLetters]}
            >
            {tagName.toUpperCase()}
            </Text>
        </Pressable>
    )
}
export default Tag  
const styles = StyleSheet.create({
    tagsLetters : {
        margin: 2,
        textAlign: "center",
        lineHeight: 16,
        fontSize: FontSize.size_2xs,
        fontFamily: FontFamily.interRegular,
        minWidth: 50,
        height: 18,
        borderRadius: Border.br_4xs,
        paddingHorizontal: 5
    },
})