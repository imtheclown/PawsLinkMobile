import * as React from "react";
import { StyleSheet, 
    View, 
    Text, 
    Pressable, 
    Image,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/id_verification/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";

const IdVerification = () =>{
    return (
        <>
        <View style = {[styles.filePickerContainer]}>
            <View>
                <Text style ={[styles.verificationText]}>
                {`Please attach a copy of your ID for us to verify your identity.`}
                </Text>
            </View>
            {/* selection */}
            <View style ={[styles.idVerificationContentContainer]}>
                {/* top view */}
                <View style ={[styles.flexContainer, styles.idVerTopContainer]}>
                    <View style ={[styles.idVerTopContentContainer]}>
                        <Text style ={[styles.idVerTopContainerText]}>
                        id photo
                        </Text>
                        <TouchableOpacity>
                            <Image
                            style ={[styles.removeButton]}
                            resizeMode="cover"
                            source={require("../assets/id_verification/e-remove-2.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* mid view */}
                <TouchableOpacity style ={[styles.flexContainer, styles.idVertMidContainer]}
                    onPress={async () => {
                        try {
                            const [pickResult] = await pick()
                            // const [pickResult] = await pick({mode:'import'}) // equivalent
                            // do something with the picked file
                        } catch (err) {
                            console.log(err)
                        }
                        }}
                >
                        <Text style ={[styles.idVerTopContainerText]}>
                            {capitalizeFirstLetter("attach file")}
                        </Text>
                        <Text style ={[styles.supportedFormatText]}>
                            {capitalizeFirstLetter("supported format: PNG, JPG")}
                        </Text>
                </TouchableOpacity>
                {/* bot view */}
                <View style ={[styles.flexContainer, styles.idVertBottomContainer]}>
                    <TouchableOpacity style ={[styles.idVertButton]}>
                        <Text style ={[styles.idVerButtonText, styles.idVerCancelText]}>{capitalizeFirstLetter("cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={[styles.idVertButton, styles.idverUploadButton]}>
                        <Text style ={[styles.idVerButtonText, styles.idVerUploadText]}>{capitalizeFirstLetter("upload")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    filePickerContainer:{
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    verificationText:{
        color: Color.colorGray_100,
        lineHeight: 26,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    },
    idVerificationContentContainer:{
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 230,
        borderRadius: Border.br_7xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    idVerTopContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '90%'
    },
    idVerTopContentContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    idVerTopContainerText:{
        fontFamily: FontFamily.epilogueRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        color: Color.colorGray_100,
        textAlign: "left",
    },
    removeButton:{
        width: 28,
        height: 28
    },
    idVertMidContainer:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '100%',
        backgroundColor: "#fafafb",
        borderStyle: "dashed",
        borderColor: "#bdc1ca",
        borderWidth: 2,
        borderRadius: Border.br_7xs,
    },
    supportedFormatText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorSlategray,
    },
    idVertBottomContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    idVertButton:{
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: Border.br_9xs,
        width: 82,
        height: 36,
    },
    idverUploadButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    idVerButtonText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
    },
    idVerUploadText:{
        color: Color.colorWhite,
    },
    idVerCancelText:{
        color: "#9095a1",
    }
})

export default IdVerification();