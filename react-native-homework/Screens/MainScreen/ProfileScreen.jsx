import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList } from  'react-native';
import { useDispatch, useSelector } from "react-redux";
import {db} from '../../fіrebase/config';
import { Feather } from '@expo/vector-icons'; 
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 



const ProfileScreen = ({navigation}) => {
    const {userId, login} = useSelector((state) => state.auth);

    const [userPosts, setUserPosts] = useState([]);

    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    useEffect(() => {
        getUserPosts();
    }, [])

    const getUserPosts = async() => {
        const posts = collection(db, "posts");
        const searchQuery = query(posts, where("userId", "==", userId));
    onSnapshot(searchQuery, (data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    }

    return(
        <ImageBackground source={require("../../assets/PhotoBG.jpg")} style={styles.image}>
            <View style={styles.container}>
                <View style={styles.containerProfile}>
                    <Text  style={styles.name}>{login}</Text>
                    <TouchableOpacity style={styles.btnSignOut} onPress={signOut}>
                        <Feather name="log-out" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>
                {userPosts && (
                    <FlatList
                        data={userPosts}
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
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#fff",
        position: "relative",
        justifyContent: "center",
        paddingnHorizontal: 16,
        marginTop: 147,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 32,
        flex: 1,
    },
    name: {
        fontFamily: "Roboto-Medium",
        color: "#212121",
        fontSize: 30,
        textAlign: "center",
        textTransform: "capitalize",
    },
    btnSignOut: {
        top: 6,
        right: 16,
        position: "absolute",
    },
    postsContainer: {
        marginHorizontal: 16,
        marginVertical: 16,
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

})


export default ProfileScreen;