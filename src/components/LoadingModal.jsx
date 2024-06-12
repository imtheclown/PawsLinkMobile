
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
  } from 'react-native';

const LoadingModal = ({isLoading, textTitle}) => {
    return (
        <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}
        onRequestClose={() => {console.log('close modal')}}
        >
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
            {textTitle? <Text style ={[styles.modalText]}>{textTitle}</Text>: <></>}
              <ActivityIndicator
                  animating={isLoading}
                  size="large" 
                  color="#00ff00"
              />
            </View>
        </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      minHeight: 100,
      minWidth: 100,
      height: 'auto',
      width: 'auto',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    modalText:{
      margin: 10,
      color: 'black'
    }
  });

export default LoadingModal