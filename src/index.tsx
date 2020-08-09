import React, { FC, useRef } from 'react'
import { Animated, PanResponder, StyleSheet, View } from 'react-native'
import { ScaleViewProps } from './types'

const ScaleView: FC<ScaleViewProps> = ({
  children,
  ...props
}) => {

  // const positionY = useRef<Animated.Value>(new Animated.Value(0))
  // const positionX = useRef<Animated.Value>(new Animated.Value(0))
  const pan = useRef(new Animated.ValueXY()).current
  const scale = useRef(new Animated.Value(1)).current
  const initialDistance = useRef(0)

  const panResponder = React.useRef(PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      console.log('onPanResponderGrant', gestureState.numberActiveTouches)
      // pan.setOffset({
      //   x: pan.x._value,
      //   y: pan.y._value,
      // })
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('onPanResponderMove', gestureState.numberActiveTouches)
      if (gestureState.numberActiveTouches === 1) {
        initialDistance.current = 0
        // pan.setValue({
        //   x: gestureState.dx,
        //   y: gestureState.dy,
        // })
      } else if (gestureState.numberActiveTouches === 2) {
        const firstTouch = evt.nativeEvent.touches[0]
        const secondTouch = evt.nativeEvent.touches[1]
        const a = Math.abs(secondTouch.pageX - firstTouch.pageX)
        const b = Math.abs(secondTouch.pageY - firstTouch.pageY)
        const distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
        const distanceDifference = distance - initialDistance.current
        console.log('distance', distance, distanceDifference)
        if (initialDistance.current === 0) {
          initialDistance.current = distance
        } else if (distanceDifference > 0) {
          // TODO increase scale
          scale.setValue(distanceDifference / 20)
        } else if (distanceDifference < 0) {
          // TODO decrease scale
        }
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      console.log('onPanResponderRelease', gestureState)
      initialDistance.current = 0
      // pan.flattenOffset()
    },
  })).current

  return (
    <View style={styles.scaleView}>
      <Animated.View
        style={[
          styles.contentView,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale: scale },
            ],
          },
        ]}
        {...panResponder.panHandlers}
        {...props}
      >
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  scaleView: {
    flex: 1,
    flexGrow: 1,
    position: 'relative',
    backgroundColor: 'red',
  },
  contentView: {
    position: 'absolute',
    top: 0,
    left: 0,
    // width: 300,
    // height: 400,
    backgroundColor: 'green',
    overflow: 'hidden',
  },
})

export default ScaleView
