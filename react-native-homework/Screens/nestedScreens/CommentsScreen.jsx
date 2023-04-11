import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from  'react-native';
import { AntDesign } from '@expo/vector-icons'; 


const CommentsScreen = () => {
    
    const [comment, setComment] = useState("");
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    return(
        <View style={styles.container}>
            {/* <Image source={{ uri: photo }} style={styles.postsImage} /> */}
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={comment}
                placeholder={"Коментувати..."}
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setComment(value)}
            />
            <TouchableOpacity
                style={styles.commentBtn}
                onPress={() => {}}
            >
                <AntDesign name="arrowup" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        margin: 16,
        flexDirection: "row",
    },
    postsImage: {
        resizeMode: "cover",
        height: 240,
        borderRadius: 8,
    },
    input: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
        height: 50,
        paddingHorizontal: 16,
    },
    commentBtn: {
        position: "absolute",
        backgroundColor: "#FF6C00",
        borderRadius: 50,
        width: 34,
        height: 34,
        top: 8,
        right: 8,
        justifyContent: "center",
        alignItems: "center",
    }, 

})


export default CommentsScreen;