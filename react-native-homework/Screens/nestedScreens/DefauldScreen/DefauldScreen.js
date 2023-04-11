import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity  } from  'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';


const DefaultScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(route.params){
            setPosts(prevState => [...prevState, route.params])
        }
    }, [route.params])


    return(
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()} renderItem={({ item }) => (
                <View style={styles.postsImageContainer}>
                    <Image source={{uri: item.photo}} style={styles.postsImage}/>
                    <Text style={styles.postTitle}>Назва</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 34 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                            <FontAwesome name="comment-o" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                            <EvilIcons name="location" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}/>
            
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
})


export default DefaultScreen;