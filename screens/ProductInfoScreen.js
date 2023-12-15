import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, ImageBackground } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 



const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const navigation = useNavigation();
    const height = (width * 100) / 100;
    return (
        <ScrollView style={{ marginTop: 25, flex: 1, backgroundColor: "white" }} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "#9400d3", padding: 10, flexDirection: "row", alignItems: "center" }} >
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontals: 7,
                        gap: 10,
                        backgroundColor: "white",
                        borderRadius: 3,
                        height: 38,
                        flex: 1
                    }}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder="Search" />
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground style={{ width, height, marginTop: 25, resizeMode: "contain" }} source={{ uri: item }} key={index}>
                        <View style={{ pading: 20, flexDirections: "row", alignItems: "center", justifyContent: "space-between" }}>

                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{route?.params?.title}</Text>
                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>${route?.params?.price}</Text>
            </View>
            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.color}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.size}
                </Text>
            </View>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
                    Total : ${route.params.price}
                </Text>
                <Text style={{ color: "#00CED1" }}>
                    FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <Ionicons name="location" size={24} color="black" />

                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        Deliver To - Boston 02125
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})