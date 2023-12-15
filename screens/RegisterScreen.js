import { StyleSheet, Text, View, SafeAreaView, Pressable, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };

        //send a post request to the backend API
        axios.post("http://localhost:8000/register", user).then((response) => {
            console.log(response);
            Alert.alert(
                "Registration Succesfull",
                "You have registered successfully"
            );
            setName("");
            setPassword("");
            setEmail("");
        }).catch((error) => {
            Alert.alert(
                "Registration Error", 
                "an error occurred during registration"
            );
            console.log("registratiion failed", error);
        });
    };
    return (
        <SafeAreaView style={{ flex: 1, background: "white", alignItems: "center" }}>
            <Text style={{ fontSize: 80, fontWeight: "bold", marginTop: 12, color: "#9400d3" }}>Rumie</Text>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Register your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
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
                            <Ionicons style={{ marginLeft: 8 }} name="ios-person" size={24} color="gray" />
                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: name ? 16 : 16
                                }}
                                placeholder="Enter your Name" />
                        </View>
                    </View>

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
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16
                            }}
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
                            placeholder="Create your Password" />
                    </View>
                </View>

                {/* <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: '#007FFF', fontWeight: "500" }} >Forgot Password</Text>
                </View> */}

                <View style={{ maringTop: 50 }} />

                <Pressable
                    onPress={handleRegister}
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
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeigt: "bold" }} >Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }} >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }} >Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})