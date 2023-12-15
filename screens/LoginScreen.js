import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native-web'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.replace("Main");
                }
            } catch (error) {
                console.log("error message", err)
            }
        };
        checkLoginStatus();
    }, []);
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        };
        //send a post request to the backend API
        axios.post("http://localhost:8000/login", user).then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            AsyncStorage.setItem("userEmail", email);
            navigation.replace("Main");
        }).catch((error) => {
            Alert.alert("Login Error", "Invalid Email");
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, background: "white", alignItems: "center" }}>
            <Text style={{ fontSize: 80, fontWeight: "bold", marginTop: 12, color: "#9400d3" }}>Rumie</Text>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login to your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30
                    }}>
                        <MaterialCommunityIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
                            placeholder="Enter your Email" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30
                    }}>
                        <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }}
                            placeholder="Enter your Password" />
                    </View>
                </View>

                <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: '#007FFF', fontWeight: "500" }} >Forgot Password</Text>
                </View>

                <View style={{ maringTop: 50 }} />

                <Pressable
                    onPress={handleLogin}
                    style={{
                        width: 200,
                        backgroundColor: "#9400d3",
                        borderRadius: 6,
                        marginTop: 70,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeigt: "bold" }} >Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }} >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }} >Don't have an account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})