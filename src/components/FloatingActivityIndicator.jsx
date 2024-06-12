import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";

const FloatingActivityIndicator = () => {
    return (
        <SafeAreaView style = {[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });

  export default FloatingActivityIndicator