import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity  } from  'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import { db } from '../../fіrebase/config';
import { collection, onSnapshot } from "firebase/firestore";


const DefaultScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        onSnapshot(collection(db, "posts"), (data) => {
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

    useEffect(() => {
        getAllPosts();
    }, [])

    return(
        <View style={styles.container}>
            (<FlatList data={posts ?? []} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
                <View style={styles.postsImageContainer}>
                    <Image source={{uri: item.photo}} style={styles.postsImage}/>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 34 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                    })}>
                            <FontAwesome name="comment-o" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() =>  navigation.navigate("Map", {
                    coords: {latitude: item.location.coords.latitude, longitude: item.location.coords.longitude,},
                    place: item.place,})}>
                            <EvilIcons name="location" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}/>)
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postsImageContainer: {
        marginHorizontal: 16,
    },
    postsImage: {
        resizeMode: "cover",
        height: 240,
        borderRadius: 8,
    },
    postsContainer: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
    iconContainer: {
        
    },
    postTitle: {
        fontSize: 16,
        color: "#212121",
        marginVertical: 8,
        fontFamily: "Roboto-Medium",
    }
})}


export default DefaultScreen;