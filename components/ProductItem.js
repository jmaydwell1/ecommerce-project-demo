import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductItem = ({item}) => {
    const handleClick = async () => {
        alert(`Added ${item.id} to Cart`)
        const userEmail = await AsyncStorage.getItem("userEmail");
        console.log(userEmail);
        axios.post("http://localhost:8000/cart", {item, userEmail}).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log("error message", error)
        })
    };
  return (
    <Pressable style={{marginHorizontal:30,marginVertical:35}}>
      <Image style={{width:200,height:200,resizeMode:"contain"}} source={{uri:item?.image}} />

      <Text numberOfLines={1} style={{width:150, marginTop:10}}>{item?.title}</Text>
      <View style={{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontSize:15, fontWeight:"bold"}}>${item?.price}</Text>
        <Text style={{color:"#FFC72C",fontWeight:"bold"}}>{item?.rating?.rate} Rating</Text>
      </View>

      <Pressable 
        onPress={handleClick}
        style={{
            backgroundColor:"#9370db",
            padding:10,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            marginHorizontal:10,
            marginTop:10
        }}
        >
            <Text>Add to Cart</Text>
      </Pressable>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})