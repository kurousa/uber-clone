import React from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  Image,
  View
} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[
      styles.container, 
      tw `bg-white h-full`
      ]
    }>
      <ExpoStatusBar style="auto" />
      <View style={tw `p-5`}>
        <Image 
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain"
          }}
          source={require("../images/Uber-Logo.png")}
        />

      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          }
        }}
        onPress={(data, details = null) => {
          dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description
          }))

          dispatch(setDestination(null))
        }}
        fetchDetails={true}
        returnKeyType={"search"}
        minLength={2}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'ja'
        }}
        placeholder='Where From?'
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
      />

        <NavOptions />
        <Text>Favorite Places</Text>
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: 'blue',
  }
});