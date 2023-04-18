import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from  'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../fіrebase/config'; 
import { collection, addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";



const CommentsScreen = ({route}) => {
    const { postId, photo } = route.params;
    const [comment, setComment] = useState("");
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [allComments, setAllComments] = useState([]);

    const {userId, login} = useSelector((state) => state.auth);

    useEffect(() => {
        getAllComments();
    }, []);

    const getAllComments = async () => {
        onSnapshot(
            collection(doc(collection(db, "posts"), postId), "comments"),
            (data) => {
            setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }
        );
    };

    const sendComment = async () => {
        const dbRef = doc(db, "posts", postId);
          await updateDoc(dbRef, {
            comments: allComments.length + 1,
          });
        await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
          comment,
          login,
          userId,
        });
        setComment("");
        keyboardHide();
      };

      
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const date = new Date().toLocaleString('en',
  {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

    return(
        <View style={styles.container}>
            <Image source={{ uri: photo }} style={styles.postsImage} />
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
                onPress={sendComment}
            >
                <AntDesign name="arrowup" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
            <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View>
                <View style={styles.commentContainer}>
                    <Text  style={styles.name}>{login}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
            )}
            />
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
        margin: 16,

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
    commentContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        width: 299,
        padding: 16,
        marginBottom: 10,
        borderRadius: 6,
    },
    name: {
        fontFamily: "Roboto-Medium",
        color: "#212121",
        fontSize: 20,
        paddingBottom: 10,
        textTransform: "capitalize",
    },
    date: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: "#BDBDBD",
        textAlign: "right",
    },
    comment: {
        fontFamily: "Roboto-Regular",
        color: "#212121",
        fontSize: 13,
    }
})


export default CommentsScreen;