import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from "react-native-elements";
import tw from 'tailwind-react-native-classnames';

// Mock
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "日本、東京都千代田区千代田１－１ 皇居"
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "日本、東京都千代田区永田町１丁目７－１ 国会議事堂"
  },
]

const NavFavourites = () => {

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => (item.id)}
        ItemSeparatorComponent={() => (
          <View style={[tw `bg-gray-200 h-1`, { height: 0.5 }]} />
        )}
        renderItem={({item: { location, destination, icon }}) => (
          <TouchableOpacity style={tw `flex-row items-center p-5`}>
            <Icon
              style={tw `mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw `font-semibold text-lg`}>{location}</Text>
              <Text style={tw `text-gray-400 text-xs`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      >

      </FlatList>
    </View>
  )
}

export default NavFavourites

const styles = StyleSheet.create({})
