import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity  } from  'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons'; 
import { db } from '../../fіrebase/config';
import { collection, onSnapshot } from "firebase/firestore";


const DefaultScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        await onSnapshot(collection(db, "posts"), (data) => {
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    return(
        <View style={styles.container}>
        {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.postsContainer}>
                <Image style={styles.postPhoto} source={{ uri: item.photo }} />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.postInformationContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ ...styles.postComments, marginRight: 25 }}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <FontAwesome name="comment-o" size={24} color={item.comments ? "#FF6C00" : "#BDBDBD"} />
                      <Text style={{
                          ...styles.numberComments,
                          color: item.comments ? "#212121" : "#BDBDBD",
                        }}>{item.comments || 0}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.postLocation}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate("Map", { location: item.location })
                    }
                >
                    <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                    <Text style={styles.locationText}>{item.place}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    postsContainer: {
        marginHorizontal: 16,
    },
    postPhoto: {
        resizeMode: "cover",
        height: 240,
        borderRadius: 8,
    },
    postTitle: {
        fontFamily: "Roboto-Medium",
        color: "#212121",
        fontSize: 16,
        lineHeight: 19,
        marginVertical: 8,
    },
    postInformationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 34,
    },
    postComments: {
        flexDirection: "row",
        alignItems: "center",
    },
    numberComments: {
        fontFamily: "Roboto-Regular",
        color: "#BDBDBD",
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 9,
    },
    postLocation: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationText: {
        fontFamily: "Roboto-Regular",
        textDecorationLine: "underline",
        color: "#212121",
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 8,
    },
});


export default DefaultScreen;