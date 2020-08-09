import React from 'react'
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import ScaleView from '@anvilapp/react-native-scale-view'

const { width } = Dimensions.get('window')

const App = () => {
  return (
    <View style={styles.containerView}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScaleView>
          <Image style={styles.image} source={require('./assets/bike.jpg')} />
        </ScaleView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  image: {
    width,
    height: width * 10 / 16,
  },
})

export default App
