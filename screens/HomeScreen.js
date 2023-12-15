import { StyleSheet, Text, View, Platform, Pressable, Image } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, ScrollView, TextInput } from 'react-native-web'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import ProductItem from '../components/ProductItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const list = [
        {
            id: "0",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Home",
        },
        {
            id: "1",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
            name: "Deals",
        },
        {
            id: "3",
            image:
                "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
            name: "Electronics",
        },
        {
            id: "4",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
            name: "Mobiles",
        },
        {
            id: "5",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
            name: "Music",
        },
        {
            id: "6",
            image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
            name: "Fashion",
        },
    ];

    const offers = [
        {
            id: "0",
            title:
                "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
            offer: "72% off",
            oldPrice: 7500,
            price: 4500,
            image:
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
            ],
            color: "Green",
            size: "Normal",
        },
        {
            id: "1",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
            ],
            color: "black",
            size: "Normal",
        },
        {
            id: "2",
            title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
            carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
            color: "black",
            size: "Normal",
        },
        {
            id: "3",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 24999,
            price: 19999,
            image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
            ],
            color: "Norway Blue",
            size: "8GB RAM, 128GB Storage",
        },
    ];

    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("jewelry");
    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                // const products = response.data;
                // // Save each product to MongoDB
                // for (const product of products) {
                //     try {
                //         if (product.count !== undefined) {
                //             //send a post request to the backend API
                //             axios.post("http://localhost:8000/product", product)
                //             console.log('Product saved:', product);
                //         } else {
                //             console.error('Error saving product: Invalid count field');
                //         }
                //     } catch (error) {
                //         console.error('Error saving product:', error);
                //     }
                // }
            } catch (error) {
                console.log("error message", error)
            }
        }
        fetchData();
    }, []);
    console.log("products", products);

    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);

    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? 40 : 0,
                flex: 1,
                backgroundColor: "white"
            }}
        >
            <ScrollView>
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

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, padding: 10 }}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Pressable>
                        <Text style={{ fontSize: 13, fontWeight: "500" }}>Deliver to - Boston 02125</Text>
                    </Pressable>

                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {list.map((item, index) => (
                        <Pressable key={index} style={{ margin: 30, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={{ uri: item.image }} />

                            <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", marginTop: 5 }}>{item?.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <View style={{ padding: 20, flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#9370db", borderRadius: 10 }}>
                        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color: "white" }}>Today's Deals</Text>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {offers.map((item, index) => (
                        <Pressable 
                            onPress={() => navigation.navigate("Info",{
                                id:item.id,
                                title:item.title,
                                price:item?.price,
                                carouselImages: item.carouselImages,
                                color: item?.color,
                                size: item?.size,
                                oldPrice: item?.oldPrice,
                                item: item
                            })}
                            style={{ 
                                marginVertical: 10, 
                                alignItems: "center", 
                                justifyContent: "center" }}>
                            <Image style={{ width: 200, height: 200, resizeMode: "contain" }} source={{ uri: item?.image }} />

                            <View
                                style={{
                                    backgroundColor: "#E31837",
                                    paddingVertical: 5,
                                    width: 130,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10,
                                    borderRadius: 4
                                }}>
                                <Text style={{ textAlign: "center", color: "white", fontSize: 13, fontWeight: "bold" }}>{item?.offer}</Text>
                            </View>
                        </Pressable>
                    ))};

                </ScrollView>

                <View style={{ padding: 20, flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#9370db", borderRadius: 10 }}>
                        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color: "white" }}>Market Place</Text>
                    </View>
                </View>

                <View style={{ marinHorizontal: 10, marginTop: 20, marginLeft: 10, width: "45%", marginBottom: open ? 50 : 15 }}>
                    <DropDownPicker
                        style={{
                            borderColor: "#B7B7B7",
                            height: 30,
                            marginBottom: open ? 120 : 15,
                        }}
                        open={open}
                        value={category} //genderValue
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        placeholder="choose category"
                        placeholderStyle={styles.placeholderStyles}
                        onOpen={onGenderOpen}
                        // onChangeValue={onChange}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>

                {/* <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                    {products
                        ?.filter((item) => item.category === category)
                        .map((item, index) => (
                            <ProductItem item={item} key={index} />
                        ))}
                    {products?.map((item, index) => (
                        <ProductItem item={item} key={index} />
                    ))}
                </View> */}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {products
                        ?.filter((item) => item.category === category)
                        .map((item, index) => (
                            <ProductItem item={item} key={index} />
                        ))}
                </View>

                <Pressable
                    onPress={() => {
                        AsyncStorage.clear()
                        navigation.navigate("Login")
                    }}>
                    <Text>logout</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})