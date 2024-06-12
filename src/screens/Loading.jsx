import { StyleSheet, 
    View, 
    Image, 
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
const LoadingScreen = () =>{
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            {/* loading container */}
            <View style={[styles.loadinContainer]}>
                <ActivityIndicator
                    style={styles.mingcuteloadingFill}
                    animating={true}
                    size="large"
                    color="#fff"
                />
            </View>
            {/* footer */}
            <View style ={[styles.footerContainer]}>
                <Image
                style= {[styles.pawslinkLogo]}
                source={require("../assets/logo/pawslink_white.png")}
                resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#d2628a",
        shadowColor: "rgba(18, 15, 40, 0.12)",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        width: "100%",
        overflow: "hidden",
    },
    loadinContainer:{
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pawslinkLogo:{
        width: 188,
        height: 188,
    }
})

export default LoadingScreen