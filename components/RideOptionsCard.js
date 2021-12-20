import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInfomation, setTravelTimeInformation } from '../slices/navSlice';
import "intl";
import "intl/locale-data/jsonp/ja";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: require("../images/UberX.webp"),
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: require("../images/UberXL.webp"),
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../images/Lux.webp"),
  },
]

const SURGE_CHARGE_RATE = 3

const RideOptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const travelTimeInfomation = useSelector(selectTravelTimeInfomation);

  return (
    <SafeAreaView style={tw `bg-white flex-grow`}>
      <View>
        <Text style={tw `text-center py-4 text-xl`}>Select a Ride - {travelTimeInfomation?.distance?.text}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item: { id, title, multiplier, image}, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw `flex-row items-center justify-between px-10 
            ${id === selected?.id && "bg-gray-200"} `}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={image}
            />
            <View>
              <Text style={tw `text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInfomation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw `text-xl`}>
              {new Intl.NumberFormat('ja-JP', { 
                style: 'currency', 
                currency: 'JPY' 
              }).format(
                (travelTimeInfomation?.duration?.value * 
                  SURGE_CHARGE_RATE * 
                  multiplier)
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw `mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          disable={!selected} 
          style={tw `bg-black py-3 m-3 
          ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw `text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
